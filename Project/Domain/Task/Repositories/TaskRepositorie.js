const Task = require('../Entities/Task');

class TaskRepository {
  async create({ title, description, status }) {
    const task = await Task.create({ title, description, status });
    return task;
  }

  async findAll() {
    const tasks = await Task.findAll();
    return tasks;
  }

  async findById(id) {
    const task = await Task.findByPk(id);
    return task;
  }

  async update(id, { title, description, status }) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();

    return task;
  }

  async delete(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.destroy();
    return task;
  }
}

module.exports = new TaskRepository();
