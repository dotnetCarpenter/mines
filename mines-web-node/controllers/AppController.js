// @ts-check
'use strict'

import { log, map } from 'mines-utils'
import { GameController, BoardViewCli, logMode } from 'mines-base'
import AppModel from '../models/AppModel.js'
import AppView from '../views/AppController/AppView.js'

export default class AppController {
  constructor () {
    this.model = new AppModel("Mines", [
      new GameController({ width: 8, height: 8, mines: 10 }),
      new GameController({ width: 16, height: 16, mines: 40 }),
      new GameController({ width: 30, height: 16, mines: 99 }),
      new GameController({ width: 16, height: 16, mines: 255 }),
    ])
    // this.games = map(game => game.createBoard(new BoardViewCli), model.games)
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {import("http2").IncomingHttpHeaders} headers
   */
  main (stream, headers) {
    log(logMode.debug, 'AppController::main')

    // const game = this.games[0]
    // const board = game.startGame()
    const view = new AppView()

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    })

    stream.end(
      view.render(this.model)
    )

    // stream.close()
  }
}
