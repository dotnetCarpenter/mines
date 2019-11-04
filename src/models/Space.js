import Cell from './Cell.js'
import logMode from './logMode.js'

export default class Space extends Cell {
  constructor (board, log) {
    super(board, log)
  }

  setNumber() {
    this.log(logMode.warning, `setNumber`)
    return this
  }
}
