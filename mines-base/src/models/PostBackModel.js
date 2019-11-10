// @ts-check
'use strict'

import { map } from 'mines-utils'
import Space from "./Space.js"
import Mine from "./Mine.js"
export default class PostBackModel {
  constructor (model) {
    this.title = 'Mines'
    this.mines = model.mines
    this.percentageMines = model.percentageMines.toFixed(1)
    this.width = model.board[0].length
    this.height = model.board.length

    this.board = map(row =>
      map(cell =>
        renderCell(cell), row), model.board)
  }
}

function renderCell (cell) {
  if (cell instanceof Space) return cell.value.toString()
  if (cell instanceof Mine) return '💣'
}
