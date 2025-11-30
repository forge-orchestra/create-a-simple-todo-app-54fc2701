import { LucideIcon } from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, title: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
};

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  color?: string;
};