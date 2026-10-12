
import { View, Text } from 'react-native';

export default function TodoHeader() {
  return (
    <View className="gap-1">
      <Text className="text-3xl font-bold  text-blue-300">
        Todo List
      </Text>

      <Text className="text-2xl font-semibold tracking-tight text-white">
        Stay on top of your day
      </Text>

      <Text className="mt-2 text-sm text-slate-300">
        Organize your tasks and get things done.
      </Text>
    </View>
  );
}
