/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00FF41',
        'neon-dim': '#00b300',
        'neon-bright': '#39FF14',
        'neon-faint': '#003300',
        'terminal': '#0a0f0a',
        'terminal-light': '#0f1a0f',
        'terminal-mid': '#1a2a1a',
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
          '0%, 100%': { textShadow: '0 0 4px #00FF41, 0 0 8px #00FF41' },
          '50%': { textShadow: '0 0 8px #00FF41, 0 0 20px #00FF41, 0 0 40px #00FF4166' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 20px #00FF4166',
        'neon-sm': '0 0 3px #00FF41, 0 0 6px #00FF4166',
        'neon-inner': 'inset 0 0 10px #00FF4122',
      },
      textShadow: {
        'neon': '0 0 4px #00FF41, 0 0 8px #00FF41',
      },
    },
  },
  plugins: [],
}
