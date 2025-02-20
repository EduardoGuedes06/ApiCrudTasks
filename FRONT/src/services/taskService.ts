import { Task } from '../models/taskModel';
import { useTaskContext } from '../context/TaskContext';

export const TaskService = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const getAllTasks = () => {
    return JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
  };

  const createTask = (task: Task) => {
    addTask(task);
    saveTasksToLocalStorage();
  };

  const updateTaskStatus = (task: Task) => {
    updateTask(task);
    saveTasksToLocalStorage();
  };

  const deleteTaskById = (taskId: string) => {
    deleteTask(taskId);
    saveTasksToLocalStorage();
  };

  return {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTaskById,
  };
};
