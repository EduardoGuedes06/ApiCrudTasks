import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '../models/taskModel';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task | Task[]) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    setTasks(savedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (task: Task | Task[]) => {
    if (Array.isArray(task)) {
      setTasks(prevTasks => {
        const newTasks = [...prevTasks, ...task];
        saveTasksToLocalStorage(newTasks);
        return newTasks;
      });
    } else {
      setTasks(prevTasks => {
        const taskExists = prevTasks.some(existingTask => existingTask.id === task.id);
        if (!taskExists) {
          const newTasks = [...prevTasks, task];
          saveTasksToLocalStorage(newTasks);
          return newTasks;
        }
        return prevTasks;
      });
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.filter(task => task.id !== taskId);
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
