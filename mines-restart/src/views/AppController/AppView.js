// @ts-check
'use strict'

import ViewUtil from '../ViewUtil.js'
import path from 'path'
import { nodejs } from 'mines-utils'

// @ts-ignore
const __dirname = path.dirname(nodejs.filename(import.meta.url))

export default class AppView {
  #view

  constructor() {
    ViewUtil.registerPartial('gameTile',
      ViewUtil.readFile(
        path.join(__dirname, './GameTilePartial.htm')))

    this.#view = ViewUtil.compileTemplate(
      ViewUtil.readFile(
        path.join(__dirname, './AppView.htm')))
  }

  /**
   * @param {import("../../models/AppModel.js").default} data
   */
  render (data) {
    return this.#view(data)
  }
}
