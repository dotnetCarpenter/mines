// @ts-check
'use strict'

import mode from '../src/models/logMode.js'
import GameController from '../src/controllers/GameController.js'

const game = new GameController(mode.silence)
game.createBoard()
game.startGame()
