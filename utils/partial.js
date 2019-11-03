// @ts-check
'use strict'

export default function partial(f, ...args) {
	return f.bind(null, ...args);
}
