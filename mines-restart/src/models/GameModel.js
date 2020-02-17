// @ts-check

export default class GameModel {
  board

  constructor ({title, width, height, mines, time = 0}) {
    this.title = title
    this.width = Number(width)
    this.height = Number(height)
    this.mines = Number(mines)
    this.time = Number(time)
    this.flags = 0
  }

  startOver () {}

  changeDifficulty () {}

  pause () {}
}
