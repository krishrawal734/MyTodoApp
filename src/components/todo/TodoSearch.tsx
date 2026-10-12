
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TodoSearch({ value, onChange }: Props) {
  return (
    <View className="mt-3 h-11 flex-row items-center rounded-xl border border-[#292D3D] bg-[#0A0D1B] px-3">
      <Ionicons name="search-outline" size={18} color="#8290A8" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search tasks..."
        placeholderTextColor="#8290A8"
        autoCapitalize="none"
        className="ml-2 flex-1 text-sm text-white"
      />
    </View>
  );
}
