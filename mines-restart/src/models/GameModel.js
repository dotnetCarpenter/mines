// @ts-check
'use strict'


export default class GameModel {
  #board

  constructor ({width, height, mines, time = 0}) {
    this.width = Number(width)
    this.height = Number(height)
    this.mines = Number(mines)
    this.time = Number(time)
  }

  setBoard (board) {
    this.#board = board
  }

  startOver () {}

  changeDifficulty () {}

  pause () {}
}
