import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import type { IndexItemProps } from './types';

class IndexItem extends PureComponent<IndexItemProps> {
  render() {
    const { index, item, onSelectIndex, indexItemHeight, style } = this.props;
    return (
      <TouchableOpacity
        onPressIn={() => onSelectIndex({ index, item, method: 'press' })}
        style={[styles.indexItem, style, { height: indexItemHeight }]}>
        <Text style={styles.indexText}>{item}</Text>
      </TouchableOpacity>
    );
  }
}

export default IndexItem;

const styles = StyleSheet.create({
  indexItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 14,
  },
});
