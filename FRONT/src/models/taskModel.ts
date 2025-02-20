export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'Pendente' | 'Em andamento' | 'Concluída';
    createdAt: string;
  }
  