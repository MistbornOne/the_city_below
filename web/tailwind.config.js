/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon:             'rgb(var(--neon-rgb) / <alpha-value>)',
        'neon-dim':       'rgb(var(--neon-dim-rgb) / <alpha-value>)',
        'neon-bright':    'rgb(var(--neon-bright-rgb) / <alpha-value>)',
        'neon-faint':     'rgb(var(--neon-faint-rgb) / <alpha-value>)',
        'neon-soft':      'rgb(var(--neon-soft-rgb) / <alpha-value>)',
        terminal:         'rgb(var(--terminal-rgb) / <alpha-value>)',
        'terminal-light': 'rgb(var(--terminal-light-rgb) / <alpha-value>)',
        'terminal-mid':   'rgb(var(--terminal-mid-rgb) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'rain': 'rain 0.8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.7' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.4' },
          '97%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        rain: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100px' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 calc(4px * var(--glow-mult)) rgb(var(--neon-rgb)), 0 0 calc(8px * var(--glow-mult)) rgb(var(--neon-rgb))' },
          '50%': { textShadow: '0 0 calc(8px * var(--glow-mult)) rgb(var(--neon-rgb)), 0 0 calc(20px * var(--glow-mult)) rgb(var(--neon-rgb)), 0 0 calc(40px * var(--glow-mult)) rgb(var(--neon-rgb) / 0.4)' },
        },
      },
      boxShadow: {
        'neon':       '0 0 5px rgb(var(--neon-rgb)), 0 0 10px rgb(var(--neon-rgb)), 0 0 calc(20px * var(--glow-mult)) rgb(var(--neon-rgb) / 0.4)',
        'neon-sm':    '0 0 3px rgb(var(--neon-rgb)), 0 0 6px rgb(var(--neon-rgb) / 0.4)',
        'neon-inner': 'inset 0 0 10px rgb(var(--neon-rgb) / 0.13)',
      },
      textShadow: {
        'neon': '0 0 calc(4px * var(--glow-mult)) rgb(var(--neon-rgb)), 0 0 calc(8px * var(--glow-mult)) rgb(var(--neon-rgb))',
      },
    },
  },
  plugins: [],
}
