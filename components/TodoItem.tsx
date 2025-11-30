import { FC } from 'react';
import { Check, Trash2 } from 'lucide-react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <button
          onClick={() => onToggle(id)}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          className={`mr-3 p-1 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <Check className={`w-5 h-5 text-white ${completed ? 'block' : 'hidden'}`} />
        </button>
        <span className={`text-lg ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {title}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="p-1 text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TodoItem;