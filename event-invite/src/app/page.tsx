'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="sticky top-0 z-50">
          <div
            className="card-soft"
            style={{
              padding: 10,
              position: 'sticky',
              top: 12,
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 800 }}>
              <span style={{ color: 'var(--ink)' }}>The Event</span> · <span style={{ color: 'var(--maroon)' }}>’26</span>
            </div>
            <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link className="btn ghost" href="/invite" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Invite
              </Link>
              <Link className="btn ghost" href="/portfolio" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Portfolio
              </Link>
              <Link className="btn ghost" href="/gifts" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Gifts
              </Link>
            </nav>
          </div>
        </header>

        <section
          className="hero"
          style={{
            '--hero-img': `url('https://picsum.photos/seed/landing-hero/1600/900')`,
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow">Graduation Party (Invite-only)</div>
            <h1 className="hx">You’re invited</h1>
            <p className="hero-sub">
              Join us to celebrate the milestone—RSVP to unlock the exact location and keep everything organized.
            </p>

            <div className="card-soft" style={{ padding: 18, background: 'rgba(255,255,255,0.62)' }}>
              <div className="mono" style={{ fontSize: 13, color: 'var(--brass-light)' }}>
                Celebration details
              </div>
              <div style={{ marginTop: 6, fontWeight: 900 }}>Saturday, August 15, 2026 · 3:00 PM</div>
              <div style={{ marginTop: 4, color: 'var(--muted-dark)' }}>Location revealed after RSVP</div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn" href="/invite">
                RSVP &amp; location
                <span aria-hidden>→</span>
              </Link>
              <Link className="btn ghost" href="/portfolio">
                View portfolio
              </Link>
            </div>
          </div>
        </section>

        <section className="card-soft" style={{ padding: 24 }}>
          <div className="section-head" style={{ marginBottom: 20 }}>
            <div className="eyebrow">At a glance</div>
            <h2 className="hx">What to expect</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
            {[
              {
                k: 'What to expect',
                v: 'Short speeches, celebrations, and a few moments to remember.',
              },
              {
                k: 'RSVP',
                v: 'Confirm your name + number to unlock the exact location.',
              },
              {
                k: 'Gifts',
                v: 'Optional wishlist available via the Gifts link.',
              },
            ].map((it) => (
              <div key={it.k} className="card-soft" style={{ padding: 16, background: 'rgba(255,255,255,0.55)' }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
                  {it.k}
                </div>
                <div className="hx" style={{ fontSize: 20, marginTop: 8 }}>
                  {it.v}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

