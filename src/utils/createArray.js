// @ts-check
'use strict'

import map from './map.js'

/**
 * @param {number} size
 * @param {function} f
 * @param {function} log
 * @returns {any[]}
 */
export default function createArray(size, f, log) {
	return map(f, new Array(size), log)
}
