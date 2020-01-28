// @ts-check
'use strict'

import GameModel from '../models/GameModel.js'
import GameView from '../views/GameController/GameView.js'
import BoardController from './BoardController.js'

export default class GameController {
  #view
  #model

  constructor () {
    this.#view = new GameView()
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {import("http2").IncomingHttpHeaders} headers
   */
  main (stream, headers, url) {
    console.log('GameController::main')

    this.#model = new GameModel({
      mines: url.searchParams.get('mines'),
      width: url.searchParams.get('width'),
      height: url.searchParams.get('height'),
    })

    this.createBoard()

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': "200"
    })

    stream.end(this.#view.render(this.#model))
  }

  /**
  * Creates a new empty board.
  */
  createBoard () {
    this.#model.setBoard(
      new BoardController(this.#model)
    )
    // console.log(this.#model)
  }

  /**
   * Fill the board with mines and render the view.
   */
  startGame () {
    if (!this.#model.board) throw ".createBoard() must have been called before .startGame()"

    this.#model.board.fillBoard()
    this.#model.board.render()
  }
}
