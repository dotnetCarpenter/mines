// @ts-check

import { logMode } from 'mines-base'
import log from './log.js'
import each from './each.js'

/**
 * @template A,B
 * @param {{(arg0: A, arg1: number):B}} f Callback
 * @param {A[]} list Array-like
 * @returns {B[]}
 */
export default function map(f, list) {
	const a = new Array(list.length)

	log(logMode.debug, `map called looping ${list.length} times`)

	each((value, index) => {
		a[index] = value
	}, list)

	return a
}
