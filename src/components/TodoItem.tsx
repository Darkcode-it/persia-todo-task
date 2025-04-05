
import React from 'react';
import { Todo } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

const CategoryBadge: React.FC<{ category: Todo['category'] }> = ({ category }) => {
  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    shopping: 'bg-green-100 text-green-800',
    education: 'bg-amber-100 text-amber-800'
  };

  const categoryNames = {
    work: 'کاری',
    personal: 'شخصی',
    shopping: 'خرید',
    education: 'آموزشی'
  };

  return (
    <span className={cn("px-2 py-1 text-xs rounded-full", categoryColors[category])}>
      {categoryNames[category]}
    </span>
  );
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div className="task-enter bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-border flex items-center justify-between gap-2 mb-3 transition-all hover:shadow-md group">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
            todo.completed 
              ? "bg-primary border-primary text-white" 
              : "border-gray-300 hover:border-primary"
          )}
        >
          {todo.completed && <Check size={12} />}
        </button>
        
        <div className="flex flex-col">
          <span className={cn("text-sm transition-all", todo.completed && "task-done")}>
            {todo.text}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <CategoryBadge category={todo.category} />
            <span className="text-xs text-muted-foreground">
              {new Date(todo.createdAt).toLocaleDateString('fa-IR')}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
        aria-label="حذف"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
