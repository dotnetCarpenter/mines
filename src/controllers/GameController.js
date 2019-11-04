// @ts-check
'use strict'

import BoardController from './BoardController.js'
import BoardViewCli from '../views/BoardViewCli.js'

export default class GameController {

  /** @param {number} mode */
  constructor (mode) {
    this.mode = mode
  }

  /**
   * Creates a new empty board.
   */
  createBoard () {
    this.board = new BoardController(this, BoardViewCli)
    return this
  }

  /**
   * Fill the board with mines and render the view.
   * .createBoard() must have been called before .startGame().
   */
  startGame () {
    // this.board.render()
    this.board.fillBoard()
    this.board.render()
    return this
  }
}
