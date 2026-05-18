// Rules, Oracles, and How-to-Play content (optional tutorial)

export const tutorialSections = [
  {
    id: 'how-to-play',
    title: 'How to Play',
    content: [
      {
        type: 'text',
        paragraphs: [
          'The intent is that you play the game over the course of 7 days — one chapter per day. Of course, you can play in more or less time than intended.',
          'Each day you will: read the narrative opening, respond to 3–5 journal prompts, and have fun.',
        ],
      },
    ],
  },
  {
    id: 'oracles',
    title: 'The Oracles',
    intro: 'The Oracles are what guide your mystery. Use them whenever you are unsure what happens next. If you are stuck, revisit them and allow them to help your creativity flow.',
    content: [
      {
        type: 'oracle',
        name: 'Emotional Oracle',
        instruction: 'Choose one when you need an emotional direction:',
        items: [
          '1. Dread',
          '2. Longing',
          '3. Awe',
          '4. Disorientation',
          '5. Regret',
          '6. Compulsion',
          '7. Hope',
          '8. Apathy',
          '9. Desire',
          '10. Joy',
        ],
      },
      {
        type: 'oracle',
        name: 'Urban Anomaly Oracle',
        instruction: 'Choose one during strange encounters:',
        items: [
          '1. A light flickers in a rhythm',
          '2. A reflection moves independently',
          '3. A voice comes from a powered-off or broken device',
          '4. A corridor is slightly longer than it should be',
          '5. Someone recognizes you when they shouldn\'t',
          '6. The city map glitches in one quadrant or layer',
          '7. A memory overlays reality like a double exposure',
          '8. A mysterious symbol appears before you',
          '9. The AI network says something unnerving',
          '10. A voice in your head that is not your own',
        ],
      },
      {
        type: 'oracle',
        name: 'Interpretation of the Oracle',
        instruction: 'Ask yourself the following after consulting an Oracle:',
        items: [
          '1. What does my character think is happening?',
          '2. What does my character feel is happening?',
          '3. What does my character sense physically — hear, see, taste, touch, or smell?',
          '4. What does the city want them to believe?',
        ],
        note: 'Your tension will naturally escalate from the differences these answers present.',
      },
    ],
  },
  {
    id: 'rules',
    title: 'Rules of Engagement',
    content: [
      {
        type: 'rule',
        text: 'Write honestly. This is not about what should happen, but about what your character feels and experiences.',
      },
      {
        type: 'text',
        paragraphs: [
          'Unlike tabletop roleplaying games, there are no logic traps, no dice, no punishments. The story unfolds as it should, as you want it to.',
          'If something seems too far-fetched, ask yourself if that\'s what really feels appropriate. If so, write it and move on. If not, visit the Oracles.',
          'The journal prompts are there to help you get writing — feel free to write more than what is requested. Dig deep on a single prompt or answer all of them. The choice is yours.',
          'The unnumbered rule is simply to have fun.',
        ],
      },
    ],
  },
]
