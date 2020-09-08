import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { ListItemProps } from './types';

class ListItem extends React.PureComponent<ListItemProps> {
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
