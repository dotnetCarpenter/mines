import { each } from 'mines-utils'

// @ts-check

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
    searchParams: new Map
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
  const tokens = []
  let counter = term.length

  for (let i = counter - 1; i > -1; --i) {
    const token = tokenizer(term.substring(i, counter))

    switch (token.type) {
      case TOKEN.EMPTY: break
      case TOKEN.SEARCHPARAMS:
        token.val = token.val.slice(1)
        tokens.push(token)
        counter = i
        break
      case TOKEN.SEARCH:
        const ts = lexer('&' + token.val.slice(1))
        tokens.push(token)
        tokens.push(...ts)
        counter = i
        break
      case 1:
      default:
        counter = i
        tokens.push(token)
    }
  }

  return tokens
}

function tokenizer (term) {
  let token = { val: '', type: TOKEN.EMPTY }

  switch (term) {
    case pathname(term):
      token.type = TOKEN.PATHNAME; break
    case searchParams(term):
      token.type = TOKEN.SEARCHPARAMS; break
    case search(term):
      token.type = TOKEN.SEARCH; break
  }

  if (token.type !== TOKEN.EMPTY) token.val = term

  return token
}

function pathname (term) {
  return term.startsWith('/') && term
}

function search (term) {
  return term.startsWith('?') && term
}

function searchParams (term) {
  return /&\w+=./.test(term) && term
}
