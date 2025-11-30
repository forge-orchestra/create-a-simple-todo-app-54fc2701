import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex flex-col items-center space-y-2"
      >
        <Loader className="animate-spin text-blue-500" size={32} />
        <span className="text-gray-700 text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Loading;