import type { ViewStyle } from 'react-native';
import type { scrollEfficiencyFunctions } from './defaultFunctions';

interface ItemObj {
  title: string;
  key?: string | number;
}
export type ItemType = string | ItemObj;

export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: string }): void;
}

export type ScrollEfficiencyFunction = (containerHeight: number, listHeight: number) => number;

export interface IndexedSectionListProps {
  items: ItemType[];
  scrollEfficiency?: keyof typeof scrollEfficiencyFunctions | ScrollEfficiencyFunction | null;
}

export interface IndexListProps {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  scrollEfficiency: ScrollEfficiencyFunction;
}

export interface IndexItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
}
