import { useState, useCallback } from 'react'

const STORAGE_KEY = 'tcb_game_state'

const defaultState = {
  started: false,
  seenRules: null,   // null = unanswered, true = saw rules, false = skipped
  character: {
    name: '',
    age: '',
    occupation: '',
    hiddenFear: '',
    incident: '',
    strangeMemory: '',
  },
  path: null,           // 'A' or 'B'
  currentScene: null,   // scene id string
  completedScenes: [],  // list of scene ids
  journalEntries: {},   // keyed by prompt id
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState
  } catch {
    return defaultState
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage full or unavailable — silently continue
  }
}

export function useGameState() {
  const [state, setState] = useState(load)

  const update = useCallback((patch) => {
    setState(prev => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
      save(next)
      return next
    })
  }, [])

  const setJournalEntry = useCallback((promptId, text) => {
    setState(prev => {
      const next = {
        ...prev,
        journalEntries: { ...prev.journalEntries, [promptId]: text },
      }
      save(next)
      return next
    })
  }, [])

  const setCharacterField = useCallback((field, value) => {
    setState(prev => {
      const next = {
        ...prev,
        character: { ...prev.character, [field]: value },
      }
      save(next)
      return next
    })
  }, [])

  const markSceneComplete = useCallback((sceneId) => {
    setState(prev => {
      if (prev.completedScenes.includes(sceneId)) return prev
      const next = {
        ...prev,
        completedScenes: [...prev.completedScenes, sceneId],
      }
      save(next)
      return next
    })
  }, [])

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState)
  }, [])

  // Resolve an echo: looks up journalEntries or character fields
  const resolveEcho = useCallback((echoKey, state) => {
    if (!echoKey) return null
    if (echoKey.startsWith('char.')) {
      const field = echoKey.slice(5)
      return state.character[field] || null
    }
    return state.journalEntries[echoKey] || null
  }, [])

  return {
    state,
    update,
    setJournalEntry,
    setCharacterField,
    markSceneComplete,
    resetGame,
    resolveEcho,
  }
}
