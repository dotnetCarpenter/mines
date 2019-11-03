// @ts-check
'use strict'

import assert from 'assert'

import BoardModel from '../models/board.js'
import BoardController from '../controllers/board.js'
import BoardView from '../views/boardCli.js'

// const board = boardModel(16, 16, 40)
const board = new BoardModel(30, 16, 99)
let view = new BoardController(board, BoardView)
view.render()
