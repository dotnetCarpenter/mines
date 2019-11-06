// @ts-check
'use strict'

import mode from '../models/logMode.js'
import GameController from '../controllers/GameController.js'

const game = new GameController(mode.silence)
game.createBoard()
game.startGame()
