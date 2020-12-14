import React, { Ref, ReactInstance } from 'react';
import { View, SectionList, StyleSheet, SectionListData } from 'react-native';

import type {
  LiteralString,
  IndexedSectionListProps,
  SectionItem,
  IndexedSectionListData,
} from './types';
import { scrollEfficiencyFunctions } from './defaultFunctions';
import SectionHeader from './SectionHeader';
import ListItem from './ListItem';
import IndexList from './IndexList';

// See https://javascript.info/regexp-unicode#unicode-properties-p
// https://github.com/facebook/react-native/issues/29807
const UNICODE_REGEX = /[a-zA-Z]/;
const UNICODE_NUMBER_REGEX = /[#0-9]/;

function getSection(text: string) {
  text = text.trim();
  if (!text.length) {
    return '&';
  } else if (UNICODE_NUMBER_REGEX.test(text[0])) {
    return '#';
  } else if (UNICODE_REGEX.test(text[0])) {
    return text[0].toUpperCase();
  }
  return '&';
}

function compareStrings(leftString: string, rightString: string) {
  const left = leftString.toLowerCase();
  const right = rightString.toLowerCase();
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

export default React.forwardRef(
  <TitleKey extends LiteralString<TitleKey>, UniqueKey extends LiteralString<UniqueKey>>(
    {
      items,
      indexItemHeight = 25,
      scrollEfficiency,
      wrapperStyle,
      indexWrapperStyle,
      indexTextStyle,
      getSectionProps,
      uniqueKey = 'key' as UniqueKey,
      titleKey = 'title' as TitleKey,
      renderSectionHeader = ({ section: { title } }) => <SectionHeader title={title} />,
      renderItem = ({ item }) => <ListItem item={item} />,
      onSelectIndex = undefined,
      scrollOnSelect = true,
      ...sectionListProps
    }: IndexedSectionListProps<TitleKey, UniqueKey>,
    ref: Ref<ReactInstance | null>
  ) => {
    const sectionListRef = React.useRef<SectionList>(null);
    React.useImperativeHandle(ref, () => sectionListRef.current);

    const scrollEfficiencyFunction = React.useMemo(() => {
      if (!scrollEfficiency) {
        return scrollEfficiencyFunctions.reversed;
      } else if (typeof scrollEfficiency === 'string') {
        return scrollEfficiencyFunctions[scrollEfficiency];
      }
      return scrollEfficiency;
    }, [scrollEfficiency]);

    const sections = React.useMemo<SectionListData<SectionItem<TitleKey, UniqueKey>>[]>(() => {
      const itemSections: { [sectionKey: string]: SectionItem<TitleKey, UniqueKey>[] } = {};
      for (const item of items) {
        // Get the title of the item from the `titleKey` property if it's not a string.
        const itemTitle: string = typeof item === 'string' ? item : item[titleKey];
        if (itemTitle === undefined) {
          throw Error(`${JSON.stringify(item)} has no property ${titleKey}`);
        }

        // Get the section of the item and set default array to the sections in that key.
        const itemSection = getSection(itemTitle);
        const section = (itemSections[itemSection] = itemSections[itemSection] || []);

        // Get the key from the item. If there is no key in the item,
        // generate a unique key for that item in the section array.
        let itemKey: string | number | undefined =
          typeof item === 'string' ? undefined : item[uniqueKey];
        if (itemKey === undefined) {
          itemKey = itemTitle;
          let keysCount = 0;
          while (section.filter((i) => i.key === itemKey).length) {
            itemKey = itemTitle + ++keysCount;
          }
        }
        section.push({ data: item, title: itemTitle, key: itemKey.toString() });
      }
      return Object.entries(itemSections)
        .map<IndexedSectionListData<TitleKey, UniqueKey>>(([sectionKey, unsortedData]) => ({
          title: sectionKey,
          key: sectionKey,
          data: unsortedData.sort((leftItem, rightItem) =>
            compareStrings(leftItem.title, rightItem.title)
          ),
          ...(getSectionProps ? getSectionProps(sectionKey, unsortedData) : {}),
        }))
        .sort((leftSection, rightSection) =>
          compareStrings(leftSection.title, rightSection.title)
        );
    }, [getSectionProps, items, titleKey, uniqueKey]);

    const sectionTitles = React.useMemo(() => sections.map(({ title }) => title), [sections]);

    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <SectionList
          onScrollToIndexFailed={(_info) => console.warn('failed to scroll!')}
          {...sectionListProps}
          ref={sectionListRef}
          sections={sections}
          keyExtractor={(item) => item.key}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        />
        <IndexList
          wrapperStyle={indexWrapperStyle}
          indexTextStyle={indexTextStyle}
          indexes={sectionTitles}
          indexItemHeight={indexItemHeight}
          scrollEfficiency={scrollEfficiencyFunction}
          onSelectIndex={(selection) => {
            scrollOnSelect &&
              sectionListRef.current &&
              sectionListRef.current.scrollToLocation({
                sectionIndex: selection.index,
                itemIndex: 0,
              });
            onSelectIndex && onSelectIndex(selection);
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: { alignItems: 'flex-end', justifyContent: 'center' },
});
