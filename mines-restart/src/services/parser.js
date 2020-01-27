// @ts-check
'use strict'

import { each, compose, curry } from 'mines-utils'


const TOKEN = {
  EMPTY: 0,
  PATHNAME: 1,
  SEARCH: 2,
  SEARCHPARAMS: 4
}

/**
 * @param {string} input
 */
export default function parser (input) {
  const ast = lexer(input)
  const url = {
    pathname: '',
    search: '',
    searchParams: new Map,
    href: input
  }

  each(t => {
    if (t.type === TOKEN.PATHNAME)
      url.pathname = t.val
    if (t.type === TOKEN.SEARCH)
      url.search = t.val
    if (t.type === TOKEN.SEARCHPARAMS)
      url.searchParams.set(...t.val.split('='))
  }, ast)

  return url
}

const matcher = curry(matchTerm)
const pathname = matcher(
  term => term.startsWith('/'),
  term => ({ type: TOKEN.PATHNAME, val: term })
)
const search = matcher(
  term => term.startsWith('?'),
  term => ({ type: TOKEN.SEARCH, val: term })
)
const searchParams = matcher(
  term => /(&|\?)\w+=./.test(term),
  term => ({ type: TOKEN.SEARCHPARAMS, val: term.slice(1) })
)

/**
 * @param {string} term
 */
function lexer (term) {
  const cursor = Object.seal({
    endIndex: term.length,
    startIndex: term.length,
    get term() {
      return term.substring(this.startIndex, this.endIndex)
    },
    reset () {
      this.endIndex = term.length
      this.startIndex = term.length
    },
    flush () {
      this.endIndex = this.startIndex
    }
  })

  const groupTokenizer = compose(
    pathname(cursor),
    search(cursor))

  const innerTokenizer = searchParams(cursor)

  const tokenizer = compose(
    tokens => incrementor(innerTokenizer, cursor, tokens),
    tokens => {
      cursor.reset()
      return tokens
    },
    tokens => incrementor(groupTokenizer, cursor, tokens)
  )

  return tokenizer([])
}

function incrementor (f, cursor, tokens) {
  if (cursor.startIndex > 0) cursor.startIndex--
  else return tokens

  return incrementor(f, cursor, f(tokens))
}

function matchTerm (matcher, map, cursor, tokens) {
  if (matcher(cursor.term)) {
    tokens.push(map(cursor.term))
    cursor.flush()
  }
  return tokens
}
