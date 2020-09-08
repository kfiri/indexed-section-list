import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import IndexedSectionList from 'indexed-section-list';
import countries from './countries';

const countryItems = countries.map((x) => ({ ...x, title: x.name }));

export default function App() {
  return (
    <SafeAreaView>
      <IndexedSectionList
        items={countryItems}
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
  wrapper: { marginTop: 20 },
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
