// @ts-check
'use strict'

import mode from '../src/models/logMode.js'
import Game from '../src/controllers/game.js'

const game = new Game(mode.warning)
game.createBoard()
game.startGame()
