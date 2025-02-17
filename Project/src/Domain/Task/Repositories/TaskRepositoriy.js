const TaskModel = require('../../../Infrastructure/Database/Sequelize/TaskModel');

class TaskRepository {
  async create({ title, description, status }) {
    return await TaskModel.create({ title, description, status });
  }

  async findAll() {
    return await TaskModel.findAll();
  }

  async findById(id) {
    return await TaskModel.findByPk(id);
  }

  async update(id, { title, description, status }) {
    const task = await TaskModel.findByPk(id);
    if (!task) return null;

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();

    return task;
  }

  async delete(id) {
    const task = await TaskModel.findByPk(id);
    if (!task) return null;

    await task.destroy();
    return task;
  }
}

module.exports = new TaskRepository();
