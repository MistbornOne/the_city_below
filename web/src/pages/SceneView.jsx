import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import NarrativeBlock from '../components/NarrativeBlock.jsx'
import LocationStamp from '../components/LocationStamp.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import OracleDrawer from '../components/OracleDrawer.jsx'
import { sceneMap, getNextScene } from '../content/scenes.js'

// ── Prompt renderer ──────────────────────────────────────────────

function PathChoicePrompt({ prompt, onChoice, current }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3">
        {prompt.choices.map(choice => (
          <button
            key={choice.value}
            type="button"
            onClick={() => onChoice(choice.value)}
            className={`btn-path ${current === choice.value ? 'selected' : ''}`}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-1 text-neon">
              {current === choice.value ? '▶ ' : '  '}{choice.label}
            </div>
            <div className="text-xs text-green-300 leading-relaxed">{choice.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function AnomalyChoicePrompt({ prompt, journalKey, value, onChange }) {
  const selectedAnomaly = value ? value.split('|||')[0] : ''
  const journalText = value ? (value.split('|||')[1] || '') : ''

  function handleAnomalySelect(anomaly) {
    onChange(`${anomaly}|||${journalText}`)
  }

  function handleJournalChange(text) {
    onChange(`${selectedAnomaly}|||${text}`)
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {prompt.choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleAnomalySelect(choice)}
            className={`anomaly-option ${selectedAnomaly === choice ? 'selected' : ''}`}
          >
            <span className="text-neon mr-2">{selectedAnomaly === choice ? '▶' : '○'}</span>
            {choice}
          </button>
        ))}
      </div>
      {selectedAnomaly && (
        <div className="mt-3">
          <p className="text-neon-dim text-xs mb-1 tracking-wide">
            Now describe it — in your character's voice, as if noticing it gradually:
          </p>
          <textarea
            className="journal-textarea"
            rows={5}
            value={journalText}
            onChange={e => handleJournalChange(e.target.value)}
            placeholder="Describe the anomaly as it unfolds…"
          />
        </div>
      )}
    </div>
  )
}

function StandardPrompt({ prompt, value, onChange }) {
  return (
    <div>
      {prompt.isFixedEnding ? (
        <div>
          <div className="comm-message mb-3 block">{prompt.endingPrefix}</div>
          <textarea
            className="journal-textarea"
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Continue from the line above…"
          />
        </div>
      ) : prompt.endingPrefix ? (
        <div>
          <div className="text-neon-dim text-xs mb-2 italic">{prompt.endingPrefix}</div>
          <textarea
            className="journal-textarea"
            rows={4}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={prompt.placeholder || 'Write in your character\'s voice…'}
          />
        </div>
      ) : (
        <textarea
          className="journal-textarea"
          rows={6}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={prompt.placeholder || 'Write in your character\'s voice…'}
        />
      )}
    </div>
  )
}

// ── Main Scene View ────────────────────────────────────────────────

export default function SceneView({ state, update, setJournalEntry, markSceneComplete, resolveEcho }) {
  const { sceneId } = useParams()
  const navigate = useNavigate()
  const journalRef = useRef(null)
  const [phase, setPhase] = useState('narrative') // 'narrative' | 'journal'
  const [pathChoice, setPathChoice] = useState(state.path || null)

  const scene = sceneMap[sceneId]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPhase('narrative')
  }, [sceneId])

  if (!scene) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-neon glow-text text-xl mb-4">ERROR: Scene not found.</p>
            <button onClick={() => navigate('/')} className="btn-primary">← Return</button>
          </div>
        </div>
      </Layout>
    )
  }

  function handleBeginJournal() {
    setPhase('journal')
    setTimeout(() => {
      journalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function handlePathChoice(value) {
    setPathChoice(value)
    update({ path: value })
    setJournalEntry('day1_path', value)
  }

  function handleJournalEntry(promptId, value) {
    setJournalEntry(promptId, value)
  }

  function handleContinue() {
    markSceneComplete(sceneId)
    update({ currentScene: getNextScene(scene, { ...state, path: pathChoice || state.path }) })
    const nextId = getNextScene(scene, { ...state, path: pathChoice || state.path })
    if (nextId === 'epilogue') {
      navigate('/epilogue')
    } else {
      navigate(`/play/${nextId}`)
    }
  }

  // Check if we can continue (at least one journal prompt has some text, or it's a path choice scene)
  const canContinue = (() => {
    if (phase === 'narrative') return true
    // Check path choice if applicable
    const hasPathChoice = scene.prompts.some(p => p.isPathChoice)
    if (hasPathChoice && !pathChoice) return false
    // At least one written prompt
    const writtenAny = scene.prompts
      .filter(p => !p.isPathChoice)
      .some(p => {
        const val = state.journalEntries[p.id] || ''
        return val.trim().length > 0
      })
    return writtenAny || !scene.prompts.some(p => !p.isPathChoice)
  })()

  const pathLabel = scene.path ? ` — Path ${scene.path}` : ''

  return (
    <Layout>
      <OracleDrawer />

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Progress */}
        <ProgressBar currentScene={sceneId} />

        {/* Path badge */}
        {scene.convergenceNote && (
          <div className="text-neon-dim text-xs tracking-widest uppercase mb-3">
            {scene.convergenceNote}
          </div>
        )}
        {scene.path && (
          <div className="text-neon-dim text-xs tracking-widest uppercase mb-1">
            Path {scene.path}{pathLabel}
          </div>
        )}

        {/* Title */}
        <h1 className="glow-text text-xl tracking-widest uppercase mb-4">
          {scene.title}
        </h1>

        {/* Location stamp */}
        <LocationStamp location={scene.location} />

        <div className="neon-divider my-5" />

        {/* Narrative */}
        <NarrativeBlock scene={scene} state={state} resolveEcho={resolveEcho} />

        {/* Narrative → Journal transition */}
        {phase === 'narrative' && (
          <div className="mt-8 text-center">
            <button onClick={handleBeginJournal} className="btn-primary">
              Begin Journaling ↓
            </button>
          </div>
        )}

        {/* Journal prompts */}
        {phase === 'journal' && (
          <div ref={journalRef} className="mt-10 space-y-10">
            <div className="border-t border-neon-faint pt-6">
              <h2 className="text-neon text-xs tracking-[0.3em] uppercase mb-1 glow-text-soft">
                Journal Prompts
              </h2>
              <p className="text-neon-dim text-xs">
                Write in first person, in your character's voice. Follow as many prompts as you'd like.
              </p>
            </div>

            {scene.prompts.map(prompt => (
              <div key={prompt.id} className="space-y-3">
                <div>
                  <span className="prompt-number">[{prompt.number}]</span>
                  <p className="narrative-p text-sm whitespace-pre-line">{prompt.text}</p>
                </div>

                {prompt.isPathChoice ? (
                  <PathChoicePrompt
                    prompt={prompt}
                    onChoice={handlePathChoice}
                    current={pathChoice}
                  />
                ) : prompt.isAnomalyChoice ? (
                  <AnomalyChoicePrompt
                    prompt={prompt}
                    journalKey={prompt.id}
                    value={state.journalEntries[prompt.id] || ''}
                    onChange={val => handleJournalEntry(prompt.id, val)}
                  />
                ) : (
                  <StandardPrompt
                    prompt={prompt}
                    value={state.journalEntries[prompt.id] || ''}
                    onChange={val => handleJournalEntry(prompt.id, val)}
                  />
                )}
              </div>
            ))}

            <div className="neon-divider" />

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setPhase('narrative')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="btn-ghost"
              >
                ↑ Re-read narrative
              </button>
              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="btn-primary"
              >
                {sceneId === 'day7' ? 'Complete the Chronicle →' : 'Continue →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
