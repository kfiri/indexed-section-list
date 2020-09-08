import * as React from 'react';
import { SafeAreaView } from 'react-native';
import IndexedSectionList from 'indexed-section-list';
import countries from './countries';

const countryItems = countries.map((x) => ({ ...x, title: x.name }));

export default function App() {
  return (
    <SafeAreaView>
      <IndexedSectionList items={countryItems} />
    </SafeAreaView>
  );
}
