import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import IndexedSectionList from 'indexed-section-list';
import countries from './countries';

export default function App() {
  return (
    <SafeAreaView style={styles.areaView}>
      <Text style={styles.header}>Countries list!</Text>
      <IndexedSectionList
        items={countries}
        titleKey="name"
        indexItemHeight={20}
        style={styles.sectionList}
        wrapperStyle={styles.wrapper}
        indexWrapperStyle={styles.indexWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: { flex: 1, marginTop: 10 },
  sectionList: { width: '100%' },
  indexWrapper: {
    top: 0,
    bottom: 0,
    right: 10,
    width: 25,
    alignItems: 'stretch',
    marginVertical: 30,
    borderWidth: 1,
    borderRadius: 8,
  },
});
