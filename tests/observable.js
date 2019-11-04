// @ts-check
'use strict'

import assert from 'assert'
import observable from '../src/utils/observable.js'

let o = observable()

function spy () {
  let counter = 0
  let argumentHistory = []
  const f = (...args) => {
    counter++
    argumentHistory.push(args)
  }

  Object.defineProperty(f, 'callCount', {
    get () { return counter }
  })
  Object.defineProperty(f, 'calledWithExactly', {
    value (...args) {
      return argumentHistory.some(calledArgs => calledArgs.includes(...args))
    }
  })

  return f
}

var f1 = spy()
o.on('foo', f1)
o.fire('foo', 'bar1')
o.off('foo')
o.fire('foo', 'bar1')

assert(f1.callCount === 1)
assert.ok(f1.calledWithExactly('bar1'))



var f1 = spy()
o.on('foo', f1)
o.fire('foo', 'bar2')
o.off('foo', f1)
o.fire('foo', 'bar2')

assert(f1.callCount === 1)
assert.ok(f1.calledWithExactly('bar2'))



var f1 = spy()
var f2 = spy()
o.on('foo', f1)
o.on('foo', f2)
o.on('foo', f1)
o.fire('foo', 'bar3')
o.off('foo', f1)
o.fire('foo', 'bar4')

assert(f1.callCount === 2)
assert.ok(f1.calledWithExactly('bar3'))
assert(f2.callCount === 2)
assert.ok(f2.calledWithExactly('bar3'))
assert.ok(f2.calledWithExactly('bar4'))
