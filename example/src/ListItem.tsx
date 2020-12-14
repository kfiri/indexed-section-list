import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ListItem extends React.PureComponent<{ item: { data: any; key: string } }> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.itemWrapper}>
        <Text numberOfLines={1} style={styles.itemText}>
          <Text>Key: </Text>
          <Text style={styles.blue}>{item.key}</Text>
          <Text>, Item: </Text>
          <Text style={styles.red}>{JSON.stringify(item.data)}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: { paddingRight: 30, height: 20 },
  itemText: { paddingHorizontal: 10 },
  blue: { color: 'blue' },
  red: { color: 'red' },
});

export default ListItem;
