"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { Todo } from '../../types';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../services/todoService';

const DashboardPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;
    try {
      const addedTodo = await addTodo({ title: newTask });
      setTodos([...todos, addedTodo]);
      setNewTask('');
    } catch {
      setError('Failed to add task');
    }
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    try {
      const updatedTodo = await updateTodo(id, { title });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch {
      setError('Failed to update task');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add new task"
        />
        <button onClick={handleAddTodo} className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <PlusCircle size={20} />
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 border-b">
            <input
              type="text"
              value={todo.title}
              onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <button onClick={() => handleDeleteTodo(todo.id)} className="ml-2 p-2 text-red-500 hover:text-red-700">
              <Trash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;