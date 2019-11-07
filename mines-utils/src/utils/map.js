// @ts-check
'use strict'

import { logMode } from 'mines-base'
import log from './log.js'

/**
 * @template A,B
 * @param {{(arg0: A, arg1: number):B}} f Callback
 * @param {A[]} list Array-like
 * @returns {B[]}
 */
export default function map(f, list) {
	const max = list.length
	const a = new Array(max)

	log(logMode.debug, `map called looping ${max} times`)

	for (let i = 0; i < max; ++i) {
		a[i] = f(list[i], i)
	}
	return a
}
