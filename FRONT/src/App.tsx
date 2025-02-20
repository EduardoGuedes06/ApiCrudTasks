import { AppRoutes } from "./routes/appRoutes";
import { TaskProvider } from "./context/TaskContext";

export const App = () => (
  <TaskProvider>
    <AppRoutes />
  </TaskProvider>
);
