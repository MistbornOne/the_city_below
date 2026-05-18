// Intro lore sections shown before Character Creation

export const introSections = [
  {
    id: 'about',
    title: 'About The City Below',
    content: [
      {
        type: 'text',
        paragraphs: [
          'The City Below is a week-long descent into a mystery hidden beneath a neon, futuristic metropolis. You will journal in first person as your character uncovers:',
        ],
      },
      {
        type: 'list',
        items: [
          'Patterns no one else sees.',
          'Sounds no one else hears.',
          'Memories that are not entirely theirs.',
          'A cosmic presence buried under the city\'s foundations.',
        ],
      },
      {
        type: 'text',
        paragraphs: [
          'Your character is real.',
          'But so is the thing calling to them.',
        ],
      },
      {
        type: 'callout',
        text: 'This game leans into atmosphere, cosmic uncertainty, emotional reactions, and mystery driven by your interpretation. There is a truth to discover — but you may or may not reach it. That depends on how much (or little) you journal.',
      },
      {
        type: 'text',
        paragraphs: [
          'May the gods of the Cosmos smile upon you… if they\'re even watching.',
        ],
      },
    ],
  },
  {
    id: 'setting',
    title: 'The Setting — Virescent City',
    subtitle: 'Year 3105',
    content: [
      {
        type: 'text',
        paragraphs: [
          'Virescent City is a large city in the Milky Way Galactic System. It was not founded by any one species or group, but rather formed when The Collective expanded beyond the planetary system revolving around the star Helios. It is a city the size of the historical Earth continent known as Europe, and houses some fifteen billion residents.',
          'Terms like "The Void," "Zeroes," and "Level 0" are used semi-casually in conversation, but if you asked ten people to define them, you would get ten different answers.',
          'Virescent is a vertical megacity. The layering system follows a pattern:',
        ],
      },
      {
        type: 'levels',
        levels: [
          {
            label: 'The Surface — Levels 30–60',
            description: 'The business district. Mega-corporations, neon ads, restaurants, transit nets, and banks. Wealth of untold volumes. If you desire it, you can find it here.',
          },
          {
            label: 'The Intermediary — Levels 10–29',
            description: 'The residential district. Every housing type imaginable. Most residents never leave — why should they, when every need is catered to? These levels also house small markets, public transit tunnels, and clinics.',
          },
          {
            label: 'The Foundations — Levels 0–9',
            description: 'Restricted. Only approved personnel with Level 3 or higher clearance permitted. Top-secret Collective labs, forgotten transit, utility caverns, and the Void.',
          },
          {
            label: 'Below Level 0 — ???',
            description: 'Officially, nothing exists below level zero. Unofficially… if you live to tell the tale, let the rest of us know.',
          },
        ],
      },
      {
        type: 'text',
        paragraphs: [
          'Doesn\'t the city sound sublime? Absolutely perfect for any species or sub-species to live the life they wish to live.',
        ],
      },
      {
        type: 'callout',
        ominous: true,
        text: 'But people hear things. Sometimes, they disappear. They find symbols. Such strange symbols. And if you\'re paying attention — really paying attention — the lights flicker in patterns no algorithm can explain.',
      },
      {
        type: 'text',
        paragraphs: [
          'Welcome to intergalactic metropolitan paradise. You couldn\'t have joined us at a better time.',
        ],
      },
      {
        type: 'note',
        title: 'A Note on Timestamps',
        text: 'Throughout the narrative you will see dates formatted as: Day [Number]: Week [Number]: [Year] [Time] — for example, Day One: Week 49: 3105 13:00. You don\'t need to track these numbers. They\'re there to reinforce the feeling that your character is living inside an ongoing world whose routines may be beginning to break.',
      },
    ],
  },
  {
    id: 'structure',
    title: 'The Chronicle Structure',
    content: [
      {
        type: 'text',
        paragraphs: [
          'Each day a new layer of the mystery unfolds. You will read the initial narrative and respond according to the instructions given. Write as little or as much as you\'d like — allow the story to flow naturally.',
        ],
      },
      {
        type: 'daylist',
        days: [
          { label: 'Day 1', title: 'The Signal' },
          { label: 'Day 2', title: 'The Descent or The Missing' },
          { label: 'Day 3', title: 'The Symmetry (Below or Above)' },
          { label: 'Day 4', title: 'The Pursuit or The Hunted' },
          { label: 'Day 5', title: 'The Fracture' },
          { label: 'Day 6', title: 'The Choice' },
          { label: 'Day 7', title: 'The Truth' },
        ],
      },
      {
        type: 'text',
        paragraphs: [
          'Sessions generally take 10–30 minutes depending on your writing pace.',
          'You may not survive the scenario psychologically — but you will finish the Chronicle either way. The Oracles and gods insist upon that.',
        ],
      },
      {
        type: 'callout',
        text: 'Because you\'re journaling alongside the story, you could play through multiple times with different outcomes. If you do play a second time, choose the opposite path.',
      },
    ],
  },
]
