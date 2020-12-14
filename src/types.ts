import type { ViewStyle, TextStyle, SectionListProps, SectionListData } from 'react-native';
import type { scrollEfficiencyFunctions } from './defaultFunctions';

// ================= Utils ==================

// From https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Ensure that type T is not a union.
// From https://stackoverflow.com/a/53955431 and https://stackoverflow.com/a/56375136
export type LiteralString<T> = [T] extends [UnionToIntersection<T>] ? string : never;

// =============== Core Items ===============

type ItemObj<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> = { [key in UniqueKey]?: string | number } &
  { [title in TitleKey]: string } & { [k: string]: any };

export type ItemType<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> = string | ItemObj<TitleKey, UniqueKey>;

export type SectionItem<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> = {
  data: ItemType<TitleKey, UniqueKey>;
  title: string;
  key: string;
};
export interface IndexedSectionListData<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> extends SectionListData<SectionItem<TitleKey, UniqueKey>> {
  title: string;
  key: string;
}

type SelectIndexMethods = 'drag' | 'press';
export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: SelectIndexMethods }): void;
}

export type ScrollEfficiencyFunction = (containerHeight: number, listHeight: number) => number;

// ============= Main component =============
// TODO: allow keyExtractor?, onScrollToIndexFailed.
export interface IndexedSectionListProps<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> extends Omit<
    SectionListProps<SectionItem<TitleKey, UniqueKey>>,
    'sections' | 'keyExtractor' | 'onScrollToIndexFailed'
  > {
  /**
   * A methods that returns a section's properties
   * (see [Section Properties](https://reactnative.dev/docs/sectionlist#type-definitions)).
   *
   * Any change in this prop would cause the whole component to rerender (React.useCallback is recommended).
   */
  getSectionProps?: (
    title: string,
    unsortedData: SectionItem<TitleKey, UniqueKey>[]
  ) => Partial<IndexedSectionListData<TitleKey, UniqueKey>>;
  /** The height if an item in the index list (must be a constant). defaults to 25px. */
  indexItemHeight?: number;
  /** The style of the view that contains the index list. */
  indexWrapperStyle?: ViewStyle;
  /** The style of the view that contains the index text. */
  indexTextStyle?: TextStyle;
  /** The items of the list, either strings or objects with a title property. */
  items: ItemType<TitleKey, UniqueKey>[];
  /** A callback that is fired when the user selects an index. */
  onSelectIndex?: SelectIndexCallback;
  /** The method of the scroll (the correlation of a drag movement and the scroll). default is "revered". */
  scrollEfficiency?: keyof typeof scrollEfficiencyFunctions | ScrollEfficiencyFunction | null;
  /** Should the section list scroll to an index when onSelectIndex is fired? (default true). */
  scrollOnSelect?: boolean;
  /** The title property name of the items. If the items are strings, this will be ignored. */
  titleKey?: TitleKey;
  /** The unique key property name of the items. If the items are strings, this will be ignored. */
  uniqueKey?: UniqueKey;
  /** The style of the view that contains both the section list and the index. */
  wrapperStyle?: ViewStyle;
}

// =========== Section components ===========
export interface SectionHeaderProps {
  title: string;
}
export interface ListItemProps<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> {
  item: { data: ItemType<TitleKey, UniqueKey>; key: string };
}

// ============ Index components ============
export interface IndexListProps {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  scrollEfficiency: ScrollEfficiencyFunction;
  wrapperStyle?: ViewStyle;
  indexTextStyle?: TextStyle;
}
export interface IndexItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
  indexTextStyle?: TextStyle;
}
