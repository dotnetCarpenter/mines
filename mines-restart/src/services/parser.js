import { each, compose, curry } from 'mines-utils'

// @ts-check

const TOKEN = {
  EMPTY: 0,
  PATHNAME: 1,
  SEARCH: 2,
  SEARCHPARAMS: 4
}

const EMPTY_TOKEN = { type: TOKEN.EMPTY, val: '' }

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
    curry(pathname)(cursor),
    curry(search)(cursor))

  const innerTokenizer = compose(curry(searchParams)(cursor))

  const tokenizer = compose(
    tokens => incrementor(innerTokenizer, cursor, tokens),
    tokens => {
      cursor.reset()
      return tokens
    },
    tokens => incrementor(groupTokenizer, cursor, tokens)
  )

  const tokens = tokenizer([])

  return tokens
}

function incrementor (f, cursor, tokens) {
  if (cursor.startIndex > 0) cursor.startIndex--
  else return tokens

  return incrementor(f, cursor, f(tokens))
}

function pathname (cursor, tokens) {
  const t = cursor.term
  if (t.startsWith('/')) {
    tokens.push({ type: TOKEN.PATHNAME, val: t })
    cursor.flush()
  }
  return tokens
}

function search (cursor, tokens) {
  const t = cursor.term
  if (t.startsWith('?')) {
    tokens.push({ type: TOKEN.SEARCH, val: cursor.term })
    cursor.flush()
  }
  return tokens
}

function searchParams (cursor, tokens) {
  const t = cursor.term
  if (/(&|\?)\w+=./.test(t)) {
    tokens.push({ type: TOKEN.SEARCHPARAMS, val: cursor.term.slice(1) })
    cursor.flush()
  }
  return tokens
}
