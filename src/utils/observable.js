// @ts-check
'use strict'

export default function observable () {
  const listeners = []

  return {
    on (eventName, f) {
      listeners.push([eventName, f])
    },

    fire (eventName, ...args) {
      for (let [name, handler] of listeners) {
        if (name === eventName) handler(...args)
      }
    },

    off (eventName, f) {
      // const filtered = listeners.filter(([name, handler]) =>
      //   !(name === eventName && !f || handler === f)
      // )
      // listeners.length = 0
      // listeners.push(...filtered)
      for (let i = 0; i < listeners.length; ++i) {
        const [name, handler] = listeners[i]
        if(name === eventName) {
          if (f && handler === f) {
            listeners.splice(i, 1)
            --i
          } else if(!f) {
            listeners.splice(i, 1)
            --i
          }
        }
      }
    }
  }
}
