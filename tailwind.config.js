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
          // ── Rwanda-grounded palette ───────────────────────────
          laterite: '#7C4A22', // Rwanda's red-clay laterite soil — land/plot category
          hillside: '#2A4A35', // Rwanda's forested hillsides — property/housing category
          overcast: '#E8E4DC', // Kigali morning sky, warm grey — page background
          sun:      '#C17D2E', // afternoon light on red-tile Kigali roofs — prices, CTA
          iron:     '#4A5568', // iron gate, garage door — body text, secondary labels
          // ── Semantic / functional ─────────────────────────────
          green: {
            DEFAULT: '#10B981',
            dark:    '#047857',
            light:   '#D1FAE5',
          },
          // ── Surfaces & backgrounds ────────────────────────────
          bg:      '#EDEBE5',   // warm Overcast base
          surface: '#FFFFFF',
          muted:   '#F5F3EF',   // warm off-white panel bg
          warm:    '#FDFCFB',   // very light warm surface
          // ── Text ─────────────────────────────────────────────
          text: {
            primary:   '#0D1E2C',  // Night ink — darker, richer than before
            secondary: '#4A5568',  // Iron — body text
            muted:     '#8A9099',  // quiet metadata
          },
          // ── Borders & dividers ────────────────────────────────
          border:  '#E5E1DA',   // warm border (not cold blue-grey)
          line:    '#D4CFC7',   // warm divider line
          // ── Feedback ─────────────────────────────────────────
          error:   '#DC2626',
          warning: '#D97706',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],           // headings — physical asset ownership
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],   // UI chrome, labels
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        // ── Refined, warm-toned shadows ────────────────────────
        baza:       '0 1px 3px 0 rgba(13,30,44,0.06), 0 1px 2px -1px rgba(13,30,44,0.04)',
        'baza-md':  '0 4px 12px -2px rgba(13,30,44,0.10), 0 2px 6px -2px rgba(13,30,44,0.06)',
        'baza-lg':  '0 10px 24px -4px rgba(13,30,44,0.12), 0 4px 8px -4px rgba(13,30,44,0.06)',
        'baza-xl':  '0 20px 40px -8px rgba(13,30,44,0.16), 0 8px 16px -8px rgba(13,30,44,0.08)',
        // ── Accent shadows ────────────────────────────────────
        sun:      '0 4px 14px -2px rgba(193,125,46,0.35)',
        cyan:     '0 4px 14px -2px rgba(6,182,212,0.30)',
        navy:     '0 4px 14px -2px rgba(10,42,66,0.30)',
        laterite: '0 4px 14px -2px rgba(124,74,34,0.30)',
        // ── Legacy (keep so existing components compile) ───────
        coral:   '0 4px 14px -2px rgba(249,115,22,0.35)',
      },
      borderRadius: {
        baza:      '0.375rem',   // 6px — tight, editorial
        'baza-lg': '0.625rem',   // 10px — cards
        'baza-xl': '1rem',       // 16px — large surfaces
        'baza-2xl':'1.5rem',     // 24px — hero sections
      },
      backgroundImage: {
        // ── Brand gradients ───────────────────────────────────
        'baza-hero':    'linear-gradient(135deg, #0A2A42 0%, #0E3A5A 50%, #0A2A42 100%)',
        'baza-sun':     'linear-gradient(135deg, #C17D2E 0%, #A06020 100%)',
        'baza-cyan':    'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'baza-surface': 'linear-gradient(180deg, #FFFFFF 0%, #FDFCFB 100%)',
        // ── Legacy ───────────────────────────────────────────
        'baza-coral':   'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
        'baza-accent':  'linear-gradient(135deg, #F97316 0%, #06B6D4 100%)',
      },
      animation: {
        'fade-in':     'fadeIn 0.25s ease-out',
        'slide-up':    'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        'slide-down':  'slideDown 0.3s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':    'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1)',
        'shimmer':     'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                               to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' },     to: { opacity: '1', transform: 'scale(1)' } },
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
