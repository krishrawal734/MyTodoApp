
import { View, Text } from 'react-native';

type TodoStatsProps = {
  total: number;
  pending: number;
  completed: number;
};

export default function TodoStats({
  total,
  pending,
  completed,
}: TodoStatsProps) {
  return (
    <View className="mt-3 flex-row flex-wrap items-center gap-2">
      <Text className="text-sm text-slate-300">
        {total} total
      </Text>

      <Text className="text-slate-500">·</Text>

      <Text className="text-sm text-slate-300">
        {pending} pending
      </Text>

      <Text className="text-slate-500">·</Text>

      <Text className="text-sm text-slate-300">
        {completed} done
      </Text>
    </View>
  );
}
