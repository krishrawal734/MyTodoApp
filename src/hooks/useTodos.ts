
import { useEffect, useMemo, useState } from 'react';
import type { Todo, TodoFilter } from '../types/todo';
import { loadTodos, saveTodos } from '../services/todoStorage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('All');
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved todos
  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const savedTodos = await loadTodos();

        if (active) {
          setTodos(savedTodos);
        }
      } finally {
        if (active) {
          setIsLoaded(true);
        }    
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  // Save todos after loading
  useEffect(() => {
    if (isLoaded) {
      saveTodos(todos).catch(console.error);
    }
  }, [todos, isLoaded]);

  // Add a todo
  function addTodo(title: string) {
    title = title.trim();
    if (!title) return;

    const now = new Date().toISOString();

    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTodos((previous) => [newTodo, ...previous]);
  }

  // Complete or uncomplete a todo
  function toggleTodo(id: string) {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }

  // Delete a todo
  function deleteTodo(id: string) {
    setTodos((previous) =>
      previous.filter((todo) => todo.id !== id)
    );
  }

  // Edit a todo
  function editTodo(id: string, title: string) {
    title = title.trim();
    if (!title) return;

    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }

  // Search and filter todos
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Pending' && !todo.completed) ||
        (filter === 'Completed' && todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  // Count todos
  const total = todos.length;
  const pending = todos.filter((todo) => !todo.completed).length;
  const completed = todos.filter((todo) => todo.completed).length;

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    total,
    pending,
    completed,
    isLoaded,
  };
}
