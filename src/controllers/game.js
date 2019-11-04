// @ts-check
'use strict'

import BoardController from '../controllers/board.js'
import BoardView from '../views/boardCli.js'

export default class Game {
  constructor (mode) {
    this.mode = mode
  }
  
  createBoard () {
    this.board = new BoardController(this, BoardView)
  }
  
  startGame () {
    this.board.render()
  }
} 
