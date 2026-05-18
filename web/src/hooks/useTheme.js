import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'tcb_theme'
const DEFAULT_THEME = 'green'

export const THEMES = [
  { id: 'green',         label: 'Green',           swatch: '#00FF41' },
  { id: 'green-muted',   label: 'Green · Muted',   swatch: '#a6d189' },
  { id: 'pink',          label: 'Pink',            swatch: '#ff5ec4' },
  { id: 'pink-muted',    label: 'Pink · Muted',    swatch: '#f4b8e4' },
  { id: 'purple',        label: 'Purple',          swatch: '#c686fa' },
  { id: 'purple-muted',  label: 'Purple · Muted',  swatch: '#ca9ee6' },
  { id: 'blue',          label: 'Blue',            swatch: '#5aaaff' },
  { id: 'blue-muted',    label: 'Blue · Muted',    swatch: '#8caaee' },
  { id: 'cyan',          label: 'Cyan',            swatch: '#00f0ff' },
  { id: 'cyan-muted',    label: 'Cyan · Muted',    swatch: '#85c1dc' },
  { id: 'amber',         label: 'Amber',           swatch: '#ffb000' },
  { id: 'amber-muted',   label: 'Amber · Muted',   swatch: '#e0a963' },
  { id: 'red',           label: 'Red',             swatch: '#ff5060' },
  { id: 'red-muted',     label: 'Red · Muted',     swatch: '#e78284' },
]

function applyTheme(id) {
  const el = document.documentElement
  el.classList.forEach(cls => {
    if (cls.startsWith('theme-')) el.classList.remove(cls)
  })
  if (id && id !== DEFAULT_THEME) {
    el.classList.add(`theme-${id}`)
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  })

  useEffect(() => {
    applyTheme(theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setTheme = useCallback((id) => {
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // storage unavailable
    }
    setThemeState(id)
    applyTheme(id)
  }, [])

  return { theme, setTheme }
}
