import React from 'react';
import IndexedSectionList from './IndexedSectionList';

export default ({ items }: { items: string[] }) => {
  return <IndexedSectionList items={items} />;
};
