// @ts-check
'use strict'

import BaseView from '../BaseView.js'
import path from 'path'
import { nodejs } from 'mines-utils'

// @ts-ignore
const __dirname = path.dirname(nodejs.filename(import.meta.url))

export default class AppView extends BaseView {
  #view

  constructor() {
    super()

    this.registerPartial('gameTile',
      this.readFile(
        path.join(__dirname, './GameTile.htm')))

    this.#view = this.compileTemplate(
      this.readFile(
        path.join(__dirname, './AppView.htm')))
  }

  /**
   * @param {import("../../models/AppModel.js").default} data
   */
  render (data) {
    return this.#view(data)
  }
}
