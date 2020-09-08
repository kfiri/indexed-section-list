import React from 'react';
import { View, SectionList, Text } from 'react-native';

import ListIndex from './ListIndex';

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

class SectionHeader extends React.PureComponent<{ title: string }> {
  render() {
    const { title } = this.props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            paddingHorizontal: 5,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'grey',
          }}>
          {title}
        </Text>
        <View style={{ flex: 1, borderBottomWidth: 2, borderColor: 'gray' }} />
      </View>
    );
  }
}

class ListItem extends React.PureComponent<{ item: ItemObj | string }> {
  render() {
    const { item } = this.props;
    return (
      <View style={{ paddingRight: 30, borderWidth: 0 }}>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    );
  }
}

interface ItemObj {
  title: string;
  key?: string | number;
}

type ItemType = string | ItemObj;

function getTitle(item: string | ItemObj): string {
  return typeof item === 'string' ? item : item.title;
}

export default ({ items }: { items: ItemType[] }) => {
  const sectionListRef = React.useRef<SectionList>(null);

  const sections = React.useMemo(() => {
    const itemSections: {
      [key: string]: { item: ItemType; key: string }[];
    } = {};
    for (const item of items) {
      const itemTitle = getTitle(item);
      const itemSection = getSection(itemTitle);
      const section = (itemSections[itemSection] = itemSections[itemSection] || []);
      // TODO: fix this to count more then 1 key.
      const keysCount = section.filter((i) => i.key === itemTitle).length || '';
      section.push({
        item,
        key:
          typeof item === 'string' || item.key === undefined
            ? itemTitle + keysCount.toString()
            : item.key.toString(),
      });
    }
    return Object.entries(itemSections)
      .map(([sectionTitle, unsortedData]) => ({
        title: sectionTitle,
        key: sectionTitle,
        data: unsortedData.sort((left, right) =>
          compareStrings(getTitle(left.item), getTitle(right.item))
        ),
      }))
      .sort((left, right) => compareStrings(left.title, right.title));
  }, [items]);

  const sectionTitles = React.useMemo(() => sections.map(({ title }) => title), [sections]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.key}
        onScrollToIndexFailed={() => {}}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        renderItem={({ item }) => <ListItem item={item} />}
      />
      <ListIndex
        indexes={sectionTitles}
        indexItemHeight={25}
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
