const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const partOneInputFile = Bun.file(`./fixtures/day-1/part-1/${env}.txt`)
const partOneInput = await partOneInputFile.text()

const partTwoInputFile = Bun.file(`./fixtures/day-1/part-2/${env}.txt`)
const partTwoInput = await partTwoInputFile.text()

function partOne() {
  return partOneInput
    .split('\n')
    .map((line) => {
      return line
        .replace(/[^0-9]/g, '')
        .split('')
        .map(Number)
    })
    .reduce((acc, curr) => {
      if (curr.length < 2) {
        acc.push(Number(`${curr[0]}${curr[0]}`))
      } else {
        acc.push(Number(`${curr.at(0)}${curr.at(-1)}`))
      }

      return acc
    }, [])
    .reduce((acc, curr) => acc + curr, 0)
}

function partTwo() {
  const NUMBER_MAP: Record<string, string> = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  }

  const numberWords = Object.keys(NUMBER_MAP)
  const numberCheckRegex = new RegExp(`(?=(${numberWords.join('|')}))`, 'gi')
  const numberReplaceRegex = new RegExp(`(${numberWords.join('|')})`, 'gi')

  return partTwoInput
    .split('\n')
    .map((line) => {
      let lineAsNumbers = line

      while (lineAsNumbers.match(numberCheckRegex) !== null) {
        lineAsNumbers = lineAsNumbers.replace(numberReplaceRegex, function (match) {
          return NUMBER_MAP[match]
        })
      }

      return lineAsNumbers
        .split(/[^1-9]?/)
        .filter((segment) => Boolean(segment))
        .map(Number)
    })
    .reduce((acc, curr) => {
      if (curr.length < 2) {
        acc.push(Number(`${curr[0]}${curr[0]}`))
      } else {
        acc.push(Number(`${curr.at(0)}${curr.at(-1)}`))
      }

      return acc
    }, [])
    .reduce((acc, curr) => acc + curr, 0)
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
