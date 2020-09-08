import * as React from 'react';
import { SafeAreaView } from 'react-native';
import IndexedSectionList from 'indexed-section-list';

export default function App() {
  return (
    <SafeAreaView>
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
          't',
        ]}
      />
    </SafeAreaView>
  );
}
