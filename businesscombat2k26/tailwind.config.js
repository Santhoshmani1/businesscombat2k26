/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Base Colors - Enhanced
                'base-black': '#0B0D10',
                'deep-charcoal': '#12151B',
                'core-orange': '#FF7A18',
                'electric-blue': '#3AA9FF',

                // Additional Vibrant Colors
                'neon-green': '#00FF88',
                'cyber-purple': '#8B5CF6',
                'hot-pink': '#FF1B8D',
                'lime-green': '#32D74B',
                'sunset-orange': '#FF9500',
                'electric-cyan': '#00D4FF',
                'neon-yellow': '#FFD60A',
                'royal-purple': '#5856D6',

                // Glass Card Colors
                'glass-bg': 'rgba(15, 20, 30, 0.6)',
                'glass-border': 'rgba(255, 255, 255, 0.12)',
                'glass-hover': 'rgba(255, 122, 24, 0.1)',

                // Text Glow Colors
                'orange-glow': 'rgba(255, 122, 24, 0.35)',
                'blue-glow': 'rgba(58, 169, 255, 0.35)',
                'green-glow': 'rgba(0, 255, 136, 0.35)',
                'purple-glow': 'rgba(139, 92, 246, 0.35)',
            },
            fontFamily: {
                // Hero/Title fonts - Much cooler modern fonts
                'hero': ['Space Grotesk', 'Rajdhani', 'Exo 2', 'sans-serif'],
                'display': ['Orbitron', 'Audiowide', 'Michroma', 'monospace'],
                'cyber': ['Share Tech Mono', 'Courier Prime', 'monospace'],
                // UI/Body fonts - Clean and modern
                'ui': ['Inter', 'Poppins', 'Nunito Sans', 'sans-serif'],
                'body': ['Manrope', 'Source Sans Pro', 'system-ui', 'sans-serif'],
            },
            fontWeight: {
                'hero': '700',
                'hero-bold': '900',
                'display': '800',
                'ui-normal': '400',
                'ui-medium': '500',
                'ui-semibold': '600',
                'ui-bold': '700',
            },
            letterSpacing: {
                'hero': '-0.02em',
                'display': '-0.01em',
                'cyber': '0.05em',
                'tight': '-0.025em',
                'tighter': '-0.05em',
                'tightest': '-0.075em',
                'wide': '0.025em',
            },
            lineHeight: {
                'none': '1',
                'tight': '1.1',
                'snug': '1.2',
                'normal': '1.4',
                'relaxed': '1.5',
                'loose': '1.6',
                'hero': '0.85',
                'display': '0.9',
                'compact': '0.95',
            },
            backdropBlur: {
                'glass': '14px',
                'heavy': '20px',
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
                'hover-glow': '0 0 20px rgba(255, 122, 24, 0.35)',
                'neon-orange': '0 0 30px rgba(255, 122, 24, 0.5)',
                'neon-blue': '0 0 30px rgba(58, 169, 255, 0.5)',
                'neon-green': '0 0 30px rgba(0, 255, 136, 0.5)',
                'neon-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(255, 122, 24, 0.5)' },
                    '100%': { boxShadow: '0 0 30px rgba(255, 122, 24, 0.8)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'cyber-grid': 'linear-gradient(rgba(58, 169, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 169, 255, 0.1) 1px, transparent 1px)',
            },
        },
    },
    plugins: [
        // Enhanced custom plugin for text-shadow and other utilities
        function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow-orange-glow': {
                    textShadow: '0 0 20px rgba(255, 122, 24, 0.35), 0 0 40px rgba(255, 122, 24, 0.2)',
                },
                '.text-shadow-blue-glow': {
                    textShadow: '0 0 20px rgba(58, 169, 255, 0.35), 0 0 40px rgba(58, 169, 255, 0.2)',
                },
                '.text-shadow-green-glow': {
                    textShadow: '0 0 20px rgba(0, 255, 136, 0.35), 0 0 40px rgba(0, 255, 136, 0.2)',
                },
                '.text-shadow-purple-glow': {
                    textShadow: '0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(139, 92, 246, 0.2)',
                },
                '.text-shadow-cyber': {
                    textShadow: '0 0 10px rgba(58, 169, 255, 0.5), 0 0 20px rgba(58, 169, 255, 0.3), 0 0 30px rgba(58, 169, 255, 0.1)',
                },
                '.bg-cyber-grid': {
                    backgroundImage: 'linear-gradient(rgba(58, 169, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 169, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                },
            }
            addUtilities(newUtilities)
        }
    ],
}