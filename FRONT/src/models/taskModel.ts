export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída';
  createdAt: string;
  updatedAt: string;
}
