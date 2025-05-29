import React, { createContext, useContext, useState } from 'react';
import { TodoCategory } from '@/types/todo';

interface NoteContextType {
  notes: Record<Exclude<TodoCategory, 'all'>, string>;
  setNote: (category: Exclude<TodoCategory, 'all'>, note: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Record<Exclude<TodoCategory, 'all'>, string>>({
    work: '',
    personal: '',
    shopping: '',
    education: ''
  });

  const setNote = (category: Exclude<TodoCategory, 'all'>, note: string) => {
    setNotes(prev => ({ ...prev, [category]: note }));
  };

  return (
    <NoteContext.Provider value={{ notes, setNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error('useNote must be used within NoteProvider');
  return context;
}; 