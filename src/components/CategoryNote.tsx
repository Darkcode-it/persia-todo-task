import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Pencil, Save, X } from 'lucide-react';
import { TodoCategory } from '@/types/todo';

interface CategoryNoteProps {
  category: Exclude<TodoCategory, 'all'>;
  initialNote?: string;
  onSave: (note: string) => void;
}

const CategoryNote: React.FC<CategoryNoteProps> = ({ category, initialNote = '', onSave }) => {
  const [note, setNote] = useState(initialNote);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave(note);
    setIsOpen(false);
  };

  const handleClose = () => {
    setNote(initialNote); // Reset note to initial value
    setIsOpen(false);
  };

  const categoryNames = {
    work: 'کاری',
    personal: 'شخصی',
    shopping: 'خرید',
    education: 'آموزشی'
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Pencil className="h-4 w-4 ml-1" />
          یادداشت
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>یادداشت {categoryNames[category]}</span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="یادداشت خود را اینجا بنویسید..."
            className="min-h-[150px] resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              انصراف
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              ذخیره
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryNote; 