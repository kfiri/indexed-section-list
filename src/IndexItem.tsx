import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface SelectIndexCallback {
  (selection: { index: number; item: string; method: string }): void;
}

interface ItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
}

class IndexItem extends PureComponent<ItemProps> {
  render() {
    const { index, item, onSelectIndex, indexItemHeight, style } = this.props;
    console.log(TouchableOpacity);
    return (
      <TouchableOpacity
        onPressIn={() => onSelectIndex({ index, item, method: 'press' })}
        style={[
          { width: indexItemHeight },
          styles.indexItem,
          style,
          { height: indexItemHeight },
        ]}
      >
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
