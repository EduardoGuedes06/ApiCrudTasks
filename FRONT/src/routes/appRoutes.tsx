import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "../pages/TaskPage";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TaskPage />} />
    </Routes>
  </Router>
);
