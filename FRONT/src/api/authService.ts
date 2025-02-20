import { ApiService } from "./apiService";

export class AuthService {
  static async getToken() {
    try {
      const token = await ApiService.getToken();

      if (!token) throw new Error("Token inválido ou não recebido");

      sessionStorage.setItem("authToken", token);

      return token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      throw new Error("Erro ao obter o token");
    }
  }
}
