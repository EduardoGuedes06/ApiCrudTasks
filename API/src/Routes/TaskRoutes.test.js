const request = require('supertest');
const apiUrl = 'http://localhost:3000';

describe('Testes de integração das rotas de tarefas', () => {
  let taskId;

  describe('POST /tasks', () => {
    it('Deve criar uma nova tarefa', async () => {
      const taskData = {
        title: 'Nova tarefa',
        description: 'Descrição da nova tarefa',
        status: 'Pendente',
      };

      const response = await request(apiUrl)
        .post('/api/tasks')
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe(taskData.status);
      
      taskId = response.body.id;
    });
  });

  describe('GET /tasks', () => {
    it('Deve listar todas as tarefas', async () => {
      const response = await request(apiUrl).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('Deve atualizar uma tarefa existente', async () => {
      const taskData = {
        title: 'Tarefa Atualizada',
        description: 'Descrição atualizada',
        status: 'Concluída',
      };

      const response = await request(apiUrl)
        .put(`/api/tasks/${taskId}`)
        .send(taskData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe(taskData.status);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('Deve deletar uma tarefa existente', async () => {
      const response = await request(apiUrl).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Tarefa deletada com sucesso.');
    });
  });
});
