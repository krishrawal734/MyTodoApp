// defines the data structure and allowed filter values


export type Todo = {
  id: string;
  title: string;
  completed: boolean;        
  createdAt: string;
  updatedAt: string;
};

export type TodoFilter = 'All' | 'Pending' | 'Completed';
