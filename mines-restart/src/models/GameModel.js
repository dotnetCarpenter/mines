// @ts-check
'use strict'

export default class GameModel {
  constructor ({width, height, mines, time = 0}) {
    this.width = width
    this.height = height
    this.mines = mines
    this.time = time
  }

  startOver () {}

  changeDifficulty () {}

  pause () {}
}
