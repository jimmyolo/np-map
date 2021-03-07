'use strict'

const recursiveMap = async (iterable, mapper, concurrency = Infinity) => {
  if (typeof mapper !== 'function') {
    throw new TypeError('Mapper function is required')
  }

  const results = []
  const entries = iterable.entries()
  const run = async () => {
    for (const [key, val] of entries) {
      results[key] = await mapper(val, key)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(iterable.length, concurrency) }, run)
  )

  return results
}

const iterativeMap = async () => {
}

module.exports = recursiveMap
module.exports.recursiveMap = recursiveMap
module.exports.iterativeMap = iterativeMap
