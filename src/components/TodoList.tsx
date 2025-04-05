
import React from 'react';
import { useTodo } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { FileX } from 'lucide-react';

const TodoList: React.FC = () => {
  const { filteredTodos, activeCategory, totalTodos, completedTodos } = useTodo();

  const categoryNames: Record<string, string> = {
    all: 'همه',
    work: 'کاری',
    personal: 'شخصی',
    shopping: 'خرید',
    education: 'آموزشی'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {categoryNames[activeCategory]} 
          <span className="text-sm font-normal text-muted-foreground mr-2">
            ({filteredTodos.length})
          </span>
        </h2>
        <div className="text-sm text-muted-foreground">
          {completedTodos} از {totalTodos} تکمیل شده
        </div>
      </div>

      <div className="space-y-1">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <FileX size={40} className="text-muted-foreground mb-2" />
            <p className="text-muted-foreground">هیچ کاری در این دسته‌بندی وجود ندارد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
