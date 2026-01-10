/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './src/**/*.{html,js,jsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx',
        './src/hooks/**/*.{js,ts,jsx,tsx}',
        './index.html',
    ],
    theme: {
        colors: {
            black: '#000000',
            blue: '#1fb6ff',
            purple: '#7e5bef',
            pink: '#ff49db',
            orange: '#ff7849',
            green: '#13ce66',
            yellow: '#ffc82c',
            'gray-dark': '#273444',
            gray: '#8492a6',
            'gray-light': '#d3dce6',
            red: {
                DEFAULT: "#DC2626",
                light: "#F87171",
                dark: "#B91C1C",
              },
              white: {
                DEFAULT: "#FFFFFF",
                soft: "#FAFAFA",
              },
        },
        extend: {
            colors: {
                primary: {
                  50: "#FAF5FF",
                  100: "#F3E8FF",
                  300: "#D8B4FE",
                  500: "#8B5CF6",
                  600: "#7C3AED",
                  700: "#6D28D9",
                },
        
                secondary: {
                  50: "#FDF2F8",
                  100: "#FCE7F3",
                  300: "#F9A8D4",
                  500: "#EC4899",
                  600: "#DB2777",
                },
        
                accent: "#F59E0B",
        
                surface: {
                  DEFAULT: "#FFFFFF",
                  soft: "#FAFAFA",
                  muted: "#F1F5F9",
                },
        
                text: {
                  DEFAULT: "#2E1065",
                  muted: "#6B7280",
                  inverted: "#FFFFFF",
                },
        
                success: "#22C55E",
                warning: "#F59E0B",
                danger: "#EF4444",
              },
        
              borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
              },
        
              boxShadow: {
                card: "0 10px 25px rgba(0,0,0,0.08)",
                glow: "0 0 20px rgba(239,68,68,0.35)",
              },
        },
    },
    plugins: [],
}
