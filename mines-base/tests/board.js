// @ts-check
'use strict'

// import assert from 'assert'

import logMode from '../src/models/logMode.js'
import BoardController from '../src/controllers/BoardController.js'
import BoardView from '../src/views/BoardViewCli.js'

// const board = { width: 8,  height: 8, mines: 10 }
// const board = { width: 16, height: 16, mines: 40 }
// const board = { width: 30, height: 16, mines: 99 }
const board = { width: 16, height: 16, mines: 99 }

const boardController = new BoardController(
  { mode: logMode.silence },
  BoardView,
  board.width,
  board.height,
  board.mines)

boardController.render()
boardController.fillBoard()
boardController.render()
