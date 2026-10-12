
import { useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import type { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';

import TodoHeader from '../components/todo/TodoHeader';
import TodoStats from '../components/todo/TodoStats';
import TodoForm from '../components/todo/TodoForm';
import TodoFilters from '../components/todo/TodoFilters';
import TodoSearch from '../components/todo/TodoSearch';
import TodoList from '../components/todo/TodoList';
import TodoFooter from '../components/todo/TodoFooter';
import TodoEditModal from '../components/todo/TodoEditModal';

export default function Index() {
  const todoState = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  if (!todoState.isLoaded) {  
    return (
      <View className="flex-1 items-center justify-center bg-[#030617]">
        <ActivityIndicator size="large" color="#A855F7" />
      </View> 
    );
  }

  return (
    <View className="flex-1 bg-[#030617]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 64,
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-3xl self-center">
          <TodoHeader />

          <TodoStats
            total={todoState.total}
            pending={todoState.pending}
            completed={todoState.completed}
          />

          <View className="mt-6 rounded-2xl border border-[#292D3D] bg-[#101322] p-4">
            <TodoForm onAdd={todoState.addTodo} />
    
            <View className="mt-4">
              <TodoFilters
                selected={todoState.filter}
                onChange={todoState.setFilter}
              />
            </View>

            <TodoSearch
              value={todoState.search}
              onChange={todoState.setSearch}
            />

            <TodoList
              todos={todoState.filteredTodos}
              hasTasks={todoState.todos.length > 0}
              onToggle={todoState.toggleTodo}
              onEdit={setEditingTodo}
              onDelete={todoState.deleteTodo}
            />
          </View>

          <TodoFooter />
        </View>
      </ScrollView>

      <TodoEditModal
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={todoState.editTodo}
      />
    </View>
  );
}
