// @ts-check
'use strict'

import AppController from '../controllers/AppController.js'
import GameController from '../controllers/GameController.js'

export default new Map([
  ['/', new AppController],
  ['/game', new GameController]
])
// export default [
//   ['/', new AppController],
//   ['/game', new GameController],
// ]
