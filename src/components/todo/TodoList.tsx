
import { FlatList, Text, View } from 'react-native';
import type { Todo } from '../../types/todo';
import TodoItem from './TodoItem';
import TodoEmptyState from './TodoEmptyState';

type Props = {
  todos: Todo[];
  hasTasks: boolean;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({
  todos,
  hasTasks,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View className="mt-4">
      <Text className="mb-3 text-xs text-slate-500">
        Tap the checkbox to complete a task.
      </Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={<TodoEmptyState hasTasks={hasTasks} />}
      />
    </View>
  );
}
