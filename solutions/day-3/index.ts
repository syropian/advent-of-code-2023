const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-3/${env}.txt`)
const input = await inputFile.text()

function partOne() {
  const lines = input.split('\n')
  const totalColumns = lines[0].length

  const isSymbol = (char: string) => Boolean(char.match(/[^a-zA-Z0-9. ]/))
  const getChunkFromRow = (rowIndex: number, start: number, end: number) =>
    lines[Math.max(0, Math.min(rowIndex, totalColumns - 1))]
      .slice(Math.max(0, start), Math.min(totalColumns - 1, end))
      .split('')

  return lines.reduce((total, line, lineIndex) => {
    line
      .split(/(\d+|[a-zA-Z0-9. ])/)
      .filter(Boolean)
      .forEach((chunk, chunkIndex, line) => {
        if (!isNaN(Number(chunk))) {
          const rangeStart = line.slice(0, chunkIndex).reduce((acc, curr) => (acc += curr.length), 0)
          const rangeEnd = rangeStart + chunk.length

          const surroundingCharacters = [
            ...getChunkFromRow(lineIndex - 1, rangeStart - 1, rangeEnd + 1),
            ...getChunkFromRow(lineIndex + 1, rangeStart - 1, rangeEnd + 1),
            line[chunkIndex - 1] ?? '',
            line[chunkIndex + 1] ?? '',
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
  return 0
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
