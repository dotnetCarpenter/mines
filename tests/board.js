// @ts-check
'use strict'

import assert from 'assert'

import BoardModel from '../models/board.js'
import boardController from '../controllers/board.js'
import BoardView from '../views/boardCli.js'

// for (let i = 10; i > 0; --i) {
//   console.log(boardModel(10, 10, 10))
// }
// const board = boardModel(16, 16, 40)
const board = new BoardModel(30, 16, 99)
let view = new boardController(board, BoardView)
view.render()
