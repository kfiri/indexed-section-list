import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import type { IndexItemProps } from './types';

class IndexItem extends PureComponent<IndexItemProps> {
  render() {
    const { index, item, onSelectIndex, indexItemHeight, style } = this.props;
    return (
      <TouchableOpacity
        onPressIn={() => onSelectIndex({ index, item, method: 'press' })}
        style={[
          { width: indexItemHeight },
          styles.indexItem,
          style,
          { height: indexItemHeight },
        ]}>
        <Text style={styles.indexText}>{item}</Text>
      </TouchableOpacity>
    );
  }
}

export default IndexItem;

const styles = StyleSheet.create({
  listIndexContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    marginVertical: 25,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  indexContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  indexItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 14,
  },
});
