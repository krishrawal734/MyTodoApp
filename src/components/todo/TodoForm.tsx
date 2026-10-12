
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAdd(trimmedTitle);
    setTitle('');
    Keyboard.dismiss();
  };

  return (
    <View className="flex-row gap-3">
      <TextInput
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleAdd}
        placeholder="Add a task..."
        placeholderTextColor="#8290A8"
        returnKeyType="done"
        className="h-12 flex-1 rounded-xl border border-[#292D3D] bg-[#0A0D1B] px-3 text-base text-white"
      />

      <Pressable
        onPress={handleAdd}
        accessibilityRole="button"
        className="h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#292D3D] px-4 active:opacity-70"
      >
        <Ionicons name="add" size={20} color="#E2E8F0" />

        <Text className="font-semibold text-slate-200">
          Add
        </Text>
      </Pressable>
    </View>
  );
}
