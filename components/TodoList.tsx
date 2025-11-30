import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map(todo => (
        <li 
          key={todo.id} 
          className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
          aria-label={`Todo item: ${todo.text}`}
        >
          <div className="flex items-center">
            <button 
              onClick={() => onToggleComplete(todo.id)} 
              aria-pressed={todo.completed}
              className={`mr-3 ${todo.completed ? 'text-green-500' : 'text-gray-500'}`}
              aria-label={`Mark as ${todo.completed ? 'incomplete' : 'complete'}`}
            >
              <CheckCircle className="w-6 h-6" />
            </button>
            <span 
              className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
              {todo.text}
            </span>
          </div>
          <button 
            onClick={() => onDelete(todo.id)} 
            aria-label="Delete todo"
            className="text-red-500"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;