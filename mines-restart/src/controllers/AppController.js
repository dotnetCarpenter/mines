// @ts-check
'use strict'

import AppModel from '../models/AppModel.js'
import AppView from '../views/AppController/AppView.js'
import GameController from './GameController.js'
// import { map } from 'mines-utils'

export default class AppController {
  #view
  #model

  constructor () {
    const title = 'Mines'
    // TODO: Can we put controllers in our model?
    const games = [
      new GameController({ width: 8, height: 8, mines: 10 }),
      new GameController({ width: 16, height: 16, mines: 40 }),
      new GameController({ width: 30, height: 16, mines: 99 }),
      new GameController({ width: 16, height: 16, mines: 255 }),
    ]

    this.#view = new AppView()
    this.#model = new AppModel({ title, games })
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {import("http2").IncomingHttpHeaders} headers
   */
  main (stream, headers) {
    console.log('AppController::main')
    console.warn('path', headers[':path'])

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': "200"
    })

    stream.end(
      this.#view.render(this.#model)
    )
  }
}
