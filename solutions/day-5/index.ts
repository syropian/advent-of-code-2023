const env = ['test', 'final'].includes(String(Bun.argv.at(-1))) ? Bun.argv.at(-1) : 'final'

const inputFile = Bun.file(`./fixtures/day-5/${env}.txt`)
const input = await inputFile.text()
const almanac = input.split('\n\n')

type MappingRange = {
  destStart: number
  destEnd: number
  sourceStart: number
  sourceEnd: number
}

type RangeMap = MappingRange[]

function partOne() {
  const seeds = almanac[0].replace('seeds: ', '').split(' ').map(Number)

  const maps: Array<[number, number, number][]> = almanac.slice(1).map((map) =>
    map
      .split('\n')
      .slice(1)
      .map((row) => row.split(' ').map(Number))
      .map(([destStart, sourceStart, length]) => [destStart, sourceStart, sourceStart + length - 1])
  )

  return Math.min(
    ...seeds.map((seed) => {
      return maps.reduce((curr, map) => {
        const mapping = map.find(([_, sourceStart, sourceEnd]) => curr >= sourceStart && curr <= sourceEnd)

        return mapping ? mapping[0] + (curr - mapping[1]) : curr
      }, seed)
    })
  )
}

function partTwo() {
  const seeds = almanac[0].replace('seeds: ', '').split(' ').map(Number)
  const rangeMapsList: RangeMap[] = almanac.slice(1).map((map) =>
    map
      .split('\n')
      .slice(1)
      .map((row) => row.split(' ').map(Number))
      .map(([destStart, sourceStart, length]) => ({
        destStart,
        destEnd: destStart + length - 1,
        sourceStart,
        sourceEnd: sourceStart + length - 1,
      }))
  )

  const eligibleSeeds = rangeMapsList
    .flatMap((rangeMap, i) => {
      return rangeMap.map((map) => {
        return rangeMapsList.slice(0, i + 1).reduceRight((acc, mappingRange) => {
          const targetMappingRange = mappingRange.find(({ destStart, destEnd }) => acc >= destStart && acc <= destEnd)

          return targetMappingRange ? targetMappingRange.sourceStart + (acc - targetMappingRange.destStart) : acc
        }, map.destStart)
      })
    })
    .filter((seed) => seeds.some((s, i) => i % 2 === 0 && seed >= s && seed < s + seeds[i + 1]))

  return Math.min(
    ...eligibleSeeds.map((seed) => {
      return rangeMapsList.reduce((curr, rangeMap) => {
        const mapping = rangeMap.find(({ sourceStart, sourceEnd }) => curr >= sourceStart && curr <= sourceEnd)

        return mapping ? mapping.destStart + (curr - mapping.sourceStart) : curr
      }, seed)
    })
  )
}

const time = performance.now()
console.log({
  Env: env,
  'Part One': partOne(),
  'Part Two': partTwo(),
})
const timeEnd = performance.now()
console.log(`Time: ${(timeEnd - time).toFixed(4)}ms`)
