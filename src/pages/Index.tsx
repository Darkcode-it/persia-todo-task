
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import CategoryFilter from '@/components/CategoryFilter';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import { TodoProvider } from '@/contexts/TodoContext';

const Index = () => {
  return (
    <TodoProvider>
      <MainLayout
        sidebar={<CategoryFilter />}
      >
        <div className="space-y-6">
          <TodoInput />
          <TodoList />
        </div>
      </MainLayout>
    </TodoProvider>
  );
};

export default Index;
