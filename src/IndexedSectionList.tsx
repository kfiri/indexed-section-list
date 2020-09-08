import React from 'react';
import { View, SectionList, StyleSheet, SectionListData } from 'react-native';

import type { ItemType, IndexedSectionListProps, SectionItem } from './types';
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

function getTitle(item: ItemType): string {
  return typeof item === 'string' ? item : item.title;
}

export default ({
  items,
  indexItemHeight = 25,
  scrollEfficiency,
  wrapperStyle,
  indexWrapperStyle,
  getSectionProps,
  renderSectionHeader,
  renderItem,
  ...sectionListProps
}: IndexedSectionListProps) => {
  const sectionListRef = React.useRef<SectionList>(null);

  const scrollEfficiencyFunction = React.useMemo(() => {
    if (!scrollEfficiency) {
      return scrollEfficiencyFunctions.reversed;
    } else if (typeof scrollEfficiency === 'string') {
      return scrollEfficiencyFunctions[scrollEfficiency];
    }
    return scrollEfficiency;
  }, [scrollEfficiency]);

  const sections = React.useMemo<SectionListData<SectionItem>[]>(() => {
    const itemSections: {
      [key: string]: { data: ItemType; key: string }[];
    } = {};
    for (const item of items) {
      const itemTitle = getTitle(item);
      const itemSection = getSection(itemTitle);
      const section = (itemSections[itemSection] = itemSections[itemSection] || []);
      let itemKey = typeof item === 'string' ? undefined : item.key;
      if (itemKey === undefined) {
        itemKey = itemTitle;
        let keysCount = 0;
        while (section.filter((i) => i.key === itemKey).length) {
          itemKey = itemTitle + ++keysCount;
        }
      }
      section.push({ data: item, key: itemKey.toString() });
    }
    return Object.entries(itemSections)
      .map<SectionListData<SectionItem>>(([sectionTitle, unsortedData]) => ({
        title: sectionTitle,
        key: sectionTitle,
        data: unsortedData.sort((leftItem, rightItem) =>
          compareStrings(getTitle(leftItem.data), getTitle(rightItem.data))
        ),
        ...(getSectionProps ? getSectionProps(sectionTitle, unsortedData) : {}),
      }))
      .sort((leftSection, rightSection) =>
        compareStrings(leftSection.title, rightSection.title)
      );
  }, [getSectionProps, items]);

  const sectionTitles = React.useMemo(() => sections.map(({ title }) => title), [sections]);

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <SectionList
        {...sectionListProps}
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.key}
        onScrollToIndexFailed={(_info) => console.warn('failed to scroll!')}
        renderSectionHeader={
          renderSectionHeader || (({ section: { title } }) => <SectionHeader title={title} />)
        }
        renderItem={renderItem || (({ item }) => <ListItem item={item} />)}
      />
      <IndexList
        wrapperStyle={indexWrapperStyle}
        indexes={sectionTitles}
        indexItemHeight={indexItemHeight}
        scrollEfficiency={scrollEfficiencyFunction}
        onSelectIndex={(selection) => {
          if (sectionListRef.current !== null) {
            sectionListRef.current.scrollToLocation({
              sectionIndex: selection.index,
              itemIndex: 0,
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: 'flex-end', justifyContent: 'center' },
});
