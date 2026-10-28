/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-contrast Dark Premium Theme Palette
        dark: {
          bg: '#070B14',          // Primary background
          surface: '#0B1220',     // Secondary background
          navy: '#101B32',        // Dark navy
          card: '#111C30',        // Card background
          elevated: '#17243B',    // Elevated card background
        },
        electric: '#38BDF8',      // Electric blue
        violet: {
          DEFAULT: '#8B5CF6',     // Gradient violet
          glow: '#A78BFA',
        },
        cyan: {
          DEFAULT: '#22D3EE',     // Gradient cyan
          glow: '#67E8F9',
        },
        rose: {
          DEFAULT: '#F43F5E',     // Gradient red
          alert: '#FB7185',       // Error and warning text
        },
        text: {
          primary: '#F8FAFC',     // Main text
          secondary: '#A7B4C8',   // Secondary text
          muted: '#64748B',
        },
        border: {
          subtle: 'rgba(148, 163, 184, 0.18)',
          glow: 'rgba(56, 189, 248, 0.3)',
        },
        // Brand references preserved
        brand: {
          blue: '#2563EB',
          navy: '#243F59',
          lightblue: '#75A9D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(56, 189, 248, 0.15)',
        'glow-md': '0 0 25px rgba(56, 189, 248, 0.25), 0 0 10px rgba(139, 92, 246, 0.2)',
        'glow-lg': '0 0 40px rgba(56, 189, 248, 0.3), 0 0 20px rgba(139, 92, 246, 0.25)',
        'glow-btn': '0 4px 20px rgba(37, 99, 235, 0.45), 0 0 30px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-card': '0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(148, 163, 184, 0.12)',
      },
      animation: {
        'gradient-flow': 'gradientFlow 8s ease infinite',
        'aurora-1': 'auroraOne 20s ease-in-out infinite alternate',
        'aurora-2': 'auroraTwo 25s ease-in-out infinite alternate',
        'aurora-3': 'auroraThree 18s ease-in-out infinite alternate',
        'fade-slide': 'fadeSlide 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        auroraOne: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.15)' },
          '100%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        auroraTwo: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-80px, 50px) scale(1.2)' },
          '100%': { transform: 'translate(40px, -30px) scale(0.9)' },
        },
        auroraThree: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 60px) scale(1.1)' },
          '100%': { transform: 'translate(-50px, -40px) scale(1.05)' },
        },
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
