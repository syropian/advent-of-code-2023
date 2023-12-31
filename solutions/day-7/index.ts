const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-7/${env}.txt`)
const input = await inputFile.text()
const lines = input.split('\n')

type Hand = {
  hand: number[]
  matches: Record<string, number>
  bid: number
}

const rankSort = (a: Hand, b: Hand) => {
  const aMatches = Object.values(a.matches)
  const bMatches = Object.values(b.matches)
  const aMaxMatch = Math.max(...aMatches)
  const bMaxMatch = Math.max(...bMatches)

  if (aMatches.length !== bMatches.length) {
    return aMatches.length - bMatches.length
  }

  if (aMaxMatch !== bMaxMatch) {
    return bMaxMatch - aMaxMatch
  }

  for (let j = 0; j < a.hand.length; j++) {
    if (a.hand[j] !== b.hand[j]) {
      return b.hand[j] - a.hand[j]
    }
  }

  return 0
}

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
        acc[`${card}`] = (acc[`${card}`] ?? 0) + 1

        return acc
      }, {} as Record<string, number>)

      return {
        hand,
        matches,
        bid: bids[i],
      } as Hand
    })
    .toSorted(rankSort)

  return handsWithMatches.reduce((acc, curr, i) => acc + curr.bid * (handsWithMatches.length - i), 0)
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
          acc[`${card}`] = (acc[`${card}`] ?? 0) + 1
          return acc
        }, {} as Record<string, number>)

      const jokerCount = hand.filter((card) => card === 1).length

      if (jokerCount >= 3) {
        if (Object.keys(matches).length) {
          const highestValue = Math.max(...Object.keys(matches).map(Number))
          matches[highestValue] = (matches[highestValue] ?? 0) + jokerCount
        } else {
          matches['14'] = (matches['14'] ?? 0) + jokerCount
        }
      } else if (jokerCount < 3 && jokerCount > 0) {
        const largestMap = Math.max(...Object.values(matches))
        const largestMatchKey = Object.keys(matches)
          .sort((a, b) => Number(b) - Number(a))
          .find((key) => matches[key] === largestMap) as string
        matches[largestMatchKey] = (matches[largestMatchKey] ?? 0) + jokerCount
      }

      return {
        hand,
        matches,
        bid: bids[i],
      } as Hand
    })
    .toSorted(rankSort)

  return handsWithMatches.reduce((acc, curr, i) => acc + curr.bid * (handsWithMatches.length - i), 0)
}

console.log(
  Bun.inspect({
    Env: env,
    'Part One': partOne(),
    'Part Two': partTwo(),
  })
)
