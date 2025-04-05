
import React from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { TodoCategory } from '@/types/todo';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, Home, ShoppingCart, ListFilter } from 'lucide-react';

const CategoryFilter: React.FC = () => {
  const { activeCategory, setActiveCategory, todos } = useTodo();

  const categories: Array<{ id: TodoCategory; label: string; icon: React.ElementType }> = [
    { id: 'all', label: 'همه', icon: ListFilter },
    { id: 'work', label: 'کاری', icon: Briefcase },
    { id: 'personal', label: 'شخصی', icon: Home },
    { id: 'shopping', label: 'خرید', icon: ShoppingCart },
    { id: 'education', label: 'آموزشی', icon: BookOpen },
  ];

  const getCategoryCount = (category: TodoCategory) => {
    if (category === 'all') return todos.length;
    return todos.filter(todo => todo.category === category).length;
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border mb-6">
      <h2 className="text-lg font-medium mb-3">دسته‌بندی‌ها</h2>
      <div className="flex flex-wrap gap-2 md:flex-col">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors w-full",
              activeCategory === category.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            <category.icon size={16} />
            <span>{category.label}</span>
            <span className="mr-auto bg-muted rounded-full px-2 py-0.5 text-xs">
              {getCategoryCount(category.id)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
