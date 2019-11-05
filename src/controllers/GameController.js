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
    // const board = { width: 8,  height: 8, mines: 10 }
    // const board = { width: 16, height: 16, mines: 40 }
    const board = { width: 30, height: 16, mines: 99 }
    // const board = { width: 16, height: 16, mines: 99 }

    this.board = new BoardController(
      this,
      BoardViewCli,
      board.width,
      board.height,
      board.mines)

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
