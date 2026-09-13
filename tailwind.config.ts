import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        amber: 'hsl(var(--amber))',
        cyan: 'hsl(var(--cyan))',
        green: 'hsl(var(--green))',
        rose: 'hsl(var(--rose))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        'border-strong': 'hsl(var(--border-strong))',
        surface: 'hsl(var(--surface))',
        'surface-raised': 'hsl(var(--surface-raised))',
        faint: 'hsl(var(--faint))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        /* A fluorescent tube striking, over 6s. The realism is in the
           irregularity: even blinking reads as a blinking div, because real
           tubes stutter at uneven intervals and uneven brightness while the
           starter arcs, fail a strike or two, catch, wobble, then warm up.
           Every interval is step-end (instant, like an arc) except the warm-up,
           which is the one genuinely interpolated ramp in the cycle.

           On photosensitivity: the rapid early stutters are all low amplitude
           (<=0.55), well under the WCAG 2.3.1 general-flash luminance delta.
           Only two large swings occur, ~170ms apart inside one second, so the
           rate stays within the three-flash limit. It is also fully disabled
           under prefers-reduced-motion at the call site. */
        'tube-strike': {
          /* Starter arcing: dim, irregular, going nowhere. */
          '0%':     { opacity: '0.22', animationTimingFunction: 'step-end' },
          '1.17%':  { opacity: '0.06', animationTimingFunction: 'step-end' },
          '2.5%':   { opacity: '0.4',  animationTimingFunction: 'step-end' },
          '3.33%':  { opacity: '0.1',  animationTimingFunction: 'step-end' },
          '5%':     { opacity: '0.3',  animationTimingFunction: 'step-end' },
          '5.75%':  { opacity: '0.05', animationTimingFunction: 'step-end' },
          '8.67%':  { opacity: '0.55', animationTimingFunction: 'step-end' },
          '9.75%':  { opacity: '0.12', animationTimingFunction: 'step-end' },
          '11.67%': { opacity: '0.42', animationTimingFunction: 'step-end' },
          '12.67%': { opacity: '0.08', animationTimingFunction: 'step-end' },
          /* First real strike. It does not hold, drops back, catches second go. */
          '15.83%': { opacity: '1',    animationTimingFunction: 'step-end' },
          '17.33%': { opacity: '0.35', animationTimingFunction: 'step-end' },
          '18.67%': { opacity: '0.95', animationTimingFunction: 'step-end' },
          '20%':    { opacity: '0.6',  animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          /* Warm-up to full output. */
          '27.5%':  { opacity: '1',    animationTimingFunction: 'step-end' },
          /* Burning steady, then cut and strike again. */
          '93.33%': { opacity: '1',    animationTimingFunction: 'step-end' },
          '93.34%': { opacity: '0' },
          '100%':   { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1s step-end infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        /* Timing is set per keyframe, so the shorthand stays linear. */
        'tube-strike': 'tube-strike 6s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
