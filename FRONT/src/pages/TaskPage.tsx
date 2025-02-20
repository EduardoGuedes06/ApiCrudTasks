import React from 'react';
import { useTaskContext } from '../context/TaskContext';

export const TaskPage: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
