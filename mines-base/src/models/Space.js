import Cell from './Cell.js'
import Mine from './Mine.js'
import logMode from './logMode.js'
import { log } from 'mines-utils'

export default class Space extends Cell {
  constructor () {
    super()
    this.x
    this.y
    this.value = 0
  }

  setNumber(board, x, y) {
    this.x = x
    this.y = y

    this.value = peekAround(board, x, y)
      .reduce((accu, value) =>
        value instanceof Mine
          ? ++accu
          : accu, 0)

    log(logMode.debug, `setNumber(${x}, ${y}) with ${this.value} mines around`)

    return this
  }
}

function peekAround (board, x, y) {
  const northEast = y === 0 || x === 0 ? null : board[y-1][x-1]
  const north = y === 0 ? null : board[y-1][x]
  const northWest = y === 0 || x === board[0].length - 1 ? null : board[y-1][x+1]
  const west = x === board[0].length - 1 ? null : board[y][x+1]
  const southWest = y === board.length - 1 || x === board[0].length - 1 ? null : board[y+1][x+1]
  const south = y === board.length - 1 ? null : board[y+1][x]
  const southEast = y === board.length - 1 || x === 0 ? null : board[y+1][x-1]
  const east = x === 0 ? null : board[y][x-1]
  return [northEast, north, northWest, west, southWest, south, southEast, east]
}
