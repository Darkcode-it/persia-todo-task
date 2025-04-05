
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TodoCategory } from '@/types/todo';

const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Exclude<TodoCategory, 'all'>>('personal');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), category);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg p-4 shadow-sm border">
      <div className="flex flex-col gap-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="کار جدیدی اضافه کنید..."
          className="w-full"
          dir="rtl"
        />
        <div className="flex gap-2">
          <Select value={category} onValueChange={(val) => setCategory(val as Exclude<TodoCategory, 'all'>)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="دسته‌بندی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">کاری</SelectItem>
              <SelectItem value="personal">شخصی</SelectItem>
              <SelectItem value="shopping">خرید</SelectItem>
              <SelectItem value="education">آموزشی</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
            <Plus size={18} className="ml-1" />
            افزودن
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;
