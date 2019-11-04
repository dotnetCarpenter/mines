// @ts-check
'use strict'

import map from "../utils/map.js"
import Space from "../models/Space.js"
import Mine from "../models/Mine.js"
import repeat from "../utils/repeat.js"

export default class BoardView {
  static render (board) {
    console.log(`Mines: ${board.mines}`, `Percentage mines: ${board.percentageMines.toFixed()}%`)

    const br = '\n'
    const top = repeat('_', board.board[0].length + 2).join('')
    const bottom = repeat('-', board.board[0].length + 2).join('')
    let stringBoard = top + br

    stringBoard += map(row => {
      return'|' + map(cell => renderCell(cell), row).join('') + '|' + br
    }, board.board).join('')
    stringBoard += bottom + br

    console.log(stringBoard)
  }
}

function renderCell (cell) {
  if (cell.valueOf() instanceof Space) return ' '
  if (cell.valueOf() instanceof Mine) return 'X'
}
