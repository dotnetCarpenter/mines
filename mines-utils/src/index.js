// @ts-check
'use strict'

import breathFirst from './universal/breathFirst.js'
import compose from './universal/compose.js'
import createArray from './universal/createArray.js'
import curry from './universal/curry.js'
import each from './universal/each.js'
import log from './universal/log.js'
import map from './universal/map.js'
import observable from './universal/observable.js'
import partial from './universal/partial.js'
import random from './universal/random.js'
import repeat from './universal/repeat.js'
import filename from './nodejs/__filename.js'

const nodejs = {
  filename
}

export {
  breathFirst,
  compose,
  createArray,
  curry,
  each,
  log,
  map,
  observable,
  partial,
  random,
  repeat,
  nodejs,
}
