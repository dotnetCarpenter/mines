// @ts-check
'use strict'

/**
 * Breath First Traversal of `tree`.
 * @param {function} f Function to call for node in `tree`.
 * @param {any[][]} tree Tree to traverse breath first.
 */
export default function breathFirst (f, tree) {
  const children = []

  for (let i = 0, max = tree.length; i < max; i++) {
    f(tree[i])
    if (Array.isArray(tree[i])) children.push(tree[i])
  }

  if (children.length) breathFirst(f, children)
}
