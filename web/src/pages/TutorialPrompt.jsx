import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'

export default function TutorialPrompt({ update }) {
  const navigate = useNavigate()

  function handleYes() {
    update({ seenRules: true })
    navigate('/rules')
  }

  function handleSkip() {
    update({ seenRules: false })   // explicitly false = chose to skip
    navigate('/create')
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="terminal-block mb-8">
            <p className="text-neon-dim text-xs tracking-widest uppercase mb-4">System Prompt</p>
            <p className="narrative-p">
              Before your chronicle begins, would you like to review the rules of play?
            </p>
            <p className="narrative-p text-sm text-neon-dim mt-2">
              This covers how to journal, how to use the Oracles, and the one rule of the game. If you've played before, you can skip this.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handleYes} className="btn-primary w-full">
              Yes — Show me the rules
            </button>
            <button onClick={handleSkip} className="btn-secondary w-full">
              Skip — I know what I'm doing
            </button>
          </div>

          <button
            onClick={() => navigate('/intro')}
            className="btn-ghost w-full mt-4 text-center"
          >
            ← Back to introduction
          </button>
        </div>
      </div>
    </Layout>
  )
}
