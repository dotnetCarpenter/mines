// @ts-check
'use strict'

import path from 'path'
import { nodejs } from 'mines-utils'

// @ts-ignore
const __dirname = path.dirname(nodejs.filename(import.meta.url))

export default class BoardView {
  /**
   *
   * @param {import("../ViewUtil").default} ViewUtil
   */
  constructor (ViewUtil) {
    ViewUtil.registerPartial('board',
      ViewUtil.readFile(
        path.join(__dirname, './BoardViewPartial.htm')))
  }
}
