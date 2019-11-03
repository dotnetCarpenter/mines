// @ts-check
'use strict'

import map from './map.js'
/**
 * @param {number} size
 * @param {any} [initialValue]
 * @returns {any[]}
 */
export default function createArray(size, initialValue) {
	return map(_ => initialValue, new Array(size));
}
