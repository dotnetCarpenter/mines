// @ts-check
'use strict'

import logMode from '../models/logMode.js'

/**
 * @param {number} mode
 */
export default function logger (mode) {
  return (severity, msg) => {
    if (severity <= mode) {
      switch (severity) {
        case logMode.error:
          console.error(msg)
          break

        case logMode.warning:
          console.warn(msg)
          break

        case logMode.silence:
        case logMode.debug:
          console.log(msg)
          break
      }
    }

    return msg
  }
}
