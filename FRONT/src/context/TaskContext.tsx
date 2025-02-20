import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within TaskProvider");
  return context;
};
