/**
 * Set the scroll of the indexes list to the opposite of the user's scroll direction,
 * so when the user scroll from one edge of the container to the other, the list
 * would complete a full scroll within the container in the opposite direction.
 * @param listHeight - the height of the index items list content.
 * @param containerHeight - the height of the index container.
 * @returns the multiplier of the scroll event value to change way the scroll behaves.
 */
function reversedScrollEfficiency(containerHeight: number, listHeight: number) {
  return (containerHeight - listHeight) / (containerHeight - 50);
}

/**
 * Scroll the indexes list with the user's scroll.
 * @param listHeight - the height of the index items list content.
 * @param containerHeight - the height of the index container.
 * @returns the multiplier of the scroll event value to change way the scroll behaves.
 */
function initialScrollEfficiency(_containerHeight: number, _listHeight: number) {
  return 1;
}

export const scrollEfficiencyFunctions = {
  reversed: reversedScrollEfficiency,
  initial: initialScrollEfficiency,
};
