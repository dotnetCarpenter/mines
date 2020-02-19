// @ts-check
'use strict'

import ViewUtil from '../ViewUtil.js'
import path from 'path'
import { nodejs } from 'mines-utils'

// @ts-ignore
const __dirname = path.dirname(nodejs.filename(import.meta.url))

export default class GameView {
  #view

  constructor() {
    this.ViewUtil = ViewUtil

    ViewUtil.registerHelper('toFixed', function(number, decimal) {
      if (!Number.isInteger(decimal)) decimal = 2
      return number.toFixed(decimal)
    })

    this.#view = ViewUtil.compileTemplate(
      ViewUtil.readFile(
        path.join(__dirname, './GameView.htm')))
  }

  /**
   * @param {import("../../models/GameModel.js").default} data
   */
  render (data) {
    return this.#view(data)
  }
}
