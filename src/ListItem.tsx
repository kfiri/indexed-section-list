import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { ItemType } from './types';

class ListItem extends React.PureComponent<{ item: { data: ItemType; key: string } }> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.itemText}>
          Key: {JSON.stringify(item.key)}, Item: {JSON.stringify(item.data)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: { paddingRight: 30, borderWidth: 0 },
  itemText: { paddingHorizontal: 10 },
});

export default ListItem;
