import type { ViewStyle } from 'react-native';
import type { scrollEfficiencyFunctions } from './defaultFunctions';

interface ItemObj {
  title: string;
  key?: string | number;
}
export type ItemType = string | ItemObj;

type SelectIndexMethods = 'drag' | 'press';
export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: SelectIndexMethods }): void;
}

export type ScrollEfficiencyFunction = (containerHeight: number, listHeight: number) => number;

// ============= Main component =============
export interface IndexedSectionListProps {
  items: ItemType[];
  indexItemHeight?: number;
  scrollEfficiency?: keyof typeof scrollEfficiencyFunctions | ScrollEfficiencyFunction | null;
  style?: ViewStyle;
}

// =========== Section components ===========
export interface SectionHeaderProps {
  title: string;
}

// ============ Index components ============
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
