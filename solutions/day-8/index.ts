const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-8/${env}.txt`)
const input = await inputFile.text()
const [instructions, network] = input.split('\n\n')

function partOne() {
  const nodes = network.split('\n').reduce((acc, node) => {
    const [key, sides] = node.split(/([A-Z]{3}) = /).filter(Boolean)
    acc[key] = sides.replace(/\(|\)/g, '').split(', ') as [string, string]

    return acc
  }, {} as Record<string, [string, string]>)

  let curr = 'AAA'
  let i = 0

  while (curr !== 'ZZZ') {
    for (let j = 0; j < instructions.length; j++) {
      const index = instructions.charAt(j) === 'L' ? 0 : 1
      const key = Object.keys(nodes).find((node) => node === curr)

      if (key) {
        curr = nodes[key][index]
      } else {
        console.log('oh no...')
      }

      i++
    }
  }

  return i
}

function partTwo() {
  return 0
}

console.log({
  Env: env,
  'Part One': partOne(),
  // 'Part Two': partTwo(),
})
