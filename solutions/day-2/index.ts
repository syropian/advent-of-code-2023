const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-2/${env}.txt`)
const input = await inputFile.text()

function partOne() {
  const LIMITS: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  }

  const allGames = input.split('\n').reduce((games, game) => {
    const gameId = game.split(/Game (\d+)/)[1]

    const sets = game
      .split(': ')[1]
      .split(';')
      .map((set) =>
        set
          .trim()
          .split(', ')
          .reduce((acc, curr) => {
            const [count, color] = curr.split(' ')

            acc[color] = Number(count)

            return acc
          }, {} as Record<string, number>)
      )

    games[gameId] = sets

    return games
  }, {} as Record<string, Record<string, number>[]>)

  return Object.entries(allGames)
    .filter(([_id, pulls]) => {
      return pulls.every((pull) => Object.entries(pull).every(([color, count]) => count <= LIMITS[color]))
    })
    .reduce((acc, [id]) => acc + Number(id), 0)
}

function partTwo() {
  const allGames = input.split('\n').map((game) => {
    const gameId = game.split(/Game (\d+)/)[1]

    const sets = game
      .split(': ')[1]
      .split(';')
      .map((set) =>
        set
          .trim()
          .split(', ')
          .reduce((acc, curr) => {
            const [count, color] = curr.split(' ')

            acc[color] = Number(count)

            return acc
          }, {} as Record<string, number>)
      )

    return sets
  }, {} as Record<string, Record<string, number>[]>)

  // return allGames
  return JSON.stringify(allGames)
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
