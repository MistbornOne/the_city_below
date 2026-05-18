import { prologueScene } from './prologue.js'
import { day1Scene } from './day1.js'
import { pathAScenes } from './pathA.js'
import { pathBScenes } from './pathB.js'
import { day7Scene } from './day7.js'

// All playable scenes indexed by id
const allScenes = [
  prologueScene,
  day1Scene,
  ...pathAScenes,
  ...pathBScenes,
  day7Scene,
]

export const sceneMap = Object.fromEntries(allScenes.map(s => [s.id, s]))

export function getNextScene(scene, state) {
  const next = scene.nextScene
  if (typeof next === 'function') return next(state)
  return next
}

// Ordered scene ids for the path-A playthrough
export const pathAOrder = ['prologue', 'day1', 'day2a', 'day3a', 'day4a', 'day5a', 'day6a', 'day7']
// Ordered scene ids for the path-B playthrough
export const pathBOrder = ['prologue', 'day1', 'day2b', 'day3b', 'day4b', 'day5b', 'day6b', 'day7']

export function getPlaythroughOrder(path) {
  return path === 'A' ? pathAOrder : pathBOrder
}

export function getDayLabel(sceneId) {
  const map = {
    prologue: 'Prologue',
    day1: 'Day 1',
    day2a: 'Day 2', day2b: 'Day 2',
    day3a: 'Day 3', day3b: 'Day 3',
    day4a: 'Day 4', day4b: 'Day 4',
    day5a: 'Day 5', day5b: 'Day 5',
    day6a: 'Day 6', day6b: 'Day 6',
    day7: 'Day 7',
  }
  return map[sceneId] || sceneId
}
