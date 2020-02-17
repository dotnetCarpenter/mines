// @ts-check
'use strict'

// @ts-ignore
import pkg from '../../package.json'
import AppModel from '../models/AppModel.js'
import AppView from '../views/AppController/AppView.js'
// import GameController from './GameController.js'

export default class AppController {
  #view
  #model

  constructor () {
    const title = 'Mines'
    const { version } = pkg
    // TODO: Can we put controllers in our model?
    const gameTiles = [
      { width: 8, height: 8, mines: 10 },
      { width: 16, height: 16, mines: 40 },
      { width: 30, height: 16, mines: 99 },
      { width: 16, height: 16, mines: 255 },
    ]

    this.#view = new AppView()
    this.#model = new AppModel({ title, gameTiles, version })
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} [stream]
   * @param {import("http2").IncomingHttpHeaders} [headers]
   * @param {import("../services/looseURL").URLPath} [url]
   * @returns {string} HTML
   */
  main (stream, headers, url) {
    console.log('AppController::main')
    return this.#view.render(this.#model)
  }
}
