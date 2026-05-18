import React from 'react'

export default function Layout({ children }) {
  return (
    <div className="scanlines min-h-screen relative">
      <div className="rain-bg" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  )
}
