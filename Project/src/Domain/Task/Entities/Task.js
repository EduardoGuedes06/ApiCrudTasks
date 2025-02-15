// src/domain/task/entities/Task.js

class Task {
  constructor(id, title, description, status, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status || 'pending';
    this.createdAt = createdAt || new Date();
  }

  updateStatus(newStatus) {
    if (['pending', 'in progress', 'completed'].includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error('Status inválido');
    }
  }

}

module.exports = Task;
