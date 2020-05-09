import { helper } from '@ember/component/helper';

/**
 * Checks whether or not the item is included in the array.
 *
 * @param array [Array] Array of items.
 * @param item [any] Item which should be validated.
 */
export default helper(function includes([array, item]/*, hash*/) {
  return array.includes( item );
});
