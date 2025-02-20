// src/App.tsx
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskPage } from './components/taskPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navBar';  // Importar o Navbar

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Navbar />
      <ToastContainer />
    </TaskProvider>
  );
};

export default App;