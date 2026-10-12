
import { View, Text, Pressable } from 'react-native';
import type { TodoFilter } from '../../types/todo';
import { TODO_FILTERS } from '../../constants/todo';

type Props = {
  selected: TodoFilter;
  onChange: (filter: TodoFilter) => void;
};

export default function TodoFilters({ selected, onChange }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {TODO_FILTERS.map((filter) => {
        const active = selected === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            className={`rounded-xl border px-3 py-2 ${
              active
                ? 'border-purple-500 bg-[#30203B]'
                : 'border-[#35394A] bg-[#1B1E2D]'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                active ? 'text-purple-200' : 'text-slate-300'
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
