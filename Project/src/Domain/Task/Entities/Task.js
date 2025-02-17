// src/domain/task/entities/Task.js

class Task {
  constructor(id, title, description, status, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status || 'pendente';
    this.createdAt = createdAt || new Date();
  }

  updateStatus(newStatus) {
    if (['pendente', 'em andamento', 'concluída'].includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error('Status inválido');
    }
  }

}

module.exports = Task;
