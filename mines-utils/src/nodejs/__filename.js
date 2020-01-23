// @ts-check
'use strict'

import { fileURLToPath } from 'url'

/**
 * Get the file path of the callee
 * @param {string} importUrl import.meta.url
 */
export default function filename (importUrl) {
  return fileURLToPath(importUrl)
}
