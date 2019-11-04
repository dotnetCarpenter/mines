// @ts-check
'use strict'


import logMode from '../src/models/logMode.js'
import logger from '../src/utils/logger.js'

const print = 'must print'
const noPrint = 'no print'

var log = logger(logMode.debug)
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, print)
log(logMode.debug, print)

var log = logger(logMode.warning)
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, print)
log(logMode.debug, noPrint)

var log = logger(logMode.error)
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, noPrint)
log(logMode.debug, noPrint)


var log = logger(logMode.silence)
log(logMode.info, print)
log(logMode.error, noPrint)
log(logMode.warning, noPrint)
log(logMode.debug, noPrint)
