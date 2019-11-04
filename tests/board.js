// @ts-check
'use strict'

// import assert from 'assert'

import logMode from '../src/models/logMode.js'
import logger from '../src/utils/logger.js'
import BoardModel from '../src/models/BoardModel.js'
import BoardController from '../src/controllers/BoardController.js'
import BoardView from '../src/views/BoardViewCli.js'

// const board = new BoardModel(8, 8, 10)
const boardModel = new BoardModel(16, 16, 40, logger(logMode.silence))
// const board = new BoardModel(30, 16, 99)
let viewController = new BoardController(boardModel, BoardView)
viewController.render()
viewController.board.fillBoard()
viewController.render()
