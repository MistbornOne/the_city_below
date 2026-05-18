import React from 'react'
import { THEMES } from '../hooks/useTheme.js'

export default function ThemePicker({ theme, setTheme }) {
  return (
    <div className="space-y-3">
      <div className="text-neon-dim text-xs tracking-widest uppercase">Terminal Palette</div>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs tracking-wide border transition-all duration-150 ${
              theme === t.id
                ? 'border-neon text-neon glow-border-soft'
                : 'border-neon-dim/30 text-neon-dim hover:border-neon/50 hover:text-neon'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: t.swatch,
                boxShadow: theme === t.id ? `0 0 6px ${t.swatch}` : 'none',
              }}
            />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
