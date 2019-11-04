// @ts-check
'use strict'

/**
 * Repeat `x` number of `times`, by appending to
 * `accu`. Returns `accu`.
 * @param {any} x
 * @param {number} times
 * @param {any[]} [accu]
 * @returns {any[]}
 */
export default function repeat(x, times, accu = []) {
  if (times === 0)
    return accu;
  accu.push(x);
  return accu.concat(repeat(x, --times));
}
