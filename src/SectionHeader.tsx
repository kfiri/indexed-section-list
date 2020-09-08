import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import type { SectionHeaderProps } from './types';

class SectionHeader extends React.PureComponent<SectionHeaderProps> {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionDivider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionWrapper: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: {
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  sectionDivider: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default SectionHeader;
