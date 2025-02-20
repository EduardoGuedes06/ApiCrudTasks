import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/taskModel";
import { TaskService } from "../services/taskService";
import { NotificationService } from "../services/notificationService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TaskPage.css";

interface TaskPageProps {
  isMenuOpen: boolean;
  authToken: string | null;
}

export const TaskPage: React.FC<TaskPageProps> = ({ isMenuOpen, authToken }) => {
  const taskService = TaskService();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<"Pendente" | "Em andamento" | "Concluída">("Pendente");
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<"Pendente" | "Em andamento" | "Concluída" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const fetchTasks = async () => {
      if (!authToken) return;
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, [authToken]);

  const handleCreateTask = async () => {
    if (!newTaskTitle || !newTaskDescription) {
      NotificationService.error("Título e descrição são obrigatórios!");
      return;
    }

    const newTaskData = {
      title: newTaskTitle,
      description: newTaskDescription,
      status: newTaskStatus,
    };

    try {
      const createdTask = await taskService.createTask(newTaskData);
      if (!createdTask) throw new Error("Tarefa não foi criada corretamente");

      setTasks((prev) => [...prev, createdTask]); // Garante que createdTask é válido
      setNewTaskTitle("");
      setNewTaskDescription("");
      NotificationService.success("Tarefa criada com sucesso!");
    } catch (error) {
      NotificationService.error("Erro ao criar a tarefa.");
    }
  };


  const handleUpdateTask = async (id: string) => {
    if (!authToken) {
      NotificationService.error("Por favor, obtenha um token para continuar.");
      return;
    }

    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = {
      ...taskToUpdate,
      title: newTaskTitle || taskToUpdate.title,
      description: newTaskDescription || taskToUpdate.description,
      status: selectedTaskStatus || taskToUpdate.status,
    };

    try {
      await taskService.updateTaskStatus(updatedTask);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      setNewTaskTitle("");
      setNewTaskDescription("");
      NotificationService.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      NotificationService.error("Erro ao atualizar a tarefa.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!authToken) {
      NotificationService.error("Por favor, obtenha um token para continuar.");
      return;
    }

    try {
      await taskService.deleteTaskById(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      NotificationService.success("Tarefa deletada com sucesso!");
    } catch (error) {
      NotificationService.error("Erro ao deletar a tarefa.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Suas Tarefas</h1>

      <div className="task-form mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Título da nova tarefa"
          className="form-control mb-2"
          disabled={isMenuOpen}
        />
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Descrição da nova tarefa"
          maxLength={55}
          className="form-control mb-2"
          disabled={isMenuOpen}
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value as "Pendente" | "Em andamento" | "Concluída")}
          className="form-control mb-2"
          disabled={isMenuOpen}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button onClick={handleCreateTask} className="btn btn-primary w-100" disabled={isMenuOpen}>
          Criar Tarefa
        </button>
      </div>

      <hr className="separator" />

      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p className={`text-muted ${task.status === "Pendente" ? "status-pendente" : task.status === "Em andamento" ? "status-em-andamento" : "status-concluida"}`}>
                {task.status}
              </p>
              <small>Criada em: {new Date(task.createdAt).toLocaleString()}</small>
              <br />
              <small>Última atualização: {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "Ainda não atualizada"}</small>
            </div>
            <div className="d-flex gap-2">
              <input
                type="text"
                defaultValue={task.title}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="form-control"
                disabled={isMenuOpen}
              />
              <textarea
                defaultValue={task.description}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="form-control"
                disabled={isMenuOpen}
              />
              <select
                value={selectedTaskStatus || task.status}
                onChange={(e) => setSelectedTaskStatus(e.target.value as "Pendente" | "Em andamento" | "Concluída")}
                className="form-control"
                disabled={isMenuOpen}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
              <button onClick={() => handleUpdateTask(task.id)} className="btn btn-success" disabled={isMenuOpen}>
                Atualizar
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger" disabled={isMenuOpen}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
