// @ts-check
'use strict'

import BoardController from './BoardController.js'
import BoardViewCli from '../views/BoardViewCli.js'

export default class GameController {
  constructor (mode) {
    this.mode = mode
  }

  createBoard () {
    this.board = new BoardController(this, BoardViewCli)
  }

  startGame () {
    // this.board.render()
    this.board.fillBoard()
    this.board.render()
  }
}
