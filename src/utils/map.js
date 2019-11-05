// @ts-check
'use strict'

import logMode from '../models/logMode.js'

/**
 * @param {function} f
 * @param {any[]} list
 * @param {function} [log]
 */
export default function map(f, list, log) {
	const max = list.length
	const a = new Array(max)

	if (log) log(logMode.debug, `map called looping ${max} times`)

	for (let i = 0; i < max; ++i) {
		a[i] = f(list[i], i)
	}
	return a
}
