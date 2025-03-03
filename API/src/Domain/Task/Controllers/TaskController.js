const TaskService = require('../Services/TaskService');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    const task = await TaskService.createTask({ title, description, status });
    
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    if (error.message.includes("Crie o Banco primeiro")) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao criar tarefa.', error });
    }
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    if (error.message.includes("Crie o Banco primeiro")) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao listar tarefas.', error });
    }
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await TaskService.updateTask(id, { title, description, status });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    if (error.message.includes("Crie o Banco primeiro")) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao atualizar tarefa.', error });
    }
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await TaskService.deleteTask(id);

    res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    if (error.message.includes("Crie o Banco primeiro")) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao deletar tarefa.', error });
    }
  }
};
