import { api } from "../api/api";

export class ApiService {
  static async getToken() {
    try {
      const response = await api.get("/auth");
      const token = response.data.token;
      return token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      throw new Error("Erro ao obter o token");
    }
  }

  static async createDatabase() {
    try {
      const response = await api.get("/database/create");
      return response.data;
    } catch (error) {
      console.error("Erro ao criar banco de dados:", error);
      throw new Error("Erro ao criar banco de dados");
    }
  }

  static async getTasks() {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      throw new Error("Erro ao buscar tarefas");
    }
  }
}
