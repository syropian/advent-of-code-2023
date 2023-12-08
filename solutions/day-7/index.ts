const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-7/${env}.txt`)
const input = await inputFile.text()
const lines = input.split('\n')

function partOne() {
  const hands = lines.map((line) =>
    line
      .split(' ')[0]
      .split('')
      .map((card) => {
        if (!isNaN(Number(card))) {
          return Number(card)
        }

        return {
          T: 10,
          J: 11,
          Q: 12,
          K: 13,
          A: 14,
        }[card] as number
      })
  )
  const bids = lines.map((line) => Number(line.split(' ')[1]))

  const handsWithMatches = hands
    .map((hand, i) => {
      const matches = hand.reduce((acc, card) => {
        if (!acc[`${card}`]) {
          acc[`${card}`] = 1
        } else {
          acc[`${card}`] += 1
        }

        return acc
      }, {} as Record<string, number>)

      return {
        hand,
        matches,
        bid: bids[i],
      }
    })
    .toSorted((a, b) => {
      const aMatches = Object.values(a.matches)
      const bMatches = Object.values(b.matches)
      const aMaxMatch = Math.max(...aMatches)
      const bMaxMatch = Math.max(...bMatches)

      if (aMatches.length > bMatches.length) {
        return 1
      } else if (aMatches.length < bMatches.length) {
        return -1
      } else {
        if (aMaxMatch > bMaxMatch) {
          return -1
        } else if (aMaxMatch < bMaxMatch) {
          return 1
        } else {
          for (let j = 0; j < a.hand.length; j++) {
            if (a.hand[j] > b.hand[j]) {
              return -1
            } else if (a.hand[j] < b.hand[j]) {
              return 1
            }
          }

          return 0
        }
      }
    })

  return handsWithMatches.reduce((acc, curr, i) => {
    acc += curr.bid * (handsWithMatches.length - i)
    return acc
  }, 0)
}

function partTwo() {
  const hands = lines.map((line) =>
    line
      .split(' ')[0]
      .split('')
      .map((card) => {
        if (!isNaN(Number(card))) {
          return Number(card)
        }

        return {
          J: 1,
          T: 10,
          Q: 12,
          K: 13,
          A: 14,
        }[card] as number
      })
  )
  const bids = lines.map((line) => Number(line.split(' ')[1]))

  const handsWithMatches = hands
    .map((hand, i) => {
      const matches = hand
        .filter((card) => card !== 1)
        .reduce((acc, card) => {
          // if (card === 1) {
          //   if (i === 10) {
          //     console.log('Largest key', acc)
          //   }
          //   if (!Object.keys(acc).length) {
          //     acc['14'] = 1
          //   } else {
          //     const jokerCount = hand.filter((card) => card === 1).length
          //     if (jokerCount === 4) {
          //       acc['14'] = (acc['14'] ?? 0) + 1
          //     } else {
          //       const largestMap = Math.max(...Object.values(acc))
          //       const largestMatchKey = Object.keys(acc)
          //         .sort((a, b) => Number(b) - Number(a))
          //         .find((key) => acc[key] === largestMap) as string

          //       acc[largestMatchKey] = (acc[largestMatchKey] ?? 0) + 1
          //     }
          //   }
          // }

          if (!acc[`${card}`]) {
            acc[`${card}`] = 1
          } else {
            acc[`${card}`] += 1
          }

          const jokerCount = hand.filter((card) => card === 1).length

          if (jokerCount === 4) {
            acc['14'] = (acc['14'] ?? 0) + 1
          } else {
            const largestMap = Math.max(...Object.values(acc))
            const largestMatchKey = Object.keys(acc)
              .sort((a, b) => Number(b) - Number(a))
              .find((key) => acc[key] === largestMap) as string

            acc[largestMatchKey] = (acc[largestMatchKey] ?? 0) + 1
          }

          return acc
        }, {} as Record<string, number>)

      return {
        hand,
        matches,
        bid: bids[i],
      }
    })
    .toSorted((a, b) => {
      const aMatches = Object.values(a.matches)
      const bMatches = Object.values(b.matches)
      const aMaxMatch = Math.max(...aMatches)
      const bMaxMatch = Math.max(...bMatches)

      if (aMatches.length > bMatches.length) {
        return 1
      } else if (aMatches.length < bMatches.length) {
        return -1
      } else {
        if (aMaxMatch > bMaxMatch) {
          return -1
        } else if (aMaxMatch < bMaxMatch) {
          return 1
        } else {
          for (let j = 0; j < a.hand.length; j++) {
            if (a.hand[j] > b.hand[j]) {
              return -1
            } else if (a.hand[j] < b.hand[j]) {
              return 1
            }
          }

          return 0
        }
      }
    })
  return handsWithMatches
  return handsWithMatches.reduce((acc, curr, i) => {
    acc += curr.bid * (handsWithMatches.length - i)
    return acc
  }, 0)
}

console.log(
  Bun.inspect({
    Env: env,
    'Part One': partOne(),
    'Part Two': partTwo(), // looking for 6839
  })
)
