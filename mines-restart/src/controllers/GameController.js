// @ts-check
'use strict'

// import BoardController from './BoardController.js'

export default class GameController {
  #board

  constructor ({width, height, mines}) {
    this.width = width
    this.height = height
    this.mines = mines
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
