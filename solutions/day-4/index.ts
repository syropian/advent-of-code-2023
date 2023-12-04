const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-4/${env}.txt`)
const input = await inputFile.text()
const cards = input.split('\n')

const intersection = (a: number[], b: number[]) => a.filter((value) => b.includes(value))

function partOne() {
  const score = cards.reduce((total, card, i) => {
    const [winningNumbers, playerNumbers] = card
      .replace(/Card (\d+): /, '')
      .split('|')
      .map((n) => n.split(' ').filter(Boolean).map(Number))

    const matches = intersection(winningNumbers, playerNumbers)

    if (matches.length) {
      total += matches.slice(1).reduce((points, _match) => {
        points *= 2

        return points
      }, 1)
    }

    return total
  }, 0)

  return score
}

function partTwo() {
  return 0
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
