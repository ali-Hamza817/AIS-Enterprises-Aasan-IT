import { useState, useEffect, useRef, type ReactNode } from 'react'

// ── Scroll reveal hook ────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} ${className}`}>
      {children}
    </div>
  )
}

// ── SVG Icons ─────────────────────────────────────────────────────
const Icon = {
  menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  x: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z" />
    </svg>
  ),
  mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  location: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  whatsapp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  // Feature icons
  briefcase: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  clock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  smile: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  lightbulb: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  ),
  trending: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  award: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  eye: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  map: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  playstore: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.83 1-.99 1.4-.37l14.96 8.5c.41.23.41.87 0 1.1L4.4 21.87c-.4.62-1.4.46-1.4-.37z" />
    </svg>
  ),
  sun: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
}

// ── Navigation ────────────────────────────────────────────────────
type Page = 'home' | 'apps' | 'about' | 'contact'

function Nav({
  current,
  setPage,
  theme,
  toggleTheme,
}: {
  current: Page
  setPage: (p: Page) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [current])

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Applications', page: 'apps' },
    { label: 'Contact', page: 'contact' },
  ]

  const navigate = (page: Page) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', fontFamily: 'Outfit, sans-serif' }}
          >
            AIS
          </div>
          <div className="text-left hidden sm:block">
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.1 }}>
              AIS Enterprises
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: '0.72rem', color: 'var(--muted-foreground)', lineHeight: 1 }}>
              & Aasan IT
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: current === l.page ? 600 : 500,
                fontSize: '0.9rem',
                color: current === l.page ? 'var(--accent)' : 'var(--foreground)',
                background: current === l.page ? 'var(--badge-bg)' : 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (current !== l.page) {
                  e.currentTarget.style.background = 'var(--badge-bg)'
                  e.currentTarget.style.color = 'var(--accent)'
                }
              }}
              onMouseLeave={(e) => {
                if (current !== l.page) {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = 'var(--foreground)'
                }
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA & Theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-105"
            style={{
              background: 'none',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Icon.moon /> : <Icon.sun />}
          </button>
          <button className="btn-primary btn-pulse" onClick={() => navigate('contact')} style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Get in Touch
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center border"
            style={{
              background: 'none',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Icon.moon /> : <Icon.sun />}
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <Icon.x /> : <Icon.menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
          background: 'var(--nav-bg-scrolled)',
          borderTop: mobileOpen ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: current === l.page ? 600 : 500,
                fontSize: '1rem',
                color: current === l.page ? 'var(--accent)' : 'var(--foreground)',
                background: current === l.page ? 'var(--badge-bg)' : 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                textAlign: 'left',
                width: '100%',
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            className="btn-primary mt-2 justify-center btn-pulse"
            onClick={() => navigate('contact')}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  )
}

// ── Footer ────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (page: Page) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    { Icon: Icon.instagram, label: 'Instagram', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
    { Icon: Icon.facebook, label: 'Facebook', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
    { Icon: Icon.linkedin, label: 'LinkedIn', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
    { Icon: Icon.youtube, label: 'YouTube', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
    { Icon: Icon.whatsapp, label: 'WhatsApp', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
  ]

  return (
    <footer style={{ background: 'var(--footer-bg)', color: '#94a3b8' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', fontFamily: 'Outfit, sans-serif' }}
              >
                AIS
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9' }}>
                  AIS Enterprises
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: '0.72rem', color: '#64748b' }}>
                  & Aasan IT
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#64748b', maxWidth: '240px' }}>
              Dream • Create • Innovate
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#64748b', maxWidth: '240px', marginTop: '0.5rem' }}>
              Simplifying business management through innovative digital applications.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-5">
              {socials.map(({ Icon: Ic, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(37,99,235,0.3)'
                    e.currentTarget.style.color = '#60a5fa'
                    e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Ic />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9', marginBottom: '1rem' }}>
              Company
            </h4>
            {['About Us', 'Our Mission', 'Core Values', 'Careers'].map((item) => (
              <button
                key={item}
                onClick={() => navigate('about')}
                style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  color: '#64748b', fontSize: '0.875rem', padding: '0.3rem 0',
                  fontFamily: 'Inter, sans-serif', textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#93c5fd' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b' }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Our Apps */}
          <div>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9', marginBottom: '1rem' }}>
              Our Apps
            </h4>
            {['Aasan Dairy', 'Aasan Transport', 'All Applications'].map((item) => (
              <button
                key={item}
                onClick={() => navigate('apps')}
                style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  color: '#64748b', fontSize: '0.875rem', padding: '0.3rem 0',
                  fontFamily: 'Inter, sans-serif', textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#93c5fd' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b' }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9', marginBottom: '1rem' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}><Icon.phone /></span>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>+92 348 7707139</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}><Icon.mail /></span>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>zshansiddiqui33@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}><Icon.location /></span>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '0.82rem', color: '#475569' }}>
            © {new Date().getFullYear()} AIS Enterprises & Aasan IT. All Rights Reserved.
          </p>
          <p style={{ fontSize: '0.82rem', color: '#475569' }}>
            Dream • Create • Innovate
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── App Card ──────────────────────────────────────────────────────
function AppCard({
  name,
  tagline,
  description,
  color,
  initial,
  onLearnMore,
}: {
  name: string
  tagline: string
  description: string
  color: string
  initial: string
  onLearnMore: () => void
}) {
  return (
    <div
      className="card-hover card-hover-shine rounded-2xl p-7 flex flex-col gap-4"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* App icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
        style={{ background: color, fontFamily: 'Outfit, sans-serif', boxShadow: `0 6px 20px ${color}44` }}
      >
        {initial}
      </div>
      <div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--foreground)' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.2rem' }}>
          {tagline}
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--desc-color)', flex: 1 }}>{description}</p>

      <div className="flex items-center gap-3 mt-1">
        <button
          className="btn-primary"
          style={{ padding: '0.55rem 1.2rem', fontSize: '0.875rem' }}
          onClick={onLearnMore}
        >
          Learn More <Icon.arrow />
        </button>
        <div className="flex items-center gap-1" style={{ color: '#f59e0b', fontSize: '0.8rem' }}>
          <Icon.star />
          <Icon.star />
          <Icon.star />
          <Icon.star />
          <Icon.star />
        </div>
      </div>
    </div>
  )
}

// ── Page: Home ────────────────────────────────────────────────────
function PageHome({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (page: Page) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    { icon: Icon.briefcase, title: 'Easy Business Management', desc: 'Streamline your daily business operations with intuitive tools designed for efficiency.' },
    { icon: Icon.zap, title: 'Digital Transformation', desc: 'Transition your business to modern digital workflows and leave paperwork behind.' },
    { icon: Icon.clock, title: 'Time Saving Solutions', desc: 'Automate repetitive tasks and reclaim valuable hours for what matters most.' },
    { icon: Icon.smile, title: 'User Friendly Apps', desc: 'Beautifully designed interfaces that anyone can use without technical expertise.' },
    { icon: Icon.shield, title: 'Reliable Support', desc: 'Dedicated support to ensure your business operations never experience downtime.' },
    { icon: Icon.lightbulb, title: 'Continuous Innovation', desc: 'Regularly updated applications with new features driven by user feedback.' },
  ]

  const apps = [
    {
      name: 'Aasan Dairy',
      tagline: 'Dairy Business Management',
      description: 'Manage your dairy business with ease. Track milk collection, sales, customer records, and generate detailed reports — all from your phone.',
      color: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      initial: 'AD',
    },
    {
      name: 'Aasan Transport',
      tagline: 'Fleet & Transport Management',
      description: 'Organize your transport business efficiently. Manage vehicles, trips, drivers, routes, and billing from one powerful application.',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      initial: 'AT',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden hero-grid"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--hero-bg)',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: '560px', height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-100px', left: '-80px',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Left: Copy */}
            <div>
              {/* Refined location badge */}
              <div
                className="animate-fade-up"
                style={{
                  animationDelay: '0.1s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.78rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: '#64748b',
                  }}
                >
                  <span
                    style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#22c55e',
                      animation: 'blink-dot 2s ease infinite',
                      flexShrink: 0,
                    }}
                  />
                  Pakistan's Digital Business Solutions
                </span>
              </div>
              <h1
                className="animate-fade-up"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  color: 'var(--foreground)',
                  marginBottom: '1.25rem',
                  animationDelay: '0.2s',
                }}
              >
                Dream.{' '}
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  <span className="animate-gradient-shift">Create.</span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      height: '3px',
                      width: '100%',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #1e3a8a, #2563eb, #06b6d4)',
                      animation: 'draw-line 0.9s ease 0.7s both',
                    }}
                  />
                </span>{' '}
                Innovate.
              </h1>
              <p
                className="animate-fade-up"
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.75,
                  color: 'var(--desc-color)',
                  maxWidth: '520px',
                  marginBottom: '2rem',
                  animationDelay: '0.3s',
                }}
              >
                Simplifying business management through innovative digital applications that help businesses save time, reduce paperwork, and embrace modern technology.
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <button className="btn-primary btn-pulse" onClick={() => navigate('apps')}>
                  Explore Our Apps <Icon.arrow />
                </button>
                <button className="btn-outline" onClick={() => navigate('contact')}>
                  Contact Us
                </button>
              </div>

              {/* Stats */}
              <div
                className="animate-fade-up grid gap-6 mt-10"
                style={{ gridTemplateColumns: 'repeat(3, auto)', animationDelay: '0.5s' }}
              >
                {[
                  { num: '2+', label: 'Applications' },
                  { num: '1K+', label: 'Businesses Served' },
                  { num: '24/7', label: 'Support' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--accent)' }}>
                      {s.num}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative animate-float-premium">
                {/* Main card */}
                <div
                  className="rounded-3xl p-8 relative"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                    width: '340px', height: '380px',
                    boxShadow: '0 32px 80px rgba(37,99,235,0.3)',
                    display: 'flex', flexDirection: 'column', gap: '1.5rem',
                  }}
                >
                  {/* Header dots */}
                  <div className="flex gap-2">
                    {['#ff5f57','#febc2e','#28c840'].map((c) => (
                      <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                    ))}
                  </div>

                  {/* App rows */}
                  {[
                    { label: 'Aasan Dairy', val: '₨ 24,500', color: '#0ea5e9', up: true },
                    { label: 'Milk Records', val: '847 L', color: '#22c55e', up: true },
                    { label: 'Transport Jobs', val: '12 Active', color: '#a855f7', up: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between"
                      style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color }} />
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
                          {row.label}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                        {row.val}
                      </span>
                    </div>
                  ))}

                  {/* Bar chart */}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem', fontFamily: 'Outfit, sans-serif' }}>
                      Monthly Revenue
                    </div>
                    <div className="flex items-end gap-2" style={{ height: '52px' }}>
                      {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1, height: `${h}%`,
                            borderRadius: '3px',
                            background: i === 5 ? '#60a5fa' : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute', top: '-16px', right: '-24px',
                    background: 'var(--card)',
                    borderRadius: '12px', padding: '0.6rem 1rem',
                    boxShadow: 'var(--shadow)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: 'var(--foreground)' }}>
                    Live & Active
                  </span>
                </div>

                {/* Bottom badge */}
                <div
                  style={{
                    position: 'absolute', bottom: '-16px', left: '-20px',
                    background: 'var(--card)',
                    borderRadius: '12px', padding: '0.6rem 1rem',
                    boxShadow: 'var(--shadow)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <span style={{ color: '#f59e0b' }}><Icon.star /></span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: 'var(--foreground)' }}>
                    5.0 on Play Store
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section style={{ background: 'var(--background)', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal>
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'var(--secondary)', minHeight: '280px' }}
              >
                <div style={{
                  position: 'absolute', right: '-20px', bottom: '-20px',
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--badge-border), transparent)',
                }} />
                {[
                  { label: 'Aasan Dairy', color: '#0ea5e9', desc: 'Dairy Management' },
                  { label: 'Aasan Transport', color: '#7c3aed', desc: 'Fleet Management' },
                ].map((app, i) => (
                  <div
                    key={app.label}
                    className="flex items-center gap-4 p-4 mb-3 rounded-2xl"
                    style={{ background: 'var(--card)', boxShadow: 'var(--shadow)' }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem' }}>
                      {app.label.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)' }}>{app.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{app.desc}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1" style={{ color: '#22c55e', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                      Active
                    </div>
                  </div>
                ))}
                <div style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                  More apps coming soon...
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="section-badge">About Us</div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                AIS Enterprises & Aasan IT
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--desc-color)', marginBottom: '1rem' }}>
                AIS Enterprises & Aasan IT develops smart digital solutions that simplify everyday business operations. We are committed to helping Pakistani businesses grow through technology.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--desc-color)', marginBottom: '1.5rem' }}>
                Our applications help businesses reduce paperwork, improve productivity, organize workflows, and adopt modern technology with ease.
              </p>
              <div className="flex flex-col gap-2">
                {['Available on Google Play Store', 'Designed for Pakistani businesses', 'Continuous updates & support'].map((item) => (
                  <div key={item} className="flex items-center gap-2" style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem' }}>
                    <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'var(--badge-bg)', color: 'var(--accent)', flexShrink: 0 }}>
                      <Icon.check />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <button className="btn-primary mt-6 btn-pulse" onClick={() => navigate('about')}>
                Learn More About Us <Icon.arrow />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--background)', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="section-badge" style={{ justifyContent: 'center' }}>Why Choose Us</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: '#0f172a', marginBottom: '1rem' }}>
              Built for Business Success
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Everything your business needs to modernize operations and stay ahead of the competition.
            </p>
          </Reveal>

          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={((i % 3) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                <div
                  className="card-hover card-hover-shine rounded-2xl p-6"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}
                  >
                    <f.icon />
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--desc-color)', lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section style={{ background: 'var(--background)', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="section-badge" style={{ justifyContent: 'center' }}>Our Applications</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: 'var(--foreground)', marginBottom: '1rem' }}>
              Featured Applications
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--desc-color)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Powerful business management tools available on the Google Play Store.
            </p>
          </Reveal>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', maxWidth: '760px', margin: '0 auto' }}>
            {apps.map((app, i) => (
              <Reveal key={app.name} delay={(i + 1) as 1 | 2}>
                <AppCard {...app} onLearnMore={() => navigate('apps')} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-8">
            <button className="btn-outline" onClick={() => navigate('apps')}>
              View All Applications <Icon.arrow />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Screenshots / App Preview */}
      <section style={{ background: 'var(--background)', padding: '5rem 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="section-badge" style={{ justifyContent: 'center' }}>App Gallery</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              See It In Action
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', fontFamily: 'Outfit, sans-serif' }}>
              Screenshots coming soon — preview our app interfaces below
            </p>
          </Reveal>

          <div className="flex gap-6 justify-center flex-wrap">
            {[
              {
                label: 'Aasan Dairy', sub: 'Dashboard', color: 'linear-gradient(160deg, #0ea5e9 0%, #0284c7 100%)',
                bars: [80, 55, 70, 90, 65, 85, 75], accent: '#bae6fd',
                rows: ['Milk Collection', 'Customer Records', 'Daily Sales'],
              },
              {
                label: 'Aasan Dairy', sub: 'Reports', color: 'linear-gradient(160deg, #0369a1 0%, #0ea5e9 100%)',
                bars: [60, 45, 80, 55, 70, 60, 90], accent: '#e0f2fe',
                rows: ['Monthly Revenue', 'Payment Status', 'Analytics'],
              },
              {
                label: 'Aasan Transport', sub: 'Dashboard', color: 'linear-gradient(160deg, #7c3aed 0%, #8b5cf6 100%)',
                bars: [50, 75, 60, 85, 45, 70, 80], accent: '#ede9fe',
                rows: ['Active Trips', 'Fleet Status', 'Driver List'],
              },
              {
                label: 'Aasan Transport', sub: 'Billing', color: 'linear-gradient(160deg, #6d28d9 0%, #7c3aed 100%)',
                bars: [70, 50, 85, 65, 90, 55, 75], accent: '#ddd6fe',
                rows: ['Invoices', 'Fuel Costs', 'Trip Expenses'],
              },
            ].map((phone, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div
                  className="card-hover"
                  style={{
                    width: '180px',
                    animation: `slide-in-right 0.6s ease ${i * 0.12}s both`,
                  }}
                >
                  {/* Phone frame */}
                  <div
                    style={{
                      width: '180px',
                      height: '340px',
                      borderRadius: '28px',
                      background: '#1e293b',
                      padding: '10px',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)',
                      position: 'relative',
                    }}
                  >
                    {/* Notch */}
                    <div style={{
                      position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                      width: '50px', height: '14px', background: '#1e293b',
                      borderRadius: '0 0 10px 10px', zIndex: 10,
                    }} />

                    {/* Screen */}
                    <div style={{
                      width: '100%', height: '100%',
                      borderRadius: '20px',
                      background: phone.color,
                      overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                    }}>
                      {/* Status bar */}
                      <div style={{ padding: '16px 14px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>9:41</span>
                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                          {[3, 4, 5].map((h) => (
                            <div key={h} style={{ width: '2px', height: `${h}px`, background: 'rgba(255,255,255,0.8)', borderRadius: '1px' }} />
                          ))}
                          <div style={{ width: '14px', height: '7px', border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: '2px', marginLeft: '2px', overflow: 'hidden' }}>
                            <div style={{ width: '70%', height: '100%', background: 'rgba(255,255,255,0.7)' }} />
                          </div>
                        </div>
                      </div>

                      {/* App header */}
                      <div style={{ padding: '4px 14px 10px' }}>
                        <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{phone.label}</div>
                        <div style={{ fontSize: '0.82rem', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>{phone.sub}</div>
                      </div>

                      {/* Mini bar chart */}
                      <div style={{ padding: '0 14px 10px', display: 'flex', alignItems: 'flex-end', gap: '3px', height: '44px' }}>
                        {phone.bars.map((h, bi) => (
                          <div
                            key={bi}
                            style={{
                              flex: 1, height: `${h}%`,
                              background: bi === 5 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.3)',
                              borderRadius: '2px',
                              transition: 'height 0.3s ease',
                            }}
                          />
                        ))}
                      </div>

                      {/* White card area */}
                      <div style={{ flex: 1, background: 'var(--background)', borderRadius: '14px 14px 0 0', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {phone.rows.map((row, ri) => (
                          <div key={ri} style={{
                            background: 'var(--card)', borderRadius: '8px', padding: '6px 8px',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            boxShadow: 'var(--shadow)',
                          }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: phone.color, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.55rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--foreground)', marginBottom: '2px' }}>{row}</div>
                              <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${40 + ri * 20}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #0ea5e9)', borderRadius: '2px' }} />
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* Coming soon label */}
                        <div style={{ marginTop: 'auto', textAlign: 'center', padding: '4px 0' }}>
                          <span style={{ fontSize: '0.5rem', color: 'var(--muted-foreground)', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.05em' }}>
                            SCREENSHOTS COMING SOON
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label below phone */}
                  <div style={{ textAlign: 'center', marginTop: '0.875rem' }}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--foreground)' }}>{phone.label}</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{phone.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0ea5e9 100%)',
          padding: '6rem 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1.25rem' }}>
              Ready to Modernize Your Business?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', maxWidth: '540px', margin: '0 auto 2.5rem' }}>
              Join hundreds of businesses already benefiting from our digital management solutions.
            </p>
            <button
              className="btn-primary"
              style={{ background: '#fff', color: '#1e3a8a', padding: '0.9rem 2.25rem', fontSize: '1rem' }}
              onClick={() => navigate('contact')}
            >
              Contact AIS Enterprises & Aasan IT <Icon.arrow />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

// ── Page: Applications ────────────────────────────────────────────
function PageApps({ setPage }: { setPage: (p: Page) => void }) {
  const navigate = (page: Page) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const apps = [
    {
      name: 'Aasan Dairy',
      tagline: 'Dairy Business Management',
      description: 'A comprehensive dairy management application designed to help dairy farm owners and milk distribution businesses manage their daily operations. Track milk collection, manage customer accounts, record sales transactions, handle payments, and generate detailed business reports — all from your smartphone.',
      features: ['Milk collection tracking', 'Customer management', 'Sales & billing', 'Business reports', 'Payment records', 'Daily summaries'],
      color: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      initial: 'AD',
      category: 'Agriculture & Farming',
    },
    {
      name: 'Aasan Transport',
      tagline: 'Fleet & Transport Management',
      description: 'A powerful transport and logistics management solution for transport business owners. Manage your entire fleet, track trips and routes, handle driver assignments, calculate fuel expenses, manage billing, and maintain complete records of your transport operations efficiently.',
      features: ['Vehicle fleet management', 'Trip & route tracking', 'Driver management', 'Fuel expense tracking', 'Billing & invoicing', 'Operations reports'],
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      initial: 'AT',
      category: 'Transport & Logistics',
    },
  ]

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section
        style={{
          padding: '4rem 0',
          background: 'var(--hero-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="section-badge" style={{ justifyContent: 'center' }}>Our Portfolio</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--foreground)', marginBottom: '1rem' }}>
            Our Applications
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--desc-color)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.75 }}>
            Innovative business management applications available on the Google Play Store. Designed for real businesses, built for real results.
          </p>
        </div>
      </section>

      {/* Apps list */}
      <section style={{ padding: '4rem 0', background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          {apps.map((app, i) => (
            <Reveal key={app.name} delay={(i + 1) as 1 | 2}>
              <div
                className="card-hover-shine rounded-3xl overflow-hidden"
                style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow)', background: 'var(--card)' }}
              >
                {/* App header */}
                <div className="p-8" style={{ background: app.color }}>
                  <div className="flex items-start gap-5">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black"
                      style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif', flexShrink: 0 }}
                    >
                      {app.initial}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#fff' }}>
                        {app.name}
                      </div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.25rem' }}>
                        {app.tagline}
                      </div>
                      <div
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                          background: 'rgba(255,255,255,0.2)',
                          color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.75rem',
                          padding: '0.3rem 0.7rem', borderRadius: '100px', marginTop: '0.6rem',
                        }}
                      >
                        {app.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* App body */}
                <div className="p-8">
                  <div className="grid gap-8" style={{ gridTemplateColumns: '1fr auto' }}>
                    <div>
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--desc-color)', marginBottom: '1.5rem' }}>
                        {app.description}
                      </p>
                      <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)', marginBottom: '0.75rem' }}>
                        Key Features
                      </h4>
                      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {app.features.map((f) => (
                          <div key={f} className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'var(--badge-bg)', color: 'var(--accent)', flexShrink: 0 }}>
                              <Icon.check />
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-start" style={{ minWidth: '140px' }}>
                      <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl" style={{ background: 'var(--background)', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{ color: '#f59e0b', display: 'flex', gap: '2px' }}>
                          {[1,2,3,4,5].map((s) => <Icon.star key={s} />)}
                        </div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'var(--foreground)' }}>
                          5.0 Rating
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Google Play Store</div>
                      </div>
                      <a
                        href="#"
                        className="btn-primary btn-pulse"
                        style={{ justifyContent: 'center', fontSize: '0.85rem', textDecoration: 'none' }}
                      >
                        <Icon.playstore /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Coming soon card */}
          <Reveal delay={3}>
            <div
              className="rounded-3xl p-8 text-center"
              style={{
                border: '2px dashed var(--border)',
                background: 'var(--secondary)',
              }}
            >
              <div
                style={{
                  width: '64px', height: '64px', borderRadius: '18px',
                  background: 'var(--badge-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.75rem',
                  color: 'var(--accent)',
                }}
              >
                +
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                More Apps Coming Soon
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--desc-color)', marginBottom: '1.25rem' }}>
                We are continuously developing new applications to help more businesses modernize their operations.
              </p>
              <button className="btn-outline" onClick={() => navigate('contact')}>
                Suggest an App <Icon.arrow />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

// ── Page: About ───────────────────────────────────────────────────
function PageAbout() {
  const values = [
    { icon: Icon.lightbulb, title: 'Innovation', desc: 'We constantly push boundaries to create solutions that transform how businesses operate.' },
    { icon: Icon.smile, title: 'Simplicity', desc: 'We believe powerful tools should be easy to use by anyone, regardless of technical background.' },
    { icon: Icon.shield, title: 'Reliability', desc: 'Our applications are built to be dependable, secure, and available when you need them most.' },
    { icon: Icon.users, title: 'Customer Success', desc: 'Every decision we make is driven by the success and growth of our customers.' },
    { icon: Icon.trending, title: 'Growth', desc: 'We help businesses scale efficiently with tools that grow alongside their needs.' },
    { icon: Icon.award, title: 'Quality', desc: 'We hold ourselves to the highest standards in design, development, and user experience.' },
  ]

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section
        style={{
          padding: '4rem 0',
          background: 'var(--hero-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="section-badge" style={{ justifyContent: 'center' }}>Who We Are</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--foreground)', marginBottom: '1rem' }}>
            About AIS Enterprises & Aasan IT
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--desc-color)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            A passionate team dedicated to building digital tools that empower Pakistani businesses to thrive in the modern economy.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '5rem 0', background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-12 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal>
              <div className="section-badge">Our Story</div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--foreground)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                A Vision to Transform Business in Pakistan
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--desc-color)', marginBottom: '1rem' }}>
                AIS Enterprises & Aasan IT was founded with a clear vision: to bring the power of modern technology to Pakistani businesses of all sizes. We saw businesses struggling with paperwork, manual record-keeping, and inefficient workflows.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--desc-color)' }}>
                We set out to change that by developing simple, powerful, and affordable mobile applications available directly on the Google Play Store — tools that any business owner can use from the comfort of their smartphone.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="rounded-3xl p-8" style={{ background: 'var(--secondary)' }}>
                {[
                  { icon: Icon.target, label: 'Founded with Purpose', desc: 'Built to solve real business problems in Pakistan' },
                  { icon: Icon.zap, label: 'Mobile-First Approach', desc: 'Apps designed for the smartphone era' },
                  { icon: Icon.trending, label: 'Growing Portfolio', desc: 'Continuously expanding our app collection' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--card)', color: 'var(--accent)', boxShadow: 'var(--shadow)' }}>
                      <item.icon />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--desc-color)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 0', background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: '#fff' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Icon.target />
                </div>
                <div className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'flex-start' }}>
                  Our Mission
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1rem', marginTop: '0.75rem' }}>
                  Simplify Business Operations
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                  Help businesses simplify operations through innovative technology. We are committed to reducing paperwork, saving time, and making modern digital tools accessible to every business owner in Pakistan.
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}>
                  <Icon.eye />
                </div>
                <div className="section-badge">Our Vision</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem', marginTop: '0.75rem' }}>
                  Empower Every Business
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--desc-color)' }}>
                  Become a trusted provider of digital business solutions that empower businesses of all sizes. We envision a future where every Pakistani business operates efficiently through smart, accessible digital tools.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '5rem 0', background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="section-badge" style={{ justifyContent: 'center' }}>What We Stand For</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: 'var(--foreground)', marginBottom: '1rem' }}>
              Our Core Values
            </h2>
          </Reveal>

          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="card-hover card-hover-shine rounded-2xl p-6"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff' }}>
                    <v.icon />
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--desc-color)', lineHeight: 1.65 }}>
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Page: Contact ─────────────────────────────────────────────────
function PageContact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid var(--border)',
    borderRadius: '10px',
    fontSize: '0.9rem',
    color: 'var(--foreground)',
    background: 'var(--input-bg)',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--foreground)',
    marginBottom: '0.4rem',
  }

  const contactItems = [
    { icon: Icon.phone, label: 'Phone Number', value: '+92 348 7707139', href: 'tel:+923487707139' },
    { icon: Icon.mail, label: 'Email Address', value: 'zshansiddiqui33@gmail.com', href: 'mailto:zshansiddiqui33@gmail.com' },
    { icon: Icon.instagram, label: 'Instagram', value: '@aisenterprises_aasanit', href: 'https://www.instagram.com/aisenterprises_aasanit?igsh=MWV2aWIwajljNmczMw==' },
    { icon: Icon.location, label: 'Location', value: 'Pakistan', href: '#' },
  ]

  return (
    <div style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <section
        style={{
          padding: '4rem 0',
          background: 'var(--hero-bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="section-badge" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--foreground)', marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--desc-color)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
            Have a question or want to learn more about our applications? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section style={{ padding: '5rem 0', background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 items-start" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
            {/* Info panel */}
            <div>
              <Reveal>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: 'var(--foreground)', marginBottom: '0.75rem' }}>
                  We're Here to Help
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--desc-color)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Reach out through any of the channels below. Our team typically responds within 24 hours.
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  {contactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="flex items-center gap-4 p-4 rounded-2xl card-hover card-hover-shine"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
                      >
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}>
                          <item.icon />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {item.label}
                          </div>
                          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>
                            {item.value}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* Map placeholder */}
              <Reveal delay={2}>
                <div
                  className="rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3"
                  style={{
                    background: 'var(--secondary)',
                    border: '1px solid var(--border)',
                    height: '200px',
                  }}
                >
                  <div style={{ color: 'var(--accent)' }}><Icon.map /></div>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>
                    Pakistan
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--desc-color)' }}>
                    Serving businesses across Pakistan
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={2}>
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}
                    >
                      <Icon.check />
                    </div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: 'var(--desc-color)', fontSize: '0.9rem' }}>
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--foreground)', marginBottom: '1.75rem' }}>
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div>
                          <label style={labelStyle}>Full Name *</label>
                          <input
                            style={inputStyle}
                            placeholder="Muhammad Ali"
                            value={form.name}
                            required
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--card)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--input-bg)' }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address *</label>
                          <input
                            style={inputStyle}
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--card)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--input-bg)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Phone Number</label>
                        <input
                          style={inputStyle}
                          type="tel"
                          placeholder="0300-0000000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--card)' }}
                          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--input-bg)' }}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Subject *</label>
                        <input
                          style={inputStyle}
                          placeholder="What can we help you with?"
                          value={form.subject}
                          required
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--card)' }}
                          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--input-bg)' }}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Message *</label>
                        <textarea
                          style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                          placeholder="Tell us more about your inquiry..."
                          value={form.message}
                          required
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'var(--card)' }}
                          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--input-bg)' }}
                        />
                      </div>

                      <button type="submit" className="btn-primary btn-pulse" style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}>
                        Send Message <Icon.send />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)', color: 'var(--foreground)' }}>
      <Nav current={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />

      <main style={{ flex: 1 }}>
        <div key={page} className="tab-pane">
          {page === 'home' && <PageHome setPage={setPage} />}
          {page === 'apps' && <PageApps setPage={setPage} />}
          {page === 'about' && <PageAbout />}
          {page === 'contact' && <PageContact />}
        </div>
      </main>

      <Footer setPage={setPage} />
    </div>
  )
}
