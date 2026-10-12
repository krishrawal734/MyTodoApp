
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodoFooter() {
  return (
    <View className="flex-row items-center justify-center gap-2 py-5">
      <Ionicons name="shield-checkmark-outline" size={15} color="#8290A8" />

      <Text className="text-xs text-blue-300">
        Made with ❤️ by {'Krish Rawal '}
      </Text>
    </View>
  );
}
