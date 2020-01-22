// @ts-check
'use strict'

import { log } from 'mines-utils'
import logMode from '../models/logMode.js'
import BoardController from './BoardController.js'

// TODO: make this universal js
globalThis.MODE = Number(process.env.MODE || 1)

export default class GameController {
  constructor ({width, height, mines}) {
    this.board
    this.width = width
    this.height = height
    this.mines = mines

		log(logMode.warning, `Log mode is set to ${getKey(logMode, globalThis.MODE)}`)
  }

  /**
   * Creates a new empty board.
   */
  createBoard ({ view }) {
    this.board = new BoardController(view, this.width, this.height, this.mines)

    return this
  }

  /**
   * Fill the board with mines and render the view.
   */
  startGame () {
    if (!this.board) throw ".createBoard() must have been called before .startGame()"

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
