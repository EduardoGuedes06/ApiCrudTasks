import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/taskModel';
import { TaskService } from '../services/taskService';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TaskPage: React.FC = () => {
  const taskService = TaskService();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'Pendente' | 'Em andamento' | 'Concluída'>('Pendente');
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<'Pendente' | 'Em andamento' | 'Concluída' | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchedTasks = taskService.getAllTasks();
    setTasks(fetchedTasks);
  }, []);

  const handleCreateTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: newTaskStatus,
      createdAt: new Date().toISOString(),
    };

    taskService.createTask(newTask);
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleUpdateTask = (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id);

    if (taskToUpdate) {
      const updatedTask: Task = {
        ...taskToUpdate,
        status: selectedTaskStatus || taskToUpdate.status,
      };

      taskService.updateTaskStatus(updatedTask);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    }
  };

  const handleDeleteTask = (id: string) => {
    taskService.deleteTaskById(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tarefas</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Título da nova tarefa"
          className="form-control mb-2"
        />
        <textarea
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
          placeholder="Descrição da nova tarefa"
          maxLength={55} // Limita a 55 caracteres
          className="form-control mb-2"
        />
        <select
          value={newTaskStatus}
          onChange={e => setNewTaskStatus(e.target.value as 'Pendente' | 'Em andamento' | 'Concluída')}
          className="form-control mb-2"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button onClick={handleCreateTask} className="btn btn-primary w-100">
          Criar Tarefa
        </button>
      </div>

      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p className="text-muted">{task.status}</p>
            </div>
            <div className="d-flex gap-2">
              <select
                value={selectedTaskStatus || task.status}
                onChange={e => setSelectedTaskStatus(e.target.value as 'Pendente' | 'Em andamento' | 'Concluída')}
                className="form-control"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
              <button onClick={() => handleUpdateTask(task.id)} className="btn btn-success">
                Atualizar
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
