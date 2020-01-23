// @ts-check
'use strict'

import breathFirst from './universal/breathFirst.js'
import createArray from './universal/createArray.js'
import log from './universal/log.js'
import observable from './universal/observable.js'
import random from './universal/random.js'
import compose from './universal/compose.js'
import curry from './universal/curry.js'
import map from './universal/map.js'
import partial from './universal/partial.js'
import repeat from './universal/repeat.js'
import filename from './nodejs/__filename.js'

const nodejs = {
  filename
}

export {
  breathFirst,
  createArray,
  log,
  observable,
  random,
  compose,
  curry,
  map,
  partial,
  repeat,
  nodejs,
}
