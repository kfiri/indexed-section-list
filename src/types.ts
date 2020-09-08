import type { ViewStyle, SectionListProps, SectionListData } from 'react-native';
import type { scrollEfficiencyFunctions } from './defaultFunctions';

interface ItemObj {
  title: string;
  key?: string | number;
}
export type ItemType = string | ItemObj;

export interface SectionItem {
  data: ItemType;
  key: string;
}

type SelectIndexMethods = 'drag' | 'press';
export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: SelectIndexMethods }): void;
}

export type ScrollEfficiencyFunction = (containerHeight: number, listHeight: number) => number;

// ============= Main component =============
// TODO: allow ref, keyExtractor?, onScrollToIndexFailed.
export interface IndexedSectionListProps
  extends Omit<
    SectionListProps<SectionItem>,
    'ref' | 'sections' | 'keyExtractor' | 'onScrollToIndexFailed'
  > {
  items: ItemType[];

  /**
   *
   */
  getSectionProps?: (
    title: string,
    unsortedData: SectionItem[]
  ) => SectionListData<SectionItem>;
  indexItemHeight?: number;
  scrollEfficiency?: keyof typeof scrollEfficiencyFunctions | ScrollEfficiencyFunction | null;
  wrapperStyle?: ViewStyle;
  indexWrapperStyle?: ViewStyle;
}

// =========== Section components ===========
export interface SectionHeaderProps {
  title: string;
}
export interface ListItemProps {
  item: { data: ItemType; key: string };
}

// ============ Index components ============
export interface IndexListProps {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  scrollEfficiency: ScrollEfficiencyFunction;
  wrapperStyle?: ViewStyle;
}
export interface IndexItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
}
