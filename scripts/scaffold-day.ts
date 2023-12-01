import { mkdir } from 'node:fs/promises'

const DAY = String(Bun.argv.at(-1))

console.log('Generating solution file...')

const solutionStubFile = Bun.file('./scripts/stubs/solution.txt')
const solutionStub = await solutionStubFile.text()
await mkdir(`./solutions/day-${DAY}`, { recursive: true })
await Bun.write(`./solutions/day-${DAY}/index.ts`, solutionStub.replace('%day%', DAY))

console.log('Generating fixture files...')

await mkdir(`./fixtures/day-${DAY}`, { recursive: true })
await Bun.write(`./fixtures/day-${DAY}/test.txt`, '')
await Bun.write(`./fixtures/day-${DAY}/final.txt`, '')
