
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { Todo, TodoCategory } from '@/types/todo';
import { toast } from "sonner";

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  activeCategory: TodoCategory;
  addTodo: (text: string, category: Exclude<TodoCategory, 'all'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setActiveCategory: (category: TodoCategory) => void;
  totalTodos: number;
  completedTodos: number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'persian-todo-list';

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

const loadTodosFromStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      // Parse the stored JSON and ensure dates are properly converted back to Date objects
      return JSON.parse(storedTodos, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
    }
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
  }
  
  // Return default todos if nothing in storage or on error
  return [
    {
      id: '1',
      text: 'خرید مواد غذایی',
      completed: false,
      category: 'shopping',
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'تکمیل پروژه برنامه نویسی',
      completed: false,
      category: 'work',
      createdAt: new Date()
    },
    {
      id: '3',
      text: 'مطالعه کتاب جدید',
      completed: false,
      category: 'education',
      createdAt: new Date()
    }
  ];
};

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodosFromStorage());
  const [activeCategory, setActiveCategory] = useState<TodoCategory>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const addTodo = useCallback((text: string, category: Exclude<TodoCategory, 'all'>) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      createdAt: new Date()
    };
    
    setTodos(prev => [newTodo, ...prev]);
    toast.success('وظیفه جدید اضافه شد');
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast.success('وظیفه با موفقیت حذف شد');
  }, []);

  const filteredTodos = useMemo(() => {
    if (activeCategory === 'all') {
      return todos;
    }
    return todos.filter(todo => todo.category === activeCategory);
  }, [todos, activeCategory]);

  const totalTodos = useMemo(() => todos.length, [todos]);
  const completedTodos = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);

  const value = useMemo(() => ({
    todos,
    filteredTodos,
    activeCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    setActiveCategory,
    totalTodos,
    completedTodos
  }), [
    todos,
    filteredTodos,
    activeCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    totalTodos,
    completedTodos
  ]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
