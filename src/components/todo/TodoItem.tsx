
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View className="mb-2 min-h-16 flex-row items-center rounded-xl border border-[#35394A] bg-[#1B1E2D] p-3">
      <Pressable
        onPress={() => onToggle(todo.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        accessibilityLabel={`Complete ${todo.title}`}
        className={`mr-3 h-6 w-6 items-center justify-center rounded-md border ${
          todo.completed
            ? 'border-purple-500 bg-purple-600'
            : 'border-[#454B60] bg-[#151827]'
        }`}
      >
        {todo.completed && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}
      </Pressable>

      <Text
        numberOfLines={3}
        className={`flex-1 text-sm ${
          todo.completed
            ? 'text-slate-500 line-through'
            : 'text-slate-200'
        }`}
      >
        {todo.title}
      </Text>

      <Pressable
        onPress={() => onEdit(todo)}
        accessibilityLabel={`Edit ${todo.title}`}
        className="ml-2 p-2"
      >
        <Ionicons name="pencil-outline" size={18} color="#C4B5FD" />
      </Pressable>

      <Pressable
        onPress={() => onDelete(todo.id)}
        accessibilityLabel={`Delete ${todo.title}`}
        className="p-2"
      >
        <Ionicons name="trash-outline" size={18} color="#F0B8C3" />
      </Pressable>
    </View>
  );
}
