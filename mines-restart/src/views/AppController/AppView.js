// @ts-check
'use strict'

import BaseView from '../BaseView.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class AppView extends BaseView {
  #view

  constructor() {
    super()
    this.#view = this.compileTemplate(
      this.readFile(
        path.join(__dirname, './index.htm')))
  }

  /**
   * @param {import("../../models/AppModel.js").default} data
   */
  render (data) {
    return this.#view(data)
  }
}
