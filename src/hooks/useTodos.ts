
import { useEffect, useMemo, useState } from 'react';
import type { Todo, TodoFilter } from '../types/todo';
import { loadTodos, saveTodos } from '../services/todoStorage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('All');
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved tasks once
  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const saved = await loadTodos();
        if (active) setTodos(saved);
      } finally {
        if (active) setIsLoaded(true);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  // Save tasks after initial loading
  useEffect(() => {
    if (!isLoaded) return;

    saveTodos(todos).catch((error) => {
      console.error('Could not save tasks:', error);
    });
  }, [todos, isLoaded]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = new Date().toISOString();

    setTodos((previous) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        title: trimmed,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
      ...previous,
    ]);
  };

  const toggleTodo = (id: string) => {
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
  };

  const deleteTodo = (id: string) => {
    setTodos((previous) =>
      previous.filter((todo) => todo.id !== id)
    );
  };

  const editTodo = (id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: trimmed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const matchesSearch = todo.title
          .toLowerCase()
          .includes(search.trim().toLowerCase());

        const matchesFilter =
          filter === 'All' ||
          (filter === 'Pending' && !todo.completed) ||
          (filter === 'Completed' && todo.completed);

        return matchesSearch && matchesFilter;
      }),
    [todos, filter, search]
  );

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
    total: todos.length,
    pending: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
    isLoaded,
  };
}
