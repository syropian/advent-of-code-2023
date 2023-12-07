const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-6/${env}.txt`)
const input = await inputFile.text()
const lines = input.split('\n')

function partOne() {
  const [times, distances] = lines.map((line) => line.split(' ').slice(1).filter(Boolean).map(Number))

  const ranges = distances.map((distance, i) => {
    const recordNumbers = []

    for (let j = 1; j < times[i]; j++) {
      const remainingTime = times[i] - j
      const distanceTravelled = j * remainingTime

      if (distanceTravelled > distance) {
        recordNumbers.push(j)
      }
    }
    return recordNumbers
  })

  return ranges.reduce((acc, curr) => acc * curr.length, 1)
}

function partTwo() {
  const [time, distance] = lines.map((line) => Number(line.split(' ').slice(1).filter(Boolean).map(Number).join('')))

  const recordNumbers = []

  for (let j = 1; j < time; j++) {
    const remainingTime = time - j
    const distanceTravelled = j * remainingTime

    if (distanceTravelled > distance) {
      recordNumbers.push(j)
    }
  }

  return recordNumbers.length
}

console.log(
  Bun.inspect({
    Env: env,
    'Part One': partOne(),
    'Part Two': partTwo(),
  })
)
