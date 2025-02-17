const TaskRepository = require('../Repositories/TaskRepositoriy')

class TaskService {
  async createTask({ title, description, status }) {
    try {
      if (!title) {
        throw new Error('Título da tarefa é obrigatório');
      }
      return await TaskRepository.create({ title, description, status });
    } catch (error) {
      if (error.name === "SequelizeConnectionError" && error.parent?.code === "3D000") {
        throw new Error('Crie o Banco primeiro, utilizando http://localhost:3000/api/database/create');
      }
      throw error;
    }
  }

  async getAllTasks() {
    try {
      return await TaskRepository.findAll();
    } catch (error) {
      if (error.name === "SequelizeConnectionError" && error.parent?.code === "3D000") {
        throw new Error('Crie o Banco primeiro, utilizando http://localhost:3000/api/database/create');
      }
      throw error;
    }
  }

  async updateTask(id, { title, description, status }) {
    try {
      const task = await TaskRepository.findById(id);
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      return await TaskRepository.update(id, { title, description, status });
    } catch (error) {
      if (error.name === "SequelizeConnectionError" && error.parent?.code === "3D000") {
        throw new Error('Crie o Banco primeiro, utilizando http://localhost:3000/api/database/create');
      }
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const task = await TaskRepository.findById(id);
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      return await TaskRepository.delete(id);
    } catch (error) {
      if (error.name === "SequelizeConnectionError" && error.parent?.code === "3D000") {
        throw new Error('Crie o Banco primeiro, utilizando http://localhost:3000/api/database/create');
      }
      throw error;
    }
  }
}

module.exports = new TaskService();
