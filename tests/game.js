// @ts-check
'use strict'

import mode from '../src/models/logMode.js'
import Game from '../src/controllers/game.js'

const game = new Game(mode.debug)
game.createBoard()
game.startGame()
