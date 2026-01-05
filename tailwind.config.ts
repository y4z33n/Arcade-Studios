import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			'2xl': '1536px',
  			'3xl': '1920px'
  		},
  		colors: {
  			primary: {
  				black: '#000000',
  				white: '#FFFFFF',
  				red: '#DC2626',
  				gray: {
  					'50': '#F9FAFB',
  					'100': '#F3F4F6',
  					'200': '#E5E7EB',
  					'300': '#D1D5DB',
  					'400': '#9CA3AF',
  					'500': '#6B7280',
  					'600': '#4B5563',
  					'700': '#374151',
  					'800': '#1F2937',
  					'900': '#111827'
  				},
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'display-xl': [
  				'5rem',
  				{
  					lineHeight: '1.1',
  					fontWeight: '700'
  				}
  			],
  			'display-lg': [
  				'4rem',
  				{
  					lineHeight: '1.1',
  					fontWeight: '700'
  				}
  			],
  			'display-md': [
  				'3rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'display-sm': [
  				'2.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			]
  		},
  		borderRadius: {
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'fade-in-up': 'fadeInUp 0.6s ease-out',
  			'bounce-slow': 'bounce 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

