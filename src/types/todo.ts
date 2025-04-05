
export type TodoCategory = 'all' | 'work' | 'personal' | 'shopping' | 'education';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Exclude<TodoCategory, 'all'>;
  createdAt: Date;
}
