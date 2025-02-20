import { api } from "../api/api";
import { Task } from "../models/taskModel";

export class ApiService {
  static async getToken() {
    try {
      const response = await api.get("/auth");
      return response.data.token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      throw new Error("Erro ao obter o token");
    }
  }

  static async createDatabase(token: string) {
    try {
      const response = await api.get("/database/create", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar banco de dados:", error);
      throw new Error("Erro ao criar banco de dados");
    }
  }

  static async getTasks() {
     
    try {
      const response = await api.get("/tasks",);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      throw new Error("Erro ao buscar tarefas");
    }
  }

  static async createTask(token: string, task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
     
    try {
      const response = await api.post("/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw new Error("Erro ao criar tarefa");
    }
  }

  static async updateTask(token: string, id: string, updatedTask: { title: string; description: string; status: string }) {
     
    try {
      const response = await api.put(`/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar a tarefa ${id}:`, error);
      throw new Error("Erro ao atualizar a tarefa");
    }
  }

  static async deleteTask(token: string, id: string) {
     
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(`Erro ao deletar a tarefa ${id}:`, error);
      throw new Error("Erro ao deletar a tarefa");
    }
  }
}
