import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terminal-inspired color palette (Green/Blue/Black)
        'terminal-green': '#00ff41',
        'terminal-green-dim': '#00cc33',
        'terminal-green-dark': '#008822',
        'cyber-blue': '#00d9ff',
        'cyber-blue-dim': '#00a8cc',
        'deep-black': '#000000',
        'console-bg': '#0a0a0a',
        'panel-bg': '#0f0f0f',
        'panel-border': '#1a1a1a',
        'text-primary': '#00ff41',
        'text-secondary': '#00cc33',
        'text-dim': '#008822',
        'text-accent': '#00d9ff',
        'warning-amber': '#ffaa00',
        'error-red': '#ff0055',
        'classified-red': '#ff0000',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3)',
        'glow-green-lg': '0 0 15px rgba(0, 255, 65, 0.6), 0 0 30px rgba(0, 255, 65, 0.4), 0 0 45px rgba(0, 255, 65, 0.2)',
        'glow-blue': '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-blue-lg': '0 0 15px rgba(0, 217, 255, 0.6), 0 0 30px rgba(0, 217, 255, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
