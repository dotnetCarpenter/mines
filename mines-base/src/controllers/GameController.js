// @ts-check
'use strict'

import { log } from 'mines-utils'
import logMode from '../models/logMode.js'
import BoardController from './BoardController.js'
import BoardViewCli from '../views/BoardViewCli.js'

// TODO: make this universal js
globalThis.MODE = Number(process.env.MODE || 1)

export default class GameController {
  constructor () {
    this.board

		log(logMode.warning, `Log mode is set to ${getKey(logMode, globalThis.MODE)}`)
  }

  /**
   * Creates a new empty board.
   */
  createBoard (/* {width,height, mines} */) {
    // const board = { width: 2,  height: 2, mines: 1 }
    const board = { width: 8,  height: 8, mines: 10 }
    // const board = { width: 16, height: 16, mines: 40 }
    // const board = { width: 30, height: 16, mines: 99 }
    // const board = { width: 16, height: 16, mines: 99 }
    // const board = { width: 16, height: 16, mines: 255 }

    this.board = new BoardController(
      BoardViewCli,
      board.width,
      board.height,
      board.mines)

    return this
  }

  /**
   * Fill the board with mines and render the view.
   * .createBoard() must have been called before .startGame().
   */
  startGame () {
    // this.board.render()
    this.board.fillBoard()
    this.board.render()
    return this
  }
}

function getKey (obj, value) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key
		}
	}
}
