
import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { Todo } from '../../types/todo';

type Props = {
  todo: Todo | null;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
};

type ContentProps = {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
};

function TodoEditModalContent({ todo, onClose, onSave }: ContentProps) {
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    const trimmed = title.trim();     

    if (!trimmed) return;

    onSave(todo.id, trimmed);
    onClose();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 justify-center bg-black/70 px-5"
    >
      <View className="rounded-2xl border border-[#35394A] bg-[#101322] p-5">
        <Text className="text-xl font-semibold text-white">
          Edit task
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor="#8290A8"
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
          className="mt-5 rounded-xl border border-[#35394A] bg-[#0A0D1B] px-4 py-3 text-white"
        />

        <View className="mt-5 flex-row justify-end gap-3">
          <Pressable
            onPress={onClose}
            className="rounded-xl bg-[#252A3B] px-4 py-3"
          >
            <Text className="font-medium text-slate-200">
              Cancel
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSave}
            disabled={!title.trim()}
            className="rounded-xl bg-purple-600 px-4 py-3"
          >
            <Text className="font-semibold text-white">
              Save changes
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function TodoEditModal({
  todo,
  onClose,
  onSave,
}: Props) {
  return (
    <Modal
      visible={todo !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {todo && (
        <TodoEditModalContent
          key={todo.id}
          todo={todo}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </Modal>
  );
}
