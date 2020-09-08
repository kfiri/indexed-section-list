import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Easing,
  GestureResponderEvent,
  ListRenderItemInfo,
} from 'react-native';
import IndexItem from './IndexItem';

const SCROLL_PIXELS_PER_SECOND = 100;

/**
 *
 * @param {*} listHeight
 * @param {*} containerHeight
 */
function scrollEfficiency(containerHeight: number, listHeight: number) {
  return (containerHeight - listHeight) / (containerHeight - 50);
}
// function scrollEfficiency(listHeight, containerHeight) {
//   return 1;
// }

interface SelectIndexCallback {
  (selection: { index: number; item: string; method: string }): void;
}

interface Props {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
}

export default ({ indexes, onSelectIndex, indexItemHeight }: Props) => {
  const containerRef = React.useRef<View>(null);
  const flatListRef = React.useRef<FlatList>(null);

  const containerMeasure = React.useRef<{ height: number; pageY: number }>({
    height: 0,
    pageY: 0,
  });
  const flatListScroll = React.useRef(0);
  // The previous/initial position of a drag relative to the container.
  const cursorPrevPosition = React.useRef<number | null>(null);
  // The active position of a drag relative to the container.
  const cursorPosition = React.useRef<number | null>(null);
  const activeIndex = React.useRef<number | null>(null);

  const scrollPosition = React.useMemo(() => new Animated.Value(0), []);

  /**
   * Scroll the flat-list and call onSelectIndex for a new scroll position.
   * @param {{ value }} value - the value of the scroll position.
   */
  const scrollListener: Animated.ValueListenerCallback = React.useMemo(
    () => ({ value }) => {
      if (flatListRef.current) {
        flatListScroll.current = value;
        flatListRef.current.scrollToOffset({
          offset: value,
          animated: false,
        });
      }

      if (cursorPosition.current !== null) {
        const { height: containerHeight } = containerMeasure.current;
        const listHeight = Math.max(containerHeight, indexes.length * indexItemHeight);
        let newSelectedIndex = Math.floor(
          ((cursorPosition.current + flatListScroll.current) / listHeight) * indexes.length
        );
        newSelectedIndex = Math.max(0, Math.min(indexes.length - 1, newSelectedIndex));
        if (activeIndex.current !== newSelectedIndex) {
          activeIndex.current = newSelectedIndex;
          onSelectIndex({
            index: newSelectedIndex,
            item: indexes[newSelectedIndex],
            method: 'drag',
          });
        }
      }
    },
    [indexes, indexItemHeight, onSelectIndex]
  );

  React.useEffect(() => {
    const listenerId = scrollPosition.addListener(scrollListener);
    return () => scrollPosition.removeListener(listenerId);
  }, [scrollPosition, scrollListener]);

  /**
   * Start an animation for the scroll position to a new position.
   * @param {number} position - the new scroll position.
   */
  const animateScroll = React.useMemo(
    () => (position: number) => {
      const scrollDuration =
        (Math.abs(position - flatListScroll.current) * 1000) / SCROLL_PIXELS_PER_SECOND;
      Animated.timing(scrollPosition, {
        toValue: position,
        duration: scrollDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    },
    [scrollPosition]
  );

  return (
    <View style={styles.listIndexWrapper}>
      <View
        style={styles.indexContainer}
        ref={containerRef}
        collapsable={false}
        onLayout={() => {
          if (containerRef.current !== null) {
            containerRef.current.measure((_ox, _oy, _width, height, _px, py) => {
              containerMeasure.current = { height: height, pageY: py };
              console.log(height);
            });
          }
        }}>
        <Animated.FlatList
          ref={flatListRef}
          contentContainerStyle={styles.indexContentContainer}
          data={indexes}
          scrollEnabled={false}
          getItemLayout={(_data: any, index: number) => ({
            length: indexItemHeight,
            offset: indexItemHeight * index,
            index,
          })}
          onMoveShouldSetResponderCapture={() => true}
          onResponderGrant={(event: GestureResponderEvent) => {
            const { pageY: containerPageY } = containerMeasure.current;
            cursorPrevPosition.current = event.nativeEvent.pageY - containerPageY;
          }}
          onResponderMove={(event: GestureResponderEvent) => {
            const {
              height: containerHeight,
              pageY: containerPageY,
            } = containerMeasure.current;
            const listHeight = Math.max(containerHeight, indexes.length * indexItemHeight);
            const scrollTop = listHeight - containerHeight;
            cursorPosition.current = Math.max(
              0,
              Math.min(containerHeight, event.nativeEvent.pageY - containerPageY)
            );
            if (cursorPosition.current !== null && containerHeight < listHeight) {
              const efficiency = scrollEfficiency(containerHeight, listHeight);
              if (cursorPosition.current === 0) {
                // The cursor is at/bellow the bottom of the list container.
                if (cursorPrevPosition.current !== 0) {
                  // The cursor just collided with the border - start scrolling animation.
                  animateScroll(efficiency > 0 ? scrollTop : 0);
                }
              } else if (cursorPosition.current === containerHeight) {
                // The cursor is at/above the top of the list container.
                if (cursorPrevPosition.current !== containerHeight) {
                  // The cursor just collided with the border - start scrolling animation.
                  animateScroll(efficiency > 0 ? 0 : scrollTop);
                }
              } else if (cursorPrevPosition.current !== null) {
                // The cursor is within the list container - scroll manually.
                scrollPosition.setValue(
                  Math.max(
                    0,
                    Math.min(
                      listHeight - containerHeight,
                      flatListScroll.current +
                        (cursorPrevPosition.current - cursorPosition.current) * efficiency
                    )
                  )
                );
              }
            } else {
              scrollPosition.setValue(0);
            }
            cursorPrevPosition.current = cursorPosition.current;
          }}
          onResponderRelease={() => {
            cursorPrevPosition.current = null;
            cursorPosition.current = null;
            scrollPosition.stopAnimation();
            activeIndex.current = null;
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: string) => item}
          renderItem={({ item, index }: ListRenderItemInfo<string>) => (
            <IndexItem
              index={index}
              item={item}
              onSelectIndex={onSelectIndex}
              indexItemHeight={indexItemHeight}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listIndexWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    marginVertical: 25,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  indexContainer: {
    flexGrow: 1,
  },
  indexContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  indexItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 14,
  },
});
