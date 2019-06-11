/**
 * Linear mapping https://stackoverflow.com/a/12931306
 *
 * @param {*} low1
 * @param {*} high1
 * @param {*} low2
 * @param {*} rangeB2
 */
export default function(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
