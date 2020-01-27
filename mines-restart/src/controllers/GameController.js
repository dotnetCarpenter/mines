// @ts-check
'use strict'

import GameModel from '../models/GameModel.js'
import GameView from '../views/GameController/GameView.js'
// import BoardController from './BoardController.js'

export default class GameController {
  #board
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
  main (stream, headers, path) {
    console.log('GameController::main')

    this.#model = new GameModel({
      mines: path.searchParams.get('mines'),
      width: path.searchParams.get('width'),
      height: path.searchParams.get('height'),
    })

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
  createBoard ({ view }) {
    // this.#board = new BoardController(view, this.width, this.height, this.mines)

    return this
  }

  /**
   * Fill the board with mines and render the view.
   */
  startGame () {
    if (!this.#board) throw ".createBoard() must have been called before .startGame()"

    // this.#board.render()
    this.#board.fillBoard()
    this.#board.render()

    return this
  }
}
