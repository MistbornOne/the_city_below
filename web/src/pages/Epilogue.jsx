import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import LocationStamp from '../components/LocationStamp.jsx'
import { epilogueContent } from '../content/epilogue.js'

export default function Epilogue({ state, resetGame }) {
  const navigate = useNavigate()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 600)
    return () => clearTimeout(t)
  }, [])

  function handleNewGame() {
    resetGame()
    navigate('/')
  }

  const char = state.character

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="text-neon-dim text-xs tracking-widest uppercase mb-4">Chronicle Complete</div>

        <h1 className="glow-text text-2xl tracking-widest uppercase mb-6">Epilogue</h1>

        <LocationStamp location={epilogueContent.location} />

        <div className="neon-divider my-6" />

        <div className={`space-y-4 transition-opacity duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          {epilogueContent.text.map((paragraph, i) => (
            <p key={i} className="narrative-p">{paragraph}</p>
          ))}

          <div className="my-8 text-center">
            <div className="comm-message inline-block glow-text text-lg">
              {epilogueContent.closing}
            </div>
          </div>
        </div>

        {revealed && (
          <div className={`mt-10 border-t border-neon-faint pt-8 transition-opacity duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            {/* Chronicle summary */}
            <div className="terminal-block mb-8">
              <div className="text-neon text-xs tracking-widest uppercase mb-3">Chronicle Summary</div>
              <div className="space-y-2 text-sm text-neon-soft">
                {char.name && (
                  <div>
                    <span className="text-neon-dim">Subject:</span>{' '}
                    {char.name}{char.age ? `, Age ${char.age}` : ''}{char.occupation ? `, ${char.occupation}` : ''}
                  </div>
                )}
                <div>
                  <span className="text-neon-dim">Path Taken:</span>{' '}
                  {state.path === 'A' ? 'Path A — The Descent' : state.path === 'B' ? 'Path B — The Missing' : 'Unknown'}
                </div>
                <div>
                  <span className="text-neon-dim">Days Chronicled:</span>{' '}
                  {state.completedScenes.length}
                </div>
                <div>
                  <span className="text-neon-dim">Journal Entries:</span>{' '}
                  {Object.values(state.journalEntries).filter(v => v && v.trim()).length} written
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <button onClick={handleNewGame} className="btn-primary w-full max-w-xs">
                Begin a New Chronicle
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary w-full max-w-xs">
                Return to Title
              </button>
            </div>

            <p className="text-neon-dim text-xs text-center mt-8 tracking-wide">
              Your journal entries are saved locally in your browser.<br />
              Play again and choose the other path for a different experience.
            </p>

            <p className="text-neon-dim opacity-40 text-xs text-center mt-6 tracking-widest">
              &copy; 2026 Ian Watkins. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}
