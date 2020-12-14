# indexed-section-list

A simple modular section list with an index.

![CountriesList](https://user-images.githubusercontent.com/31252902/92656462-c429ac80-f2fb-11ea-8db6-f0615380992e.gif)

## Installation

```sh
npm install --save indexed-section-list
```

## Usage

```js
import react from 'React';
import IndexedSectionList from 'indexed-section-list';

// See all props options in https://github.com/kfiri/indexed-section-list#props
function App() {
  return (
    <IndexedSectionList
      items={countryItems}
      indexItemHeight={20}
      style={styles.sectionList}
      wrapperStyle={styles.wrapper}
      indexWrapperStyle={styles.indexWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
}
```

# Props

Inherits [SectionList props](https://reactnative.dev/docs/sectionlist#props) (omits `sections`, `keyExtractor` and `onScrollToIndexFailed`).  
For implementing `keyExtractor`, see `getSectionProps` below.

| Name                 | Description                                                                                                                                                                                                                                  | Type                                                     | Required |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- |
| items                | The items of the list, either strings or objects with titles.                                                                                                                                                                                | (string \| { title: string; key?: string \| number; })[] | yes      |
| indexItemHeight      | The height if an item in the index list (must be a constant). defaults to 25px.                                                                                                                                                              | number                                                   | no       |
| indexWrapperStyle    | The style of the view that contains the index list.                                                                                                                                                                                          | ViewStyle                                                | no       |
| indexTextStyle       | The style of the view that contains the index text.                                                                                                                                                                                          | TextStyle                                                | no       |
| scrollEfficiency     | The method of the scroll (see Scroll Efficiency Functions). default is "revered".                                                                                                                                                            | "reversed" \| "initial" \| Function                      | no       |
| scrollOnSelect       | Should the section list scroll to an index when `onSelectIndex` is fired? (default true). Set to false if you want to manually scroll the section list using `onSelectIndex`.                                                                | boolean                                                  | no       |
| titleKey             | The title property name of the items. If the items are strings, this will be ignored.                                                                                                                                                        | string                                                   | no       |
| uniqueKey            | The unique key property name of the items. If the items are strings, this will be ignored.                                                                                                                                                   | string                                                   | no       |
| wrapperStyle         | The style of the view that contains both the section list and the index.                                                                                                                                                                     | ViewStyle                                                | no       |
| **Functional Props** |
| onSelectIndex        | A callback that is fired when the user selects an index.                                                                                                                                                                                     | Function                                                 | no       |
| getSectionProps      | A methods that returns a section's properties (see [Section Properties](https://reactnative.dev/docs/sectionlist#type-definitions)). Any change in this prop would cause the whole component to rerender (React.useCallback is recommended). | Function                                                 | no       |

### Ref

The `ref` prop behave exactly the same as the prop `ref` in [SectionList props](https://reactnative.dev/docs/sectionlist#props).

### Scroll Efficiency Functions

Given the height of the index container and the height of the index list, return a number that resembles the correlation between the movement of the user's touch on the list and the scroll of the list.  
Signature `(containerHeight: number, listHeight: number) => number`.

Built in methods-

**reversed** - Set the scroll of the indexes list to the opposite of the user's scroll direction,
so when the user scroll from one edge of the container to the other, the list would complete a full scroll within the container in the opposite direction.

**initial** - The normal scroll. Scroll the indexes list with the user's scroll. simply returns 1.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
