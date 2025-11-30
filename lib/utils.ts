import { LucideIcon } from 'lucide-react';

/**
 * Represents a task in the todo application.
 */
export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

/**
 * Represents an error with a message.
 */
export type AppError = {
  message: string;
};

/**
 * Generates a unique identifier for tasks.
 * @returns {string} A unique identifier.
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Adds a new task to the list.
 * @param {Task[]} tasks - The current list of tasks.
 * @param {string} title - The title of the new task.
 * @returns {Task[]} The updated list of tasks.
 * @throws {AppError} If the title is empty.
 */
export function addTask(tasks: Task[], title: string): Task[] {
  if (!title.trim()) {
    throw { message: 'Task title cannot be empty.' } as AppError;
  }
  const newTask: Task = { id: generateId(), title, completed: false };
  return [...tasks, newTask];
}

/**
 * Toggles the completion status of a task.
 * @param {Task[]} tasks - The current list of tasks.
 * @param {string} taskId - The ID of the task to toggle.
 * @returns {Task[]} The updated list of tasks.
 * @throws {AppError} If the task is not found.
 */
export function toggleTaskCompletion(tasks: Task[], taskId: string): Task[] {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    throw { message: 'Task not found.' } as AppError;
  }
  const updatedTasks = [...tasks];
  updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
  return updatedTasks;
}

/**
 * Deletes a task from the list.
 * @param {Task[]} tasks - The current list of tasks.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Task[]} The updated list of tasks.
 * @throws {AppError} If the task is not found.
 */
export function deleteTask(tasks: Task[], taskId: string): Task[] {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    throw { message: 'Task not found.' } as AppError;
  }
  return tasks.filter(task => task.id !== taskId);
}

/**
 * Updates the title of a task.
 * @param {Task[]} tasks - The current list of tasks.
 * @param {string} taskId - The ID of the task to update.
 * @param {string} newTitle - The new title for the task.
 * @returns {Task[]} The updated list of tasks.
 * @throws {AppError} If the task is not found or the new title is empty.
 */
export function updateTaskTitle(tasks: Task[], taskId: string, newTitle: string): Task[] {
  if (!newTitle.trim()) {
    throw { message: 'Task title cannot be empty.' } as AppError;
  }
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    throw { message: 'Task not found.' } as AppError;
  }
  const updatedTasks = [...tasks];
  updatedTasks[taskIndex].title = newTitle;
  return updatedTasks;
}

export { LucideIcon };