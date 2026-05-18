import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { introSections } from '../content/intro.js'
import Layout from '../components/Layout.jsx'
import OracleDrawer from '../components/OracleDrawer.jsx'

function renderContent(block, i) {
  switch (block.type) {
    case 'text':
      return (
        <div key={i} className="space-y-3">
          {block.paragraphs.map((p, j) => (
            <p key={j} className="narrative-p">{p}</p>
          ))}
        </div>
      )
    case 'list':
      return (
        <ul key={i} className="space-y-1 my-3 pl-2">
          {block.items.map((item, j) => (
            <li key={j} className="narrative-p flex gap-2">
              <span className="text-neon">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <div
          key={i}
          className={`my-4 p-4 border-l-2 ${
            block.ominous
              ? 'border-neon bg-neon-faint text-neon glow-text-soft text-sm leading-relaxed'
              : 'border-neon-dim bg-terminal-light text-green-300 text-sm leading-relaxed'
          }`}
        >
          {block.text}
        </div>
      )
    case 'note':
      return (
        <div key={i} className="my-4 p-4 border border-neon-faint bg-terminal text-neon-dim text-xs leading-relaxed">
          <div className="text-neon text-xs tracking-widest uppercase mb-2">{block.title}</div>
          {block.text}
        </div>
      )
    case 'levels':
      return (
        <div key={i} className="my-4 space-y-3">
          {block.levels.map((level, j) => (
            <div key={j} className="border border-neon-faint p-3 bg-terminal">
              <div className="text-neon text-xs tracking-wider uppercase mb-1 glow-text-soft">{level.label}</div>
              <p className="text-green-300 text-sm leading-relaxed">{level.description}</p>
            </div>
          ))}
        </div>
      )
    case 'daylist':
      return (
        <div key={i} className="my-4 space-y-2">
          {block.days.map((day, j) => (
            <div key={j} className="flex gap-3 items-baseline">
              <span className="text-neon text-xs tracking-widest min-w-[50px]">{day.label}</span>
              <span className="text-green-300 text-sm">{day.title}</span>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function IntroFlow({ update }) {
  const navigate = useNavigate()
  const [sectionIndex, setSectionIndex] = useState(0)
  const section = introSections[sectionIndex]
  const isLast = sectionIndex === introSections.length - 1

  function handleNext() {
    if (isLast) {
      update({ started: true })
      navigate('/tutorial')
    } else {
      setSectionIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handlePrev() {
    if (sectionIndex > 0) {
      setSectionIndex(i => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <Layout>
      <OracleDrawer />
      <div className="max-w-2xl mx-auto px-5 py-12">
        {/* Section indicator */}
        <div className="flex gap-2 mb-6">
          {introSections.map((s, i) => (
            <div
              key={s.id}
              className={`h-0.5 flex-1 ${i <= sectionIndex ? 'bg-neon' : 'bg-neon-faint'}`}
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="glow-text text-xl tracking-widest uppercase mb-2">{section.title}</h1>
        {section.subtitle && (
          <p className="text-neon-dim text-xs tracking-widest uppercase mb-6">{section.subtitle}</p>
        )}

        <div className="neon-divider my-6" />

        {/* Content */}
        <div className="space-y-4">
          {section.content.map((block, i) => renderContent(block, i))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button onClick={handlePrev} className="btn-ghost">
            ← Back
          </button>
          <button onClick={handleNext} className="btn-primary">
            {isLast ? 'Continue →' : 'Next →'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
