// @ts-check
'use strict'

import { logMode } from 'mines-base'

/**
 * Log to stdout or stderror based on severity
 * and current environment MODE. If MODE = 1,
 * then this is a no-op.
 * @param {number} severity
 * @param {string} msg
 */
export default function log (severity, msg) {
  const mode = globalThis.MODE

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
