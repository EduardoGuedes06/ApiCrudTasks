import { Task } from "../models/taskModel";
import { useTaskContext } from "../context/TaskContext";
import { ApiService } from "../api/apiService";

export const TaskService = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const token = sessionStorage.getItem("authToken") ?? "";

  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  const getAllTasks = async () => {
    debugger
    try {
      const fetchedTasks = await ApiService.getTasks();
      addTask(fetchedTasks);
      return fetchedTasks;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      return [];
    }
  };

  const createTask = async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task | null> => {
    debugger
    try {
      const newTask = await ApiService.createTask(token, task);
      if (newTask) {
        addTask(newTask);
        return newTask;
      }
      return null;
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      return null;
    }
  };
  

  const updateTaskStatus = async (task: Task): Promise<boolean> => {
    debugger
    try {
      const updatedTask = await ApiService.updateTask(token, task.id, {
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
      if (updatedTask) {
        updateTask(updatedTask);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      return false;
    }
  };

  const deleteTaskById = async (taskId: string): Promise<boolean> => {
    debugger
    try {
      await ApiService.deleteTask(token, taskId);
      deleteTask(taskId);
      return true;
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      return false;
    }
  };

  return {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTaskById,
  };
};
