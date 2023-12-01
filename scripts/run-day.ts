const args = Bun.argv.slice(2)
const DAY = args[0]
const ENV = args[1] ?? 'final'

const proc = Bun.spawn(['bun', 'run', `./solutions/day-${DAY}/index.ts`, ENV])
const text = await new Response(proc.stdout).text()

console.log(text)
