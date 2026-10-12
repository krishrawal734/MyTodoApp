
import { View, Text } from 'react-native';

type Props = {
  hasTasks: boolean;
};

export default function TodoEmptyState({ hasTasks }: Props) {
  return (
    <View className="items-center justify-center py-8">
      <Text className="text-base font-medium text-slate-300">
        {hasTasks ? 'No matching tasks' : 'No tasks yet'}
      </Text>

      <Text className="mt-2 text-center text-sm text-slate-500">
        {hasTasks
          ? 'Try another search or filter.'
          : 'Add your first task to get started.'}
      </Text>
    </View>
  );
}
