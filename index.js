const pLimit = (concurrency) => {
  let activeCount = 0
  const queue = []

  const next = () => {
    activeCount--
    if (queue.length > 0) {
      queue.shift()()
    }
  }

  const run = async (fn, resolve) => {
    activeCount++
    const result = fn()
    result.then(resolve).finally(next)
  }

  return (fn) =>
    new Promise((resolve) => {
      if (activeCount < concurrency) {
        run(fn, resolve)
      } else {
        queue.push(() => run(fn, resolve))
      }
    })
}

const pMap = async (iterable, mapper, concurrency = Infinity) => {
  if (typeof mapper !== 'function') {
    throw new TypeError('Mapper function is required')
  }

  const results = Array.from({ length: iterable.length })
  const limit = pLimit(concurrency)

  await Promise.all(
    iterable.map((val, key) => limit(() => mapper(val, key).then((res) => (results[key] = res))))
  )

  return results
}

module.exports = pMap
module.exports.pMap = pMap
