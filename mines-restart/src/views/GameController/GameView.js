// @ts-check
'use strict'

import BaseView from '../BaseView.js'
import path from 'path'
import { nodejs } from 'mines-utils'

// @ts-ignore
const __dirname = path.dirname(nodejs.filename(import.meta.url))

export default class GameView extends BaseView {
  #view

  constructor() {
    super()
    this.#view = this.compileTemplate(
      this.readFile(
        path.join(__dirname, './GameView.htm')))
  }

  /**
   * @param {import("../../models/GameModel.js").default} data
   */
  render (data) {
    return this.#view(data)
  }
}
