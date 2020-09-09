# indexed-section-list

A simple modular section list with an index.
![CountriesList](https://user-images.githubusercontent.com/31252902/92656155-3483fe00-f2fb-11ea-9be0-6d2bd519fbb9.gif)

## Installation

```sh
npm install indexed-section-list
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

Inherits [Sectionlist props](https://reactnative.dev/docs/sectionlist#props).

| Name              | Description                                                                                                                          | Type                                                     | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | -------- |
| items             | The items of the list, either strings or objects with titles.                                                                        | (string \| { title: string; key?: string \| number; })[] | yes      |
| indexItemHeight   | The height if an item in the index list (must be a constant). defaults to 25px.                                                      | number                                                   | no       |
| indexWrapperStyle | The style of the view that contains the index list.                                                                                  | ViewStyle                                                | no       |
| scrollEfficiency  | The method of the scroll (see Scroll Efficiency Functions). default is "revered".                                                    | "reversed" \| "initial" \| Function                      | no       |
| wrapperStyle      | The style of the view that contains both the section list and the index.                                                             | ViewStyle                                                | no       |
| getSectionProps   | A methods that returns a section's properties (see [Section Properties](https://reactnative.dev/docs/sectionlist#type-definitions)). | Function                                                 | no       |

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
