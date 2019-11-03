// @ts-check
'use strict'

/**
 * @param {function} f
 * @param {any[]} list
 */
export default function map(f, list) {
	const max = list.length;
	const a = new Array(max);
	console.log(`map called looping ${max} times`);
	for (let i = 0; i < max; ++i) {
		a[i] = f(list[i]);
	}
	return a;
}
