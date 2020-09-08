import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import IndexedSectionList from 'indexed-section-list';

export default function App() {
  return (
    <View style={styles.container}>
      <IndexedSectionList
        items={[
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
