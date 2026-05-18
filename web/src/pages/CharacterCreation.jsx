import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import OracleDrawer from '../components/OracleDrawer.jsx'
import ThemePicker from '../components/ThemePicker.jsx'

const OCCUPATION_SUGGESTIONS = [
  'Transit Engineer',
  'Data Archivist',
  'Infrastructure Inspector',
  'Sensory Researcher',
  'Maintenance Technician',
  'Journalist',
  'Urban Cartographer',
  'Scientist',
]

function Field({ label, hint, id, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block">
        <span className="text-neon text-xs tracking-widest uppercase glow-text-soft">{label}</span>
        {hint && <span className="block text-neon-dim text-xs mt-0.5">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

export default function CharacterCreation({ state, setCharacterField, update, theme, setTheme }) {
  const navigate = useNavigate()
  const char = state.character
  const [errors, setErrors] = useState({})

  function handleOccupationSuggestion(occ) {
    setCharacterField('occupation', occ)
  }

  function validate() {
    const e = {}
    if (!char.name.trim()) e.name = 'A name is required.'
    if (!char.occupation.trim()) e.occupation = 'An occupation is required.'
    if (!char.hiddenFear.trim()) e.hiddenFear = 'A hidden fear is required.'
    if (!char.incident.trim()) e.incident = 'An incident is required.'
    if (!char.strangeMemory.trim()) e.strangeMemory = 'A strange memory is required.'
    return e
  }

  if (state.currentScene) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-5 py-12">
          <div className="mb-8">
            <div className="text-neon-dim text-xs tracking-widest uppercase mb-2">Display Settings</div>
            <h1 className="glow-text text-2xl tracking-widest uppercase">Terminal Palette</h1>
            <p className="narrative-p text-sm mt-3">
              Choose the color scheme for your chronicle. Changes apply immediately.
            </p>
          </div>

          <div className="neon-divider my-6" />

          <div className="terminal-block mb-8">
            <ThemePicker theme={theme} setTheme={setTheme} />
          </div>

          <button
            type="button"
            onClick={() => navigate(`/play/${state.currentScene}`)}
            className="btn-primary"
          >
            ← Return to Chronicle
          </button>
        </div>
      </Layout>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    update({ currentScene: 'prologue' })
    navigate('/play/prologue')
  }

  return (
    <Layout>
      <OracleDrawer />
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="mb-8">
          <div className="text-neon-dim text-xs tracking-widest uppercase mb-2">Initialize Subject File</div>
          <h1 className="glow-text text-2xl tracking-widest uppercase">Character Creation</h1>
          <p className="narrative-p text-sm mt-3">
            Now the fun begins. Create the poor soul who will be thrust into an investigation of things well beyond their comprehension. They may reflect you — most characters carry some of the creator in them — but perhaps they shouldn't be exactly you.
          </p>
        </div>

        <div className="neon-divider my-6" />

        <div className="terminal-block mb-8">
          <ThemePicker theme={theme} setTheme={setTheme} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name + Age row */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="Name" id="name">
              <input
                id="name"
                type="text"
                className="journal-textarea"
                style={{ minHeight: 'unset', height: '2.6rem', padding: '0.45rem 0.75rem' }}
                value={char.name}
                onChange={e => {
                  setCharacterField('name', e.target.value)
                  if (errors.name) setErrors(er => ({ ...er, name: null }))
                }}
                placeholder="Subject name…"
                autoComplete="off"
              />
              {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
            </Field>

            <Field label="Age" id="age">
              <input
                id="age"
                type="text"
                className="journal-textarea"
                style={{ minHeight: 'unset', height: '2.6rem', padding: '0.45rem 0.75rem' }}
                value={char.age}
                onChange={e => setCharacterField('age', e.target.value)}
                placeholder="Age…"
                autoComplete="off"
              />
            </Field>
          </div>

          {/* Occupation */}
          <Field
            label="Occupation"
            hint="Choose something that might give them access to the city's hidden secrets."
            id="occupation"
          >
            <input
              id="occupation"
              type="text"
              className="journal-textarea mb-2"
              style={{ minHeight: 'unset', height: '2.6rem', padding: '0.45rem 0.75rem' }}
              value={char.occupation}
              onChange={e => {
                setCharacterField('occupation', e.target.value)
                if (errors.occupation) setErrors(er => ({ ...er, occupation: null }))
              }}
              placeholder="Enter occupation or select below…"
              autoComplete="off"
            />
            <div className="flex flex-wrap gap-2">
              {OCCUPATION_SUGGESTIONS.map(occ => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => handleOccupationSuggestion(occ)}
                  className={`anomaly-option text-xs px-2 py-1 w-auto ${
                    char.occupation === occ ? 'selected' : ''
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
            {errors.occupation && <span className="text-red-400 text-xs">{errors.occupation}</span>}
          </Field>

          {/* Hidden Fear */}
          <Field
            label="Hidden Fear"
            hint="Something your character avoids acknowledging, but lurks deep within their mind."
            id="hiddenFear"
          >
            <textarea
              id="hiddenFear"
              className="journal-textarea"
              rows={3}
              value={char.hiddenFear}
              onChange={e => {
                setCharacterField('hiddenFear', e.target.value)
                if (errors.hiddenFear) setErrors(er => ({ ...er, hiddenFear: null }))
              }}
              placeholder="The thing they never admit, even to themselves…"
            />
            {errors.hiddenFear && <span className="text-red-400 text-xs">{errors.hiddenFear}</span>}
          </Field>

          {/* The Incident */}
          <Field
            label="The Incident"
            hint="Something tragic from their past — deeply emotional, something they have no desire to relive."
            id="incident"
          >
            <textarea
              id="incident"
              className="journal-textarea"
              rows={4}
              value={char.incident}
              onChange={e => {
                setCharacterField('incident', e.target.value)
                if (errors.incident) setErrors(er => ({ ...er, incident: null }))
              }}
              placeholder="What happened, and why does it still haunt them…"
            />
            {errors.incident && <span className="text-red-400 text-xs">{errors.incident}</span>}
          </Field>

          {/* Strange Memory */}
          <Field
            label="Strange Memory"
            hint="A memory that doesn't fit their life. Short, unnerving — obviously supernatural would be best, but choose what feels right."
            id="strangeMemory"
          >
            <textarea
              id="strangeMemory"
              className="journal-textarea"
              rows={4}
              value={char.strangeMemory}
              onChange={e => {
                setCharacterField('strangeMemory', e.target.value)
                if (errors.strangeMemory) setErrors(er => ({ ...er, strangeMemory: null }))
              }}
              placeholder="A flash of something that shouldn't be theirs…"
            />
            {errors.strangeMemory && <span className="text-red-400 text-xs">{errors.strangeMemory}</span>}
          </Field>

          <div className="neon-divider" />

          {/* Summary preview */}
          {char.name && (
            <div className="terminal-block text-sm text-neon-dim">
              <div className="text-neon text-xs tracking-widest uppercase mb-2">Subject File Preview</div>
              <div className="space-y-1">
                <div><span className="text-neon">Name:</span> {char.name}{char.age ? `, ${char.age}` : ''}</div>
                {char.occupation && <div><span className="text-neon">Occupation:</span> {char.occupation}</div>}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/tutorial')}
              className="btn-ghost"
            >
              ← Back
            </button>
            <button type="submit" className="btn-primary">
              Begin the Chronicle →
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
