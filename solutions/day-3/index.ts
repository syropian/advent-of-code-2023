const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-3/${env}.txt`)
const input = await inputFile.text()

const lines = input.split('\n')

const isSymbol = (char: string) => Boolean(char.match(/[^a-zA-Z0-9. ]/))

const getChunkFromRow = (rowIndex: number, start: number, end: number) =>
  lines[Math.max(0, Math.min(rowIndex, lines.length - 1))].slice(Math.max(0, start), end).split('')

type GearMap = Record<string, number[]>

function partOne() {
  return lines.reduce((total, line, lineIndex) => {
    line
      .split(/(\d+|[0-9. ])/)
      .filter(Boolean)
      .forEach((chunk, chunkIndex, line) => {
        if (!isNaN(Number(chunk))) {
          const rangeStart = line.slice(0, chunkIndex).reduce((acc, curr) => (acc += curr.length), 0)
          const rangeEnd = rangeStart + chunk.length

          const surroundingCharacters = [
            ...getChunkFromRow(lineIndex - 1, rangeStart - 1, rangeEnd + 1),
            ...getChunkFromRow(lineIndex + 1, rangeStart - 1, rangeEnd + 1),
            line[chunkIndex - 1] ?? '.',
            line[chunkIndex + 1] ?? '.',
          ].filter(Boolean)

          if (surroundingCharacters.some(isSymbol)) {
            total += Number(chunk)
          }
        }
      })

    return total
  }, 0)
}

function partTwo() {
  const gears = lines.reduce((gearMap, line, lineIndex) => {
    line
      .split(/(\d+|\*)/)
      .filter(Boolean)
      .forEach((chunk, chunkIndex, line) => {
        if (!isNaN(Number(chunk))) {
          const rangeStart = line.slice(0, chunkIndex).reduce((acc, curr) => (acc += curr.length), 0)
          const rangeEnd = rangeStart + chunk.length

          const adjacentAbove = getChunkFromRow(lineIndex - 1, rangeStart - 1, rangeEnd + 1)
          const adjacentBelow = getChunkFromRow(lineIndex + 1, rangeStart - 1, rangeEnd + 1)
          const toLeft = [(line[chunkIndex - 1] ?? '.').slice(-1)]
          const toRight = [(line[chunkIndex + 1] ?? '.').slice(0, 1)]

          Array.from([adjacentAbove, adjacentBelow, toLeft, toRight]).forEach((adjacent, i) => {
            if (adjacent.includes('*')) {
              const index = adjacent.indexOf('*')
              const verticalX = Math.max(0, rangeStart - 1) + index
              const gearX = i < 2 ? verticalX : i === 2 ? rangeStart - 1 : rangeEnd
              const gearY = i === 0 ? lineIndex - 1 : i === 1 ? lineIndex + 1 : lineIndex

              gearMap[`${gearX},${gearY}`] = [...(gearMap[`${gearX},${gearY}`] ?? []), Number(chunk)]
            }
          })
        }
      })

    return gearMap
  }, {} as GearMap)

  return Object.values(gears)
    .filter((numbers) => numbers.length === 2)
    .reduce((total, curr) => {
      const gearRatio = curr[0] * curr[1]
      total += gearRatio

      return total
    }, 0)
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
