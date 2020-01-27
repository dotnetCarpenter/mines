// @ts-check
'use strict'

import AppController from '../controllers/AppController.js'
import GameController from '../controllers/GameController.js'

const app = new AppController()
const game = new GameController()

// export default new Map([['/', new AppController()]])
export default [
  ['/', app],
  ['/game', game],
]
