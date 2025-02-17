const TaskService = require('../Services/TaskService');
const TaskRepository = require('../Repositories/TaskRepositoriy');


jest.mock('../repositories/TaskRepository');

describe('TaskService', () => {
  test('deve criar uma tarefa', async () => {
    const newTask = {
      title: 'Tarefa 1',
      description: 'Descrição da tarefa',
      status: 'Pendente',
    };


    TaskRepository.create.mockResolvedValue(newTask);

    const task = await TaskService.createTask(newTask);

    expect(task).toEqual(newTask);
    expect(TaskRepository.create).toHaveBeenCalledWith(newTask);
  });
});
