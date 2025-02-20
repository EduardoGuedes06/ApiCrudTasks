import { useTask } from "../context/TaskContext";

export const TaskPage = () => {
  const { tasks } = useTask();

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};
