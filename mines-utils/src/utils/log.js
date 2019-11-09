// @ts-check
'use strict'

import { logMode } from 'mines-base'

/**
 * Log to stdout or stderror based on severity
 * and current environment MODE. If MODE = 0,
 * then this is a no-op.
 * @param {number} severity
 * @param {string} msg
 */
export default function log (severity, msg) {
  // FIXME: `globalThis.MODE` shouldn't need a fallback value
  const mode = Number(globalThis.MODE || process.env.MODE || 4)

  if (severity <= mode) {
    switch (severity) {
      case logMode.error:
        console.error(msg)
        break

      case logMode.warning:
        console.warn(msg)
        break

      default:
        console.log(msg)
        break
    }
  }

  return msg
}
