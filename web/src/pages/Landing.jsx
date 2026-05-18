import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing({ state, resetGame }) {
  const navigate = useNavigate()
  const [blinkOn, setBlinkOn] = useState(true)
  const hasSave = state.started

  useEffect(() => {
    const id = setInterval(() => setBlinkOn(b => !b), 800)
    return () => clearInterval(id)
  }, [])

  function handleNew() {
    resetGame()
    navigate('/intro')
  }

  function handleContinue() {
    if (state.currentScene) {
      navigate(`/play/${state.currentScene}`)
    } else if (state.character?.name) {
      navigate('/play/prologue')
    } else if (state.seenRules !== null) {
      // Already answered the tutorial prompt — go to character creation
      navigate('/create')
    } else if (state.started) {
      // Finished intro but not yet answered tutorial prompt
      navigate('/tutorial')
    } else {
      navigate('/intro')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="text-neon-dim text-xs tracking-[0.4em] uppercase mb-4">
          A Solo Journaling Horror Mystery RPG
        </div>
        <h1
          className="font-mono text-5xl sm:text-7xl tracking-widest uppercase glow-text animate-flicker leading-none"
          style={{ letterSpacing: '0.15em' }}
        >
          THE CITY
        </h1>
        <h1
          className="font-mono text-5xl sm:text-7xl tracking-widest uppercase glow-text animate-flicker leading-none"
          style={{ letterSpacing: '0.15em', animationDelay: '0.3s' }}
        >
          BELOW
        </h1>
        <div className="mt-6 text-neon-dim text-xs tracking-[0.3em] uppercase">
          Written by Ian Watkins
        </div>
      </div>

      {/* Divider */}
      <div className="w-48 h-px bg-neon-dim opacity-40 mb-10" />

      {/* Buttons */}
      <div className="flex flex-col gap-4 items-center w-full max-w-xs">
        {hasSave && (
          <button onClick={handleContinue} className="btn-primary w-full text-center">
            ▶ Continue Chronicle
          </button>
        )}
        <button onClick={handleNew} className={hasSave ? 'btn-secondary w-full text-center' : 'btn-primary w-full text-center'}>
          {hasSave ? '⟳ New Chronicle' : '▶ Begin Chronicle'}
        </button>
      </div>

      {/* Ominous tagline */}
      <div className="mt-16 text-center">
        <p
          className="text-xs tracking-[0.4em] uppercase glow-text-dim"
          style={{ color: blinkOn ? '#00b300' : '#003300', transition: 'color 0.8s ease' }}
        >
          WE ARE WAITING BELOW
        </p>
      </div>

      {/* Version info */}
      <div className="absolute bottom-4 right-4 text-neon-dim opacity-30 text-xs tracking-widest">
        VIRESCENT CITY — LEVEL 10
      </div>
    </div>
  )
}
