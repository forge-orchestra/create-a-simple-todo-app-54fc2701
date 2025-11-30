'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { Loader } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import 'tailwindcss/tailwind.css';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate API call
        const response = await new Promise<{ data: Task[] }>((resolve) =>
          setTimeout(() => resolve({ data: [] }), 1000)
        );
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    // Logic to add a new task
  };

  const handleEditTask = (id: number) => {
    // Logic to edit a task
  };

  const handleDeleteTask = (id: number) => {
    // Logic to delete a task
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">Something went wrong</p>
        </div>
      )}
    >
      <div className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Forge App</h1>
          <p className="text-lg">Manage your tasks effectively with ease.</p>
        </section>
        <section>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
          <ul className="mt-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{task.title}</span>
                <div>
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="text-blue-500 mr-2"
                  >
                    <LucideIcon name="edit" size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500"
                  >
                    <LucideIcon name="trash" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default Page;