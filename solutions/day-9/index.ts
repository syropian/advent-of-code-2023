const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-9/${env}.txt`)
const input = await inputFile.text()
const histories = input.split('\n').map((history) =>
  history
    .split(/(-?\d+) /)
    .filter(Boolean)
    .map(Number)
)

const rowIsAllZeros = (row: number[]) => [...new Set(row)].length === 1 && row[0] === 0

function partOne() {
  return histories.reduce((acc, history) => {
    let newSequence = [...history]
    let sequenceLasts: number[] = [newSequence.at(-1) as number]

    while (!rowIsAllZeros(newSequence)) {
      newSequence = newSequence.reduce((seq, num, i, history) => {
        if (i > 0) {
          seq.push(num - (history[i - 1] ?? 0))
        }

        return seq
      }, [] as number[])

      sequenceLasts.push(newSequence.at(-1) as number)
    }

    return acc + sequenceLasts.reduce((acc, curr) => acc + curr, 0)
  }, 0)
}

function partTwo() {
  return histories.reduce((acc, history) => {
    let newSequence = [...history.reverse()]
    let sequenceLasts: number[] = [newSequence.at(-1) as number]

    while (!rowIsAllZeros(newSequence)) {
      newSequence = newSequence.reduce((seq, num, i, history) => {
        if (i > 0) {
          seq.push(num - (history[i - 1] ?? 0))
        }

        return seq
      }, [] as number[])

      sequenceLasts.push(newSequence.at(-1) as number)
    }

    return acc + sequenceLasts.reduce((acc, curr) => acc + curr, 0)
  }, 0)
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
