// @ts-check
'use strict'

// import { version } from '../../package.json'
import AppModel from '../models/AppModel.js'
import AppView from '../views/AppController/AppView.js'
// import GameController from './GameController.js'

export default class AppController {
  #view
  #model

  constructor () {
    const title = 'Mines'
    // TODO: Can we put controllers in our model?
    const gameTiles = [
      { width: 8, height: 8, mines: 10, id: 1 },
      { width: 16, height: 16, mines: 40, id: 2 },
      { width: 30, height: 16, mines: 99, id: 3 },
      { width: 16, height: 16, mines: 255, id: 4 },
    ]

    this.#view = new AppView()
    this.#model = new AppModel({ title, gameTiles/* , version */ })
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {?import("http2").IncomingHttpHeaders} header
   * @param {?any} url
   */
  main (stream, header, url) {
    // console.log('AppController::main')

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': '200'
    })

    stream.end(this.#view.render(this.#model))
  }

  /**
   * Create a game.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {import("http2").IncomingHttpHeaders} headers
   * @param {?object} url
   */
  createGame (stream, headers, url) {
    console.log('GameController::createGame')

    stream.respond({
      ':status': '201',
      'location': '/game/play'
    })

    // stream.end()
  }
}
