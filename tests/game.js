// @ts-check
'use strict'

import mode from '../src/models/logMode.js'
import GameController from '../src/controllers/GameController.js'

const game = new GameController(mode.warning)
game.createBoard()
game.startGame()
