// @ts-check
'use strict'

import { map } from 'mines-utils'
import { repeat } from 'mines-utils'
import Space from "../models/Space.js"
import Mine from "../models/Mine.js"

// const emojis = new Map()
// emojis.set(0, '🏻')
// emojis.set(1, '𝟭')
// emojis.set(2, '𝟮')
// emojis.set(3, '𝟯')
// emojis.set(4, '𝟰')
// emojis.set(5, '𝟱')
// emojis.set(6, '𝟲')
// emojis.set(7, '𝟳')
// emojis.set(8, '𝟴')
// emojis.set('X', '💣')
// emojis.set('| ', '🌀')
// emojis.set(' |', '🌀')
// emojis.set('_', '🚬')
// emojis.set('-', '🚬')
const emojis = new Map()
emojis.set(0, '   ')
emojis.set(1, ' 1 ')
emojis.set(2, ' 2 ')
emojis.set(3, ' 3 ')
emojis.set(4, ' 4 ')
emojis.set(5, ' 5 ')
emojis.set(6, ' 6 ')
emojis.set(7, ' 7 ')
emojis.set(8, ' 8 ')
emojis.set('X', ' X ')
emojis.set('| ', '|  ')
emojis.set(' |', '  |')
emojis.set('_', '___')
emojis.set('-', '---')

export default class BoardViewCli {
  static render (model) {
    console.log(`Mines: ${model.mines}`, `Percentage mines: ${model.percentageMines.toFixed()}%`)

    const br = '\n'
    const top = repeat(emojis.get('_'), model.board[0].length + 2).join('')
    const bottom = repeat(emojis.get('-'), model.board[0].length + 2).join('')

    let stringBoard = top + br

    stringBoard += map(row =>
      emojis.get('| ') + map(cell =>
        renderCell(cell), row, model.log).join('') + emojis.get(' |') + br
        , model.board, model.log).join('')

    stringBoard += bottom + br

    console.log(stringBoard)
  }
}

function renderCell (cell) {
  if (cell instanceof Space) return emojis.get(cell.value)
  if (cell instanceof Mine) return emojis.get('X')
}
