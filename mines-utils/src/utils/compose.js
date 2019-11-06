// @ts-check
'use strict'

export default function compose(...fs) {
	return initialValue => fs.reduceRight((value, f) => f(value), initialValue);
}
