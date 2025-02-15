const TaskRepository = require('../Repositories/TaskRepositorie');

class TaskService {
  async createTask({ title, description, status }) {
    if (!title) {
      throw new Error('Título da tarefa é obrigatório');
    }

    return await TaskRepository.create({ title, description, status });
  }

  async getAllTasks() {
    return await TaskRepository.findAll();
  }

  async updateTask(id, { title, description, status }) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return await TaskRepository.update(id, { title, description, status });
  }

  async deleteTask(id) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return await TaskRepository.delete(id);
  }
}

module.exports = new TaskService();
