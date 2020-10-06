import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { LiteralString, ListItemProps } from './types';

class ListItem<
  TitleKey extends LiteralString<TitleKey>,
  UniqueKey extends LiteralString<UniqueKey>
> extends React.PureComponent<ListItemProps<TitleKey, UniqueKey>> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.itemText}>
          Key: {item.key}, Item: {item.data.toString()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: { paddingRight: 30 },
  itemText: { paddingHorizontal: 10 },
});

export default ListItem;
