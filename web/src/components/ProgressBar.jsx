import React from 'react'

const STEPS = ['Prologue', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

const SCENE_TO_STEP = {
  prologue: 0,
  day1: 1,
  day2a: 2, day2b: 2,
  day3a: 3, day3b: 3,
  day4a: 4, day4b: 4,
  day5a: 5, day5b: 5,
  day6a: 6, day6b: 6,
  day7: 7,
}

export default function ProgressBar({ currentScene }) {
  const activeStep = SCENE_TO_STEP[currentScene] ?? -1

  return (
    <div className="flex items-center gap-2 py-3">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`progress-dot ${
                i === activeStep ? 'active' : i < activeStep ? 'complete' : ''
              }`}
              title={label}
            />
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px ${i < activeStep ? 'bg-neon-dim' : 'bg-neon-faint'}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
