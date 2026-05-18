import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tutorialSections } from '../content/tutorial.js'

const oracleData = tutorialSections.find(s => s.id === 'oracles')

export default function OracleDrawer() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-4 right-4 z-[600] btn-secondary text-xs px-3 py-2"
        aria-label="Toggle Oracle reference"
      >
        {open ? '✕ Close' : '◈ Oracles'}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[490] bg-black bg-opacity-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`oracle-drawer ${open ? 'open' : ''} p-5`}>
        <div className="mb-5 border-b border-neon-faint pb-3">
          <h2 className="glow-text text-sm tracking-widest uppercase">◈ The Oracles</h2>
          <p className="text-neon-dim text-xs mt-1 leading-relaxed">
            {oracleData?.intro}
          </p>
        </div>

        {oracleData?.content.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-neon text-xs tracking-widest uppercase mb-1 glow-text-soft">
              {section.name}
            </h3>
            {section.instruction && (
              <p className="text-neon-dim text-xs mb-2">{section.instruction}</p>
            )}
            <ol className="space-y-1">
              {section.items.map((item, j) => (
                <li key={j} className="text-xs text-neon-soft leading-relaxed pl-1">
                  {item}
                </li>
              ))}
            </ol>
            {section.note && (
              <p className="text-neon-dim text-xs mt-2 italic border-l border-neon-faint pl-2">
                {section.note}
              </p>
            )}
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-neon-faint">
          <button
            onClick={() => { setOpen(false); navigate('/create') }}
            className="btn-ghost w-full text-left"
          >
            ◈ Change Theme
          </button>
        </div>
      </div>
    </>
  )
}
