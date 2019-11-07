// @ts-check
'use strict'

import logMode from '../src/models/logMode.js'
import { log } from 'mines-utils'

const print = 'must print'
const noPrint = 'no print'

globalThis.MODE = logMode.debug
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, print)
log(logMode.debug, print)

globalThis.MODE = logMode.warning
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, print)
log(logMode.debug, noPrint)

globalThis.MODE = logMode.error
log(logMode.silence, print)
log(logMode.error, print)
log(logMode.warning, noPrint)
log(logMode.debug, noPrint)


globalThis.MODE = logMode.silence
log(logMode.info, print)
log(logMode.error, noPrint)
log(logMode.warning, noPrint)
log(logMode.debug, noPrint)
