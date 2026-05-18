import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tutorialSections } from '../content/tutorial.js'
import Layout from '../components/Layout.jsx'

export default function TutorialRules() {
  const navigate = useNavigate()
  const [sectionIndex, setSectionIndex] = useState(0)
  const section = tutorialSections[sectionIndex]
  const isLast = sectionIndex === tutorialSections.length - 1

  function handleNext() {
    if (isLast) {
      navigate('/create')
    } else {
      setSectionIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-5 py-12">
        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {tutorialSections.map((s, i) => (
            <div key={s.id} className={`h-0.5 flex-1 ${i <= sectionIndex ? 'bg-neon' : 'bg-neon-faint'}`} />
          ))}
        </div>

        <h1 className="glow-text text-xl tracking-widest uppercase mb-2">{section.title}</h1>
        {section.intro && (
          <p className="text-neon-dim text-sm leading-relaxed mb-4">{section.intro}</p>
        )}

        <div className="neon-divider my-6" />

        <div className="space-y-6">
          {section.content.map((block, i) => {
            if (block.type === 'text') {
              return (
                <div key={i} className="space-y-3">
                  {block.paragraphs.map((p, j) => (
                    <p key={j} className="narrative-p">{p}</p>
                  ))}
                </div>
              )
            }
            if (block.type === 'oracle') {
              return (
                <div key={i} className="terminal-block">
                  <div className="text-neon text-xs tracking-widest uppercase mb-1 glow-text-soft">
                    {block.name}
                  </div>
                  {block.instruction && (
                    <p className="text-neon-dim text-xs mb-3">{block.instruction}</p>
                  )}
                  <ol className="space-y-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-green-300 text-sm leading-relaxed">{item}</li>
                    ))}
                  </ol>
                  {block.note && (
                    <p className="text-neon-dim text-xs mt-3 italic border-l border-neon-faint pl-2">
                      {block.note}
                    </p>
                  )}
                </div>
              )
            }
            if (block.type === 'rule') {
              return (
                <div key={i} className="border-2 border-neon p-5 glow-border text-center">
                  <p className="glow-text text-base leading-relaxed">{block.text}</p>
                </div>
              )
            }
            return null
          })}
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={() => sectionIndex > 0 ? setSectionIndex(i => i - 1) : navigate('/tutorial')}
            className="btn-ghost"
          >
            ← Back
          </button>
          <button onClick={handleNext} className="btn-primary">
            {isLast ? 'Begin Character Creation →' : 'Next →'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
