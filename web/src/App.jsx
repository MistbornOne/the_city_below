import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useGameState } from './hooks/useGameState.js'
import { useTheme } from './hooks/useTheme.js'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import IntroFlow from './pages/IntroFlow.jsx'
import TutorialPrompt from './pages/TutorialPrompt.jsx'
import TutorialRules from './pages/TutorialRules.jsx'
import CharacterCreation from './pages/CharacterCreation.jsx'
import SceneView from './pages/SceneView.jsx'
import Epilogue from './pages/Epilogue.jsx'

export default function App() {
  const { theme, setTheme } = useTheme()
  const {
    state,
    update,
    setJournalEntry,
    setCharacterField,
    markSceneComplete,
    resetGame,
    resolveEcho,
  } = useGameState()

  const resolveEchoFn = (key, st) => resolveEcho(key, st || state)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Landing state={state} resetGame={resetGame} />
          </Layout>
        }
      />
      <Route
        path="/intro"
        element={<IntroFlow update={update} />}
      />
      <Route
        path="/tutorial"
        element={<TutorialPrompt update={update} />}
      />
      <Route
        path="/rules"
        element={<TutorialRules />}
      />
      <Route
        path="/create"
        element={
          <CharacterCreation
            state={state}
            setCharacterField={setCharacterField}
            update={update}
            theme={theme}
            setTheme={setTheme}
          />
        }
      />
      <Route
        path="/play/:sceneId"
        element={
          <SceneView
            state={state}
            update={update}
            setJournalEntry={setJournalEntry}
            markSceneComplete={markSceneComplete}
            resolveEcho={resolveEchoFn}
          />
        }
      />
      <Route
        path="/epilogue"
        element={
          <Epilogue state={state} resetGame={resetGame} />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
