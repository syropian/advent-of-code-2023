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

  let curr = Object.keys(nodes)[0]
  let i = 0
  while (curr !== 'ZZZ') return nodes
}

function partTwo() {
  return 0
}

console.log({
  Env: env,
  'Part One': partOne(),
  // 'Part Two': partTwo(),
})
