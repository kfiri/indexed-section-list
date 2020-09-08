import type { ViewStyle } from 'react-native';

interface ItemObj {
  title: string;
  key?: string | number;
}
export type ItemType = string | ItemObj;

export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: string }): void;
}

export interface IndexItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
}

export interface IndexListProps {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
}
