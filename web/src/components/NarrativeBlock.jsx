import React from 'react'

// Renders a single narrative segment
function Segment({ segment, resolveEcho, state }) {
  if (typeof segment === 'string') {
    return <NarrativeParagraph text={segment} />
  }

  switch (segment.type) {
    case 'text':
      return <NarrativeParagraph text={segment.content} />
    case 'break':
      return <div className="h-1" />
    case 'comm':
      return (
        <div className="my-4">
          <div className="comm-message whitespace-pre-line inline-block">{segment.content}</div>
        </div>
      )
    case 'echo': {
      const primary = resolveEcho(segment.journalKey, state)
      const alt = segment.altKey ? resolveEcho(segment.altKey, state) : null
      const text = primary || alt
      if (!text) return null
      const prefix = segment.prefix || ''
      const suffix = segment.suffix || ''
      // Trim to a reasonable length for inline echo
      const trimmed = text.length > 200 ? text.slice(0, 200) + '…' : text
      return (
        <div className="echo-callout my-3">
          {prefix}<em>{trimmed}</em>{suffix}
        </div>
      )
    }
    default:
      return null
  }
}

function NarrativeParagraph({ text }) {
  // Handle bold (** **) and italic (* *) within the text
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <p className="narrative-p">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        // Handle \n within paragraph
        return part.split('\n').map((line, j, arr) => (
          <React.Fragment key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </React.Fragment>
        ))
      })}
    </p>
  )
}

export default function NarrativeBlock({ scene, state, resolveEcho }) {
  return (
    <div className="terminal-block">
      {scene.instruction && (
        <p className="text-neon-dim text-xs tracking-widest uppercase mb-4 border-b border-neon-faint pb-3">
          {scene.instruction}
        </p>
      )}
      <div className="space-y-1">
        {scene.narrative.map((seg, i) => (
          <Segment
            key={i}
            segment={seg}
            resolveEcho={resolveEcho}
            state={state}
          />
        ))}
      </div>
    </div>
  )
}
