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
  const allGames = input.split('\n').map((gameLine) => {
    const sets = gameLine
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

  return allGames
    .map((game) => {
      return game.reduce((acc, curr) => {
        Object.entries(curr).forEach(([color, count]) => {
          acc[color] = Math.max(acc[color] || 0, count)
        })

        return acc
      }, {})
    })
    .reduce((acc, curr) => {
      acc += Object.values(curr).reduce((acc, curr) => acc * curr, 1)

      return acc
    }, 0)
}

console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
