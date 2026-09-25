import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Icon, Reveal } from './ui'
import type { Page } from './App'

// ── Config ────────────────────────────────────────────────────────
// Deletion requests are delivered by FormSubmit (https://formsubmit.co), a free
// form-to-email relay, so no backend is needed. The first request sent to a new
// inbox triggers a one-time activation email that must be confirmed.
const DELETION_INBOX = 'zshansiddiqui33@gmail.com'
const PRIVACY_EMAIL = 'privacy@aasanit.com'
const POLICY_EFFECTIVE = '24 September 2026'
const POLICY_VERSION = 'v1.0'
const PACKAGE_ID = 'com.aasanit.asandairy'

type SetPage = { setPage: (p: Page) => void }

const h = { fontFamily: 'Outfit, sans-serif' } as const

// ── Shared building blocks ───────────────────────────────────────
function LegalHero({
  badge,
  badgeIcon,
  title,
  accent,
  subtitle,
  meta,
  tone = 'accent',
}: {
  badge: string
  badgeIcon: ReactNode
  title: string
  accent: string
  subtitle: string
  meta: { label: string; value: string }[]
  tone?: 'accent' | 'danger'
}) {
  return (
    <section className="hero-grid relative overflow-hidden" style={{ background: 'var(--hero-bg)', borderBottom: '1px solid var(--border)' }}>
      {/* Soft glow orbs */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none animate-float-premium"
        style={{
          width: 420, height: 420, top: -180, right: -120, filter: 'blur(60px)',
          background: tone === 'danger' ? 'var(--danger-glow)' : 'rgba(37,99,235,0.14)',
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{ width: 320, height: 320, bottom: -200, left: -100, filter: 'blur(60px)', background: 'rgba(6,182,212,0.10)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14 sm:pt-20 sm:pb-16 text-center">
        <div
          className="section-badge icon-sm animate-fade-up"
          style={tone === 'danger' ? { background: 'var(--danger-bg)', borderColor: 'var(--danger-border)', color: 'var(--danger)' } : undefined}
        >
          {badgeIcon}
          {badge}
        </div>
        <h1
          className="animate-fade-up"
          style={{ ...h, fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.08, color: 'var(--foreground)', margin: '0 auto 1.1rem', maxWidth: 820 }}
        >
          {title} <span className="animate-gradient-shift">{accent}</span>
        </h1>
        <p
          className="animate-fade-up"
          style={{ fontSize: '1.05rem', color: 'var(--desc-color)', maxWidth: 640, margin: '0 auto', lineHeight: 1.75 }}
        >
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 animate-fade-up">
          {meta.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-full"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
            >
              <span style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>{m.label}</span>
              <span style={{ ...h, color: 'var(--foreground)', fontWeight: 600 }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IconBubble({ children, tone = 'accent', size = 44 }: { children: ReactNode; tone?: 'accent' | 'danger' | 'success'; size?: number }) {
  const map = {
    accent: { bg: 'var(--badge-bg)', fg: 'var(--accent)' },
    danger: { bg: 'var(--danger-bg)', fg: 'var(--danger)' },
    success: { bg: 'var(--success-bg)', fg: 'var(--success)' },
  }[tone]
  return (
    <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, background: map.bg, color: map.fg }}>
      {children}
    </div>
  )
}

// ── Toast notification ───────────────────────────────────────────
type ToastData = { id: number; tone: 'success' | 'error'; title: string; message: string }

function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 7000)
    return () => clearTimeout(t)
  }, [toast, onClose])

  if (!toast) return null
  const success = toast.tone === 'success'
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div key={toast.id} className="toast" style={{ borderColor: success ? 'var(--success-border)' : 'var(--danger-border)' }}>
        <IconBubble tone={success ? 'success' : 'danger'} size={40}>
          {success ? <Icon.check /> : <Icon.alert />}
        </IconBubble>
        <div className="flex-1 min-w-0">
          <div style={{ ...h, fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)' }}>{toast.title}</div>
          <div style={{ fontSize: '0.84rem', color: 'var(--desc-color)', lineHeight: 1.55, marginTop: 2 }}>{toast.message}</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}
        >
          <Icon.close />
        </button>
        <div className="toast-progress" style={{ background: success ? 'var(--success)' : 'var(--danger)' }} />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// PRIVACY POLICY
// ══════════════════════════════════════════════════════════════════

function KeyValueGrid({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-5">
      {rows.map(([k, v]) => (
        <div key={k} className="rounded-xl" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', padding: '0.85rem 1rem' }}>
          <div style={{ ...h, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>{k}</div>
          <div style={{ ...h, fontSize: '0.98rem', fontWeight: 600, color: 'var(--foreground)', marginTop: 2, wordBreak: 'break-word' }}>{v}</div>
        </div>
      ))}
    </div>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3 mt-4" style={{ listStyle: 'none', padding: 0 }}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--desc-color)' }}>
          <span className="icon-xs flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 22, height: 22, marginTop: 3, background: 'var(--badge-bg)', color: 'var(--accent)' }}>
            <Icon.check />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Strong({ children }: { children: ReactNode }) {
  return <strong style={{ color: 'var(--foreground)', fontWeight: 600 }}>{children}</strong>
}

function Callout({ children, tone = 'accent', icon }: { children: ReactNode; tone?: 'accent' | 'danger'; icon?: ReactNode }) {
  return (
    <div
      className="flex gap-3 rounded-2xl mt-5"
      style={{
        padding: '1rem 1.1rem',
        background: tone === 'danger' ? 'var(--danger-bg)' : 'var(--badge-bg)',
        border: `1px solid ${tone === 'danger' ? 'var(--danger-border)' : 'var(--badge-border)'}`,
      }}
    >
      <span style={{ color: tone === 'danger' ? 'var(--danger)' : 'var(--accent)', flexShrink: 0, marginTop: 2 }}>{icon ?? <Icon.info />}</span>
      <div style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--secondary-foreground)' }}>{children}</div>
    </div>
  )
}

const p: CSSProperties = { fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--desc-color)', marginTop: '0.9rem' }
const linkStyle: CSSProperties = { color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid var(--badge-border)' }

type PolicySection = { id: string; title: string; body: ReactNode }

function usePolicySections(goDelete: (e: React.MouseEvent) => void): PolicySection[] {
  const deleteLink = (
    <a href="/delete-account" onClick={goDelete} style={linkStyle}>
      account deletion request form
    </a>
  )
  return [
    {
      id: 'overview',
      title: 'Overview',
      body: (
        <>
          <p style={p}>
            This policy covers the <Strong>Asan Dairy</Strong> Android app (package <code className="code-chip">{PACKAGE_ID}</code>) published by Aasan IT, and the
            aasanit.com website where this policy is hosted. It applies whether you use the app's <Strong>Collection Point</Strong> module (milk suppliers and customers on a
            weekly ledger) or its <Strong>Milk Shop</Strong> module (day-to-day purchase and sale tracking).
          </p>
          <p style={p}>
            Asan Dairy is a business tool: most of what it stores is bookkeeping data you type in yourself — supplier names, customer entries, rates, payments. This policy is
            written around that fact, section by section.
          </p>
        </>
      ),
    },
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: (
        <>
          <p style={p}>
            Asan Dairy is developed and operated by Aasan IT. We are the <Strong>"data controller"</Strong> for your account information, and we act as a <Strong>data processor</Strong> for
            the business records you choose to store in the app on behalf of your suppliers and customers (see §04).
          </p>
          <KeyValueGrid
            rows={[
              ['Company', 'Aasan IT'],
              ['Website', 'aasanit.com'],
              ['App', 'Asan Dairy'],
              ['Package', <code className="code-chip">{PACKAGE_ID}</code>],
            ]}
          />
        </>
      ),
    },
    {
      id: 'account-information',
      title: 'Account information',
      body: (
        <>
          <p style={p}>Creating an account for the Collection Point module requires:</p>
          <Bullets
            items={[
              <>
                <Strong>Email address and/or phone number</Strong> — used to sign you in and to send a one-time verification code (OTP).
              </>,
              <>
                <Strong>Password</Strong> — stored as a salted hash by our authentication provider; we never see or store it in plain text.
              </>,
            ]}
          />
          <Callout icon={<Icon.smartphone />}>
            The <Strong>Milk Shop</Strong> module does not require an account — its data stays on your device only (see §05).
          </Callout>
        </>
      ),
    },
    {
      id: 'business-records',
      title: 'Business records you enter',
      body: (
        <>
          <p style={p}>To run your ledger, the app stores the records you create about your own suppliers, customers, and transactions:</p>
          <Bullets
            items={[
              <>
                <Strong>Supplier details</Strong> — name, CNIC number, contact number, milk category, rate and payment schedule.
              </>,
              <>
                <Strong>Customer details</Strong> — name, location, contact number, milk category, rate and payment schedule.
              </>,
              <>
                <Strong>Ledger activity</Strong> — milk/product entries, payments, loans, expenses, opening cash, and inventory adjustments.
              </>,
            ]}
          />
          <Callout icon={<Icon.alert />}>
            <Strong>You are responsible for this data.</Strong> Your suppliers and customers are not Aasan IT's users — they're yours. By entering their details you confirm you're
            entitled to record them (for example, because they're your business contacts) and to handle information like a CNIC number responsibly. Aasan IT stores and processes
            these records on your behalf as instructed by the app; we don't use them for any purpose of our own.
          </Callout>
        </>
      ),
    },
    {
      id: 'where-data-lives',
      title: 'Where your data lives',
      body: (
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {[
            {
              icon: <Icon.smartphone />,
              title: 'On your device',
              tag: 'Milk Shop',
              chip: 'Never leaves your phone',
              text: 'All Milk Shop data — products, purchases, sales, expenses, payments, cycle closes — is stored only in the app\'s local storage on your phone. It is never sent to our servers. Uninstalling the app or clearing its storage deletes it permanently.',
            },
            {
              icon: <Icon.cloud />,
              title: 'In the cloud',
              tag: 'Collection Point',
              chip: 'Encrypted · HTTPS/TLS',
              text: 'Collection Point data is synced to a database hosted by our infrastructure provider, Supabase, so it\'s available if you reinstall the app or sign in on another device. Every record is tied to your account and transmitted over an encrypted (HTTPS/TLS) connection. Supabase acts strictly as our sub-processor and does not use your data for its own purposes.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl card-hover card-hover-shine" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', padding: '1.35rem' }}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <IconBubble>{c.icon}</IconBubble>
                <span className="rounded-full" style={{ ...h, fontSize: '0.72rem', fontWeight: 600, padding: '0.25rem 0.7rem', background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
                  {c.tag}
                </span>
              </div>
              <h3 style={{ ...h, fontWeight: 700, fontSize: '1.1rem', color: 'var(--foreground)' }}>{c.title}</h3>
              <div className="icon-sm inline-flex items-center gap-1.5 mt-1.5" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--success)' }}>
                <Icon.lock /> {c.chip}
              </div>
              <p style={{ ...p, fontSize: '0.9rem', marginTop: '0.7rem' }}>{c.text}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'photos-storage',
      title: 'Photos, receipts & storage',
      body: (
        <>
          <p style={p}>
            The app can generate a ledger receipt (as an image or PDF) and save it to your device so you can share it. This requires storage / media permissions on Android:
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['WRITE_EXTERNAL_STORAGE', 'READ_EXTERNAL_STORAGE', 'READ_MEDIA_IMAGES'].map((perm) => (
              <code key={perm} className="code-chip" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                {perm}
              </code>
            ))}
          </div>
          <p style={p}>
            These permissions are used to write a receipt file into your gallery or Downloads folder. <Strong>The app does not browse, read, or upload your existing photos.</Strong>
          </p>
        </>
      ),
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions & payments',
      body: (
        <>
          <p style={p}>
            <Strong>Asan Dairy Pro</Strong> is sold as a subscription through Google Play Billing. Purchases are processed by Google, and subscription status is managed through
            RevenueCat, our billing infrastructure provider. RevenueCat receives a device/purchaser identifier and your subscription/entitlement status so the app knows what
            you've unlocked.
          </p>
          <Callout icon={<Icon.card />}>
            Aasan IT <Strong>never receives or stores</Strong> your card number, bank details, or other payment credentials — those stay with Google Play.
          </Callout>
        </>
      ),
    },
    {
      id: 'what-we-dont-do',
      title: "What we don't do",
      body: (
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          {[
            { t: 'No advertising', d: 'No ads, and no ad networks embedded in the app.' },
            { t: 'No tracking', d: 'No third-party analytics or tracking SDKs.' },
            { t: 'Never sold', d: "We never sell your data, or your suppliers' and customers' data, to anyone." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl card-hover" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', padding: '1.2rem' }}>
              <IconBubble tone="danger" size={40}>
                <Icon.ban />
              </IconBubble>
              <div style={{ ...h, fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)', marginTop: '0.85rem' }}>{x.t}</div>
              <div style={{ fontSize: '0.87rem', lineHeight: 1.6, color: 'var(--desc-color)', marginTop: 4 }}>{x.d}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'sharing',
      title: 'Sharing your data',
      body: (
        <>
          <p style={p}>We share data only with the service providers who help us run the app, and only what each one needs to do its job:</p>
          <div className="rounded-2xl overflow-hidden mt-5" style={{ border: '1px solid var(--border)' }}>
            {[
              { name: 'Supabase', icon: <Icon.database />, role: 'Cloud database & account authentication (Collection Point data, login/OTP)' },
              { name: 'Google Play / RevenueCat', icon: <Icon.card />, role: 'Subscription purchases and entitlement status' },
            ].map((row, i) => (
              <div
                key={row.name}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
                style={{ padding: '1rem 1.15rem', background: i % 2 ? 'var(--card)' : 'var(--secondary)', borderTop: i ? '1px solid var(--border)' : 'none' }}
              >
                <div className="flex items-center gap-3 sm:w-64 flex-shrink-0">
                  <IconBubble size={38}>{row.icon}</IconBubble>
                  <span style={{ ...h, fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)' }}>{row.name}</span>
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--desc-color)', lineHeight: 1.6 }}>{row.role}</span>
              </div>
            ))}
          </div>
          <p style={p}>We may also disclose information if required by law, or to protect the rights, safety, or property of Aasan IT or our users.</p>
        </>
      ),
    },
    {
      id: 'retention-deletion',
      title: 'Retention & deletion',
      body: (
        <>
          <p style={p}>
            <Strong>Milk Shop</Strong> data is retained until you delete it in-app or uninstall the app. <Strong>Collection Point</Strong> (cloud) data is retained while your account
            is active. To close your account and delete your cloud data, contact us at the email in §15 or use our {deleteLink} — we'll process the request within a reasonable
            time and confirm once it's done.
          </p>
          <a href="/delete-account" onClick={goDelete} className="btn-outline mt-5" style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem' }}>
            <Icon.trash /> Request account deletion
          </a>
        </>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: (
        <>
          <p style={p}>Wherever you're based, you can ask us to:</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-5">
            {[
              { icon: <Icon.eye />, t: 'Access', d: 'A copy of the account data we hold about you.' },
              { icon: <Icon.edit />, t: 'Correct', d: 'Inaccurate account information.' },
              { icon: <Icon.trash />, t: 'Delete', d: 'Your account and associated cloud data.' },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl card-hover card-hover-shine" style={{ background: 'var(--secondary)', border: '1px solid var(--border)', padding: '1.2rem' }}>
                <IconBubble size={40}>{x.icon}</IconBubble>
                <div style={{ ...h, fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)', marginTop: '0.85rem' }}>{x.t}</div>
                <div style={{ fontSize: '0.87rem', lineHeight: 1.6, color: 'var(--desc-color)', marginTop: 4 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <p style={p}>Send requests to the contact email in §15. We may ask you to verify your identity first.</p>
        </>
      ),
    },
    {
      id: 'childrens-privacy',
      title: "Children's privacy",
      body: (
        <p style={p}>
          Asan Dairy is a business tool for dairy collection points and milk shops, and isn't directed at children. We don't knowingly collect information from anyone under 13.
          If you believe a child has provided us data, contact us and we'll remove it.
        </p>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      body: (
        <>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Encrypted connections', 'Hashed passwords', 'Access-controlled infrastructure'].map((s) => (
              <span key={s} className="icon-sm inline-flex items-center gap-1.5 rounded-full" style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0.35rem 0.8rem', background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
                <Icon.check /> {s}
              </span>
            ))}
          </div>
          <p style={p}>
            We use industry-standard safeguards — encrypted connections, hashed passwords, and access-controlled infrastructure — to protect your data. No method of transmission or
            storage is perfectly secure, so while we work hard to protect your information, we can't guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <p style={p}>
          We may update this policy as the app changes. Material changes will be reflected by a new effective date at the top of this page; continued use of the app after an
          update means you accept the revised policy.
        </p>
      ),
    },
    {
      id: 'contact-us',
      title: 'Contact us',
      body: (
        <>
          <p style={p}>Questions about this policy or your data:</p>
          <KeyValueGrid
            rows={[
              ['Company', 'Aasan IT'],
              ['Email', <a href={`mailto:${PRIVACY_EMAIL}`} style={linkStyle}>{PRIVACY_EMAIL}</a>],
              ['Website', <a href="https://www.aasanit.com" style={linkStyle}>www.aasanit.com</a>],
              ['App', 'Asan Dairy'],
            ]}
          />
        </>
      ),
    },
  ]
}

export function PagePrivacy({ setPage }: SetPage) {
  const goDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    setPage('delete-account')
  }
  const sections = usePolicySections(goDelete)
  const [active, setActive] = useState(sections[0].id)
  const [tocOpen, setTocOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -65% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reading progress bar.
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight * 0.6
      setProgress(Math.min(1, Math.max(0, (-rect.top + 90) / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Honour a #section hash on first load (e.g. /privacy-policy#retention-deletion).
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 450)
    return () => clearTimeout(t)
  }, [])

  const jump = (id: string) => {
    setTocOpen(false)
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(window.history.state, '', `#${id}`)
  }

  const num = (i: number) => String(i + 1).padStart(2, '0')

  const tocList = (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0 }} className="flex flex-col gap-0.5">
      {sections.map((s, i) => {
        const on = active === s.id
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); jump(s.id) }}
              className="toc-link flex items-center gap-3 rounded-lg"
              data-active={on}
              style={{ padding: '0.45rem 0.7rem', textDecoration: 'none', fontSize: '0.86rem' }}
            >
              <span style={{ ...h, fontWeight: 700, fontSize: '0.72rem', minWidth: 20, color: on ? 'var(--accent)' : 'var(--muted-foreground)' }}>{num(i)}</span>
              <span style={{ fontWeight: on ? 600 : 500 }}>{s.title}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div style={{ paddingTop: '4rem' }}>
      {/* Reading progress */}
      <div className="fixed left-0 right-0 z-40" style={{ top: '4rem', height: 3, background: 'transparent' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, #1e3a8a, #2563eb, #06b6d4)', transition: 'width 0.1s linear' }} />
      </div>

      <LegalHero
        badge="Privacy Policy"
        badgeIcon={<Icon.shield />}
        title="Your data,"
        accent="handled with care"
        subtitle="Asan Dairy is a bookkeeping app for dairy collection points and milk shops, built by Aasan IT. This policy explains what data the app collects, where it's kept, and the choices you have."
        meta={[
          { label: 'Effective', value: POLICY_EFFECTIVE },
          { label: 'Version', value: POLICY_VERSION },
          { label: 'App', value: 'Asan Dairy · Android' },
        ]}
      />

      {/* At a glance */}
      <section className="max-w-6xl mx-auto px-6" style={{ marginTop: '-2rem', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-3xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1rem' }}>
            {[
              { icon: <Icon.ban />, t: 'No ads', d: 'No ad networks' },
              { icon: <Icon.eye />, t: 'No tracking', d: 'No analytics SDKs' },
              { icon: <Icon.heart />, t: 'Never sold', d: 'Your data stays yours' },
              { icon: <Icon.smartphone />, t: 'On-device', d: 'Milk Shop data stays local' },
            ].map((g) => (
              <div key={g.t} className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 rounded-2xl" style={{ padding: '0.75rem' }}>
                <IconBubble size={42}>{g.icon}</IconBubble>
                <div className="min-w-0">
                  <div style={{ ...h, fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)' }}>{g.t}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{g.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ padding: '3.5rem 0 5rem' }}>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Sidebar TOC (desktop) */}
          <aside className="hidden lg:block sticky" style={{ top: '6rem' }}>
            <div className="rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.1rem 0.6rem' }}>
              <div className="flex items-center justify-between" style={{ padding: '0 0.7rem 0.7rem' }}>
                <span style={{ ...h, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>On this page</span>
                <span style={{ ...h, fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent)' }}>{Math.round(progress * 100)}%</span>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 16rem)', overflowY: 'auto' }}>{tocList}</div>
            </div>
            <a
              href="/delete-account"
              onClick={goDelete}
              className="flex items-center gap-3 rounded-2xl mt-4 card-hover"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '0.9rem 1rem', textDecoration: 'none' }}
            >
              <IconBubble tone="danger" size={36}>
                <Icon.trash />
              </IconBubble>
              <div>
                <div style={{ ...h, fontWeight: 700, fontSize: '0.88rem', color: 'var(--foreground)' }}>Delete my account</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Submit a deletion request</div>
              </div>
            </a>
          </aside>

          <div ref={articleRef} className="min-w-0">
            {/* TOC (mobile / tablet) */}
            <div className="lg:hidden rounded-2xl mb-6" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
              <button
                onClick={() => setTocOpen((o) => !o)}
                aria-expanded={tocOpen}
                className="w-full flex items-center justify-between"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 1.1rem', color: 'var(--foreground)' }}
              >
                <span style={{ ...h, fontWeight: 700, fontSize: '0.95rem' }}>On this page · {sections.length} sections</span>
                <span style={{ transform: tocOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', color: 'var(--accent)' }}>
                  <Icon.chevronDown />
                </span>
              </button>
              <div style={{ maxHeight: tocOpen ? 800 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                <div style={{ padding: '0 0.5rem 0.8rem' }}>{tocList}</div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {sections.map((s, i) => (
                <Reveal key={s.id}>
                  <article
                    id={s.id}
                    className="rounded-3xl policy-section"
                    style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: 'clamp(1.35rem, 3vw, 2rem)', scrollMarginTop: '6rem' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg" style={{ ...h, fontWeight: 700, fontSize: '0.78rem', color: 'var(--accent)', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', padding: '0.25rem 0.55rem' }}>
                        §{num(i)}
                      </span>
                      <h2 style={{ ...h, fontWeight: 800, fontSize: 'clamp(1.25rem, 2.4vw, 1.55rem)', color: 'var(--foreground)', lineHeight: 1.25 }}>{s.title}</h2>
                    </div>
                    {s.body}
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Closing card */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl mt-8" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0891b2 100%)', padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                <div aria-hidden className="absolute rounded-full" style={{ width: 260, height: 260, right: -80, top: -120, background: 'rgba(255,255,255,0.08)' }} />
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 style={{ ...h, fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>Questions about your data?</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginTop: 6, lineHeight: 1.6 }}>
                      Write to us at {PRIVACY_EMAIL}. We usually reply within a few working days.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${PRIVACY_EMAIL}`}
                      className="inline-flex items-center gap-2 rounded-lg"
                      style={{ ...h, fontWeight: 600, fontSize: '0.92rem', padding: '0.75rem 1.4rem', background: '#fff', color: '#1e3a8a', textDecoration: 'none' }}
                    >
                      <Icon.mail /> Email us
                    </a>
                    <a
                      href="/delete-account"
                      onClick={goDelete}
                      className="inline-flex items-center gap-2 rounded-lg"
                      style={{ ...h, fontWeight: 600, fontSize: '0.92rem', padding: '0.75rem 1.4rem', background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}
                    >
                      <Icon.trash /> Delete account
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8" style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
              <span>
                © 2026 Aasan IT. All rights reserved. · Asan Dairy — <code className="code-chip">{PACKAGE_ID}</code>
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem' }}
              >
                <Icon.arrowUp /> Back to top
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// DELETE ACCOUNT REQUEST
// ══════════════════════════════════════════════════════════════════

const REASONS = [
  'I no longer use the app',
  'Privacy concerns',
  'Switching to another app',
  'Subscription cost',
  'Technical problems',
  'Created a duplicate account',
  'Other',
]

const EMPTY_FORM = { app: 'Asan Dairy', email: '', phone: '', reason: '', details: '', confirm: false, honey: '' }

export function PageDeleteAccount({ setPage }: SetPage) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<ToastData | null>(null)
  const [receipt, setReceipt] = useState<{ ref: string; email: string } | null>(null)

  const goPrivacy = (e: React.MouseEvent) => {
    e.preventDefault()
    setPage('privacy')
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!form.reason) errs.reason = 'Please choose a reason.'
    if (form.reason === 'Other' && form.details.trim().length < 5) errs.details = 'Please tell us a little more.'
    if (!form.confirm) errs.confirm = 'Please confirm you understand deletion is permanent.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending' || !validate()) return
    if (form.honey) return // bot trap

    setStatus('sending')
    const ref = `DEL-${Date.now().toString(36).toUpperCase().slice(-6)}`
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${DELETION_INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Account deletion request ${ref} — ${form.app}`,
          _template: 'table',
          _captcha: 'false',
          'Request ID': ref,
          App: form.app,
          email: form.email.trim(),
          'Registered phone': form.phone.trim() || '—',
          Reason: form.reason,
          Details: form.details.trim() || '—',
          'Submitted at': new Date().toLocaleString('en-GB', { timeZone: 'Asia/Karachi' }) + ' PKT',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) === 'false') throw new Error(data.message || 'Request failed')

      setReceipt({ ref, email: form.email.trim() })
      setStatus('done')
      setForm(EMPTY_FORM)
      setToast({
        id: Date.now(),
        tone: 'success',
        title: 'Deletion request submitted',
        message: `We've received your request (${ref}). We'll confirm by email once your account is deleted.`,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('idle')
      setToast({
        id: Date.now(),
        tone: 'error',
        title: "We couldn't send your request",
        message: `Please check your connection and try again, or email ${PRIVACY_EMAIL} directly.`,
      })
    }
  }

  const field = (name: string): CSSProperties => ({
    width: '100%',
    padding: '0.8rem 1rem',
    border: `1.5px solid ${errors[name] ? 'var(--danger)' : 'var(--border)'}`,
    borderRadius: 12,
    fontSize: '0.92rem',
    color: 'var(--foreground)',
    background: 'var(--input-bg)',
    outline: 'none',
    transition: 'all 0.2s',
  })
  const label: CSSProperties = { display: 'block', ...h, fontWeight: 600, fontSize: '0.875rem', color: 'var(--foreground)', marginBottom: '0.45rem' }
  const errText = (name: string) =>
    errors[name] ? (
      <div className="icon-sm flex items-center gap-1.5 mt-1.5" style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>
        <Icon.alert /> {errors[name]}
      </div>
    ) : null
  const set = (patch: Partial<typeof EMPTY_FORM>) => {
    setForm((f) => ({ ...f, ...patch }))
    const keys = Object.keys(patch)
    if (keys.some((k) => errors[k])) setErrors((er) => Object.fromEntries(Object.entries(er).filter(([k]) => !keys.includes(k))))
  }

  return (
    <div style={{ paddingTop: '4rem' }}>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <LegalHero
        tone="danger"
        badge="Account & Data"
        badgeIcon={<Icon.trash />}
        title="Delete your"
        accent="Asan Dairy account"
        subtitle="Request permanent deletion of your Asan Dairy account and the cloud data linked to it. Fill in the form below and our team will process your request."
        meta={[
          { label: 'App', value: 'Asan Dairy' },
          { label: 'Developer', value: 'Aasan IT' },
          { label: 'Confirmation', value: 'By email' },
        ]}
      />

      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.15fr] gap-8 items-start">
          {/* ── Info column ── */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <Reveal>
              <div className="rounded-3xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.6rem' }}>
                <div className="flex items-center gap-3 mb-4">
                  <IconBubble tone="danger">
                    <Icon.trash />
                  </IconBubble>
                  <h2 style={{ ...h, fontWeight: 800, fontSize: '1.2rem', color: 'var(--foreground)' }}>What will be deleted</h2>
                </div>
                <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    ['Your account', 'Sign-in email / phone number and password.'],
                    ['Collection Point cloud data', 'Suppliers, customers, milk entries, payments, loans, expenses and inventory records stored in the cloud.'],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3">
                      <span className="icon-xs flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 22, height: 22, marginTop: 2, background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                        <Icon.close />
                      </span>
                      <div>
                        <div style={{ ...h, fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>{t}</div>
                        <div style={{ fontSize: '0.87rem', color: 'var(--desc-color)', lineHeight: 1.6 }}>{d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="rounded-3xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.6rem' }}>
                <div className="flex items-center gap-3 mb-4">
                  <IconBubble>
                    <Icon.info />
                  </IconBubble>
                  <h2 style={{ ...h, fontWeight: 800, fontSize: '1.2rem', color: 'var(--foreground)' }}>Good to know</h2>
                </div>
                <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    [<Icon.smartphone />, 'Milk Shop data is on your phone', 'It is never stored on our servers. To remove it, clear the app storage or uninstall Asan Dairy.'],
                    [<Icon.card />, 'Cancel your subscription separately', 'Deleting your account does not cancel Asan Dairy Pro. Cancel it in Google Play › Payments & subscriptions.'],
                    [<Icon.alert />, 'Deletion is permanent', 'Deleted cloud records cannot be recovered. Export any receipts you need first.'],
                  ].map(([ic, t, d], i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>{ic}</span>
                      <div>
                        <div style={{ ...h, fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>{t}</div>
                        <div style={{ fontSize: '0.87rem', color: 'var(--desc-color)', lineHeight: 1.6 }}>{d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="rounded-3xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.6rem' }}>
                <h2 style={{ ...h, fontWeight: 800, fontSize: '1.2rem', color: 'var(--foreground)', marginBottom: '1.1rem' }}>How it works</h2>
                <ol className="relative flex flex-col gap-5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <span aria-hidden className="absolute" style={{ left: 15, top: 8, bottom: 8, width: 2, background: 'linear-gradient(var(--accent), var(--badge-border))' }} />
                  {[
                    ['Submit the form', 'Enter the email linked to your account and tell us why you are leaving.'],
                    ['We verify ownership', 'We may email you to confirm the account belongs to you.'],
                    ['Account deleted', 'Your account and cloud data are erased and we confirm by email.'],
                  ].map(([t, d], i) => (
                    <li key={t} className="relative flex gap-4">
                      <span className="flex items-center justify-center rounded-full flex-shrink-0 text-white" style={{ ...h, width: 32, height: 32, fontWeight: 700, fontSize: '0.85rem', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', boxShadow: '0 0 0 4px var(--card)' }}>
                        {i + 1}
                      </span>
                      <div>
                        <div style={{ ...h, fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>{t}</div>
                        <div style={{ fontSize: '0.87rem', color: 'var(--desc-color)', lineHeight: 1.6 }}>{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '1.25rem', lineHeight: 1.6 }}>
                  Read more in our{' '}
                  <a href="/privacy-policy#retention-deletion" onClick={goPrivacy} style={linkStyle}>
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Form column ── */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <div aria-hidden style={{ height: 4, background: 'linear-gradient(90deg, var(--danger), #f97316, #2563eb)' }} />
                <div style={{ padding: 'clamp(1.4rem, 3.5vw, 2.25rem)' }}>
                  {status === 'done' && receipt ? (
                    <div className="text-center py-6 tab-pane">
                      <div className="relative mx-auto mb-5" style={{ width: 72, height: 72 }}>
                        <span className="absolute inset-0 rounded-full success-ring" style={{ background: 'var(--success-bg)' }} />
                        <span className="relative flex items-center justify-center rounded-full w-full h-full" style={{ background: 'var(--success-bg)', color: 'var(--success)', transform: 'scale(1.3)' }}>
                          <Icon.check />
                        </span>
                      </div>
                      <h2 style={{ ...h, fontWeight: 800, fontSize: '1.5rem', color: 'var(--foreground)' }}>Request received</h2>
                      <p style={{ fontSize: '0.93rem', color: 'var(--desc-color)', lineHeight: 1.7, maxWidth: 380, margin: '0.6rem auto 0' }}>
                        We'll review your request and send a confirmation to <Strong>{receipt.email}</Strong> once your account has been deleted.
                      </p>
                      <div className="inline-flex flex-col rounded-2xl mt-6" style={{ background: 'var(--secondary)', border: '1px dashed var(--border)', padding: '0.8rem 1.5rem' }}>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 600 }}>Request ID</span>
                        <span style={{ ...h, fontWeight: 800, fontSize: '1.25rem', color: 'var(--foreground)', letterSpacing: '0.04em' }}>{receipt.ref}</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 mt-7">
                        <button className="btn-primary" onClick={() => setPage('home')}>
                          Back to home <Icon.arrow />
                        </button>
                        <button className="btn-outline" onClick={() => { setStatus('idle'); setReceipt(null) }}>
                          Submit another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ ...h, fontWeight: 800, fontSize: '1.45rem', color: 'var(--foreground)' }}>Account deletion request</h2>
                      <p style={{ fontSize: '0.9rem', color: 'var(--desc-color)', marginTop: 4, marginBottom: '1.6rem' }}>
                        Fields marked <span style={{ color: 'var(--danger)' }}>*</span> are required.
                      </p>

                      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                        {/* Honeypot for bots */}
                        <input type="text" tabIndex={-1} autoComplete="off" value={form.honey} onChange={(e) => set({ honey: e.target.value })} style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden />

                        <div>
                          <label htmlFor="del-app" style={label}>Application</label>
                          <div className="relative">
                            <select id="del-app" value={form.app} onChange={(e) => set({ app: e.target.value })} style={{ ...field('app'), appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
                              <option>Asan Dairy</option>
                            </select>
                            <span className="absolute pointer-events-none" style={{ right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}>
                              <Icon.chevronDown />
                            </span>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="del-email" style={label}>
                            Account email <span style={{ color: 'var(--danger)' }}>*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute pointer-events-none" style={{ left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}>
                              <Icon.mail />
                            </span>
                            <input
                              id="del-email"
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              value={form.email}
                              onChange={(e) => set({ email: e.target.value })}
                              aria-invalid={!!errors.email}
                              className="legal-input"
                              style={{ ...field('email'), paddingLeft: '2.75rem' }}
                            />
                          </div>
                          {errText('email') ?? (
                            <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: 6 }}>Use the email linked to your Asan Dairy account. We'll send the confirmation here.</div>
                          )}
                        </div>

                        <div>
                          <label htmlFor="del-phone" style={label}>
                            Registered phone <span style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>(optional)</span>
                          </label>
                          <div className="relative">
                            <span className="absolute pointer-events-none" style={{ left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}>
                              <Icon.phone />
                            </span>
                            <input
                              id="del-phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="0300-0000000"
                              value={form.phone}
                              onChange={(e) => set({ phone: e.target.value })}
                              className="legal-input"
                              style={{ ...field('phone'), paddingLeft: '2.75rem' }}
                            />
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: 6 }}>Only if you signed in with a phone number.</div>
                        </div>

                        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                          <legend style={label}>
                            Reason for deleting <span style={{ color: 'var(--danger)' }}>*</span>
                          </legend>
                          <div className="flex flex-wrap gap-2" role="radiogroup">
                            {REASONS.map((r) => {
                              const on = form.reason === r
                              return (
                                <label key={r} className="reason-chip" data-active={on}>
                                  <input type="radio" name="reason" value={r} checked={on} onChange={() => set({ reason: r })} className="sr-only" />
                                  {on && <Icon.check />}
                                  {r}
                                </label>
                              )
                            })}
                          </div>
                          {errText('reason')}
                        </fieldset>

                        <div>
                          <label htmlFor="del-details" style={label}>
                            Tell us more{' '}
                            {form.reason === 'Other' ? <span style={{ color: 'var(--danger)' }}>*</span> : <span style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>(optional)</span>}
                          </label>
                          <textarea
                            id="del-details"
                            rows={4}
                            maxLength={1000}
                            placeholder="Anything we could have done better?"
                            value={form.details}
                            onChange={(e) => set({ details: e.target.value })}
                            className="legal-input"
                            style={{ ...field('details'), resize: 'vertical', minHeight: 110 }}
                          />
                          <div className="flex justify-between items-start">
                            <div>{errText('details')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: 6 }}>{form.details.length}/1000</div>
                          </div>
                        </div>

                        <div>
                          <label
                            className="flex gap-3 rounded-2xl cursor-pointer"
                            style={{
                              padding: '0.95rem 1rem',
                              background: form.confirm ? 'var(--danger-bg)' : 'var(--secondary)',
                              border: `1.5px solid ${errors.confirm ? 'var(--danger)' : form.confirm ? 'var(--danger-border)' : 'var(--border)'}`,
                            }}
                          >
                            <input type="checkbox" checked={form.confirm} onChange={(e) => set({ confirm: e.target.checked })} className="legal-check" />
                            <span style={{ fontSize: '0.87rem', lineHeight: 1.6, color: 'var(--secondary-foreground)' }}>
                              I understand that deleting my account will <Strong>permanently erase</Strong> my account and Collection Point cloud data, and this cannot be undone.
                            </span>
                          </label>
                          {errText('confirm')}
                        </div>

                        <button type="submit" disabled={status === 'sending'} className="btn-danger">
                          {status === 'sending' ? (
                            <>
                              <span className="spinner" /> Submitting request…
                            </>
                          ) : (
                            <>
                              <Icon.trash /> Submit deletion request
                            </>
                          )}
                        </button>

                        <p className="icon-sm flex items-center justify-center gap-1.5 text-center" style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
                          <Icon.lock /> Your details are used only to process this request.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
