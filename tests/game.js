// @ts-check
'use strict'

import mode from '../src/models/logMode.js'
import Game from '../src/controllers/game.js'

const game = new Game(mode.info)
game.createBoard()
game.startGame()
