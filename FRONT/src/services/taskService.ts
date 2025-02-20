import { Task } from "../models/taskModel";

let tasksCache: Task[] = [];

export const TaskService = {
  getAllTasks: (): Task[] => {
    return tasksCache;
  },

  createTask: (task: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...task,
      id: tasksCache.length + 1,
      createdAt: new Date().toISOString(),
    };
    tasksCache.push(newTask);
    return newTask;
  },

  updateTask: (id: number, updatedTask: Partial<Task>): Task | null => {
    const taskIndex = tasksCache.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;
    tasksCache[taskIndex] = { ...tasksCache[taskIndex], ...updatedTask };
    return tasksCache[taskIndex];
  },

  deleteTask: (id: number): boolean => {
    const taskIndex = tasksCache.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;
    tasksCache.splice(taskIndex, 1);
    return true;
  },
};
