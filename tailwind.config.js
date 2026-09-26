/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baza: {
          // ── Core brand from logo ──────────────────────────────
          navy:    '#0A2A42',   // deep navy — logo foundation circle
          cyan:    '#06B6D4',   // teal/cyan — logo flowing arcs (cool)
          teal:    '#0891B2',   // darker teal — for hover/depth
          coral:   '#F97316',   // orange/coral — logo warm arcs
          rose:    '#E8445A',   // logo red-pink accent
          // ── Semantic / functional ─────────────────────────────
          green: {
            DEFAULT: '#10B981',
            dark:    '#047857',
            light:   '#D1FAE5',
          },
          // ── Surfaces & backgrounds ────────────────────────────
          bg:      '#F0F4F8',   // cool off-white base
          surface: '#FFFFFF',
          muted:   '#F8FAFC',   // slightly lighter panel bg
          // ── Text ─────────────────────────────────────────────
          text: {
            primary:   '#0F172A',
            secondary: '#475569',
            muted:     '#94A3B8',
          },
          // ── Borders & dividers ────────────────────────────────
          border:  '#E2E8F0',
          line:    '#CBD5E1',
          // ── Feedback ─────────────────────────────────────────
          error:   '#DC2626',
          warning: '#D97706',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        // ── Refined, minimal shadows (not excessive) ──────────
        baza:    '0 1px 3px 0 rgba(10,42,66,0.06), 0 1px 2px -1px rgba(10,42,66,0.04)',
        'baza-md':'0 4px 12px -2px rgba(10,42,66,0.10), 0 2px 6px -2px rgba(10,42,66,0.06)',
        'baza-lg':'0 10px 24px -4px rgba(10,42,66,0.12), 0 4px 8px -4px rgba(10,42,66,0.06)',
        'baza-xl':'0 20px 40px -8px rgba(10,42,66,0.16), 0 8px 16px -8px rgba(10,42,66,0.08)',
        // ── Accent shadows for coloured elements ─────────────
        coral:   '0 4px 14px -2px rgba(249,115,22,0.35)',
        cyan:    '0 4px 14px -2px rgba(6,182,212,0.30)',
        navy:    '0 4px 14px -2px rgba(10,42,66,0.30)',
      },
      borderRadius: {
        baza:  '0.5rem',    // 8px — tighter than before (was 12px)
        'baza-lg': '0.875rem', // 14px — cards
        'baza-xl': '1.25rem',  // 20px — large surfaces
        'baza-2xl':'1.75rem',  // 28px — hero sections
      },
      backgroundImage: {
        // ── Brand gradients extracted from logo ───────────────
        'baza-hero':     'linear-gradient(135deg, #0A2A42 0%, #0E3A5A 50%, #0A2A42 100%)',
        'baza-coral':    'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
        'baza-cyan':     'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'baza-accent':   'linear-gradient(135deg, #F97316 0%, #06B6D4 100%)',
        'baza-surface':  'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      animation: {
        'fade-in':     'fadeIn 0.25s ease-out',
        'slide-up':    'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        'slide-down':  'slideDown 0.3s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':    'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1)',
        'shimmer':     'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                           to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      transitionTimingFunction: {
        'baza': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
