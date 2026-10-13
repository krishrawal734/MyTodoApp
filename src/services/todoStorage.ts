
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '../types/todo';
import { TODO_STORAGE_KEY } from '../constants/todo';

export async function loadTodos(): Promise<Todo[]> {
  try {
    const savedTodos = await AsyncStorage.getItem(TODO_STORAGE_KEY);

    if (!savedTodos) return [];

    const parsed: unknown = JSON.parse(savedTodos);

    if (!Array.isArray(parsed)) return [];

    return parsed as Todo[];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}

// SAVE TASKKS  

export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify(todos)
    );
  } catch (error) {
    console.error('Failed to save todos:', error);
    throw error;
  }
}
