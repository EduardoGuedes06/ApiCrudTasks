import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskPage } from './components/taskPage';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <TaskPage />
    </TaskProvider>
  );
};

export default App;
