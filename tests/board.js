// @ts-check
'use strict'

// import assert from 'assert'

import logMode from '../src/models/logMode.js'
import logger from '../src/utils/logger.js'
import BoardModel from '../src/models/board.js'
import BoardController from '../src/controllers/board.js'
import BoardView from '../src/views/boardCli.js'

// const board = new BoardModel(8, 8, 10)
const board = new BoardModel(16, 16, 40, logger(logMode.silent))
// const board = new BoardModel(30, 16, 99)
let view = new BoardController(board, BoardView)
view.render()
