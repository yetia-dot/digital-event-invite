'use client'

import { useMemo } from 'react'

export default function PortfolioPage() {
  const heroImg = useMemo(() => "https://picsum.photos/seed/portfolio-hero/1600/900", [])

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
              <span style={{ color: 'var(--ink)' }}>Portfolio</span> · <span style={{ color: 'var(--maroon)' }}>’26</span>
            </div>
            <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <a className="btn ghost" href="/event" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Event
              </a>
              <a className="btn ghost" href="/portfolio" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Portfolio
              </a>
              <a className="btn ghost" href="/gifts" style={{ padding: '10px 16px', borderRadius: 999 }}>
                Gifts
              </a>
            </nav>
          </div>
        </header>

        <section
          className="hero"
          style={{
            '--hero-img': `url('${heroImg}')`,
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow">Portfolio &amp; Highlights</div>
            <h1 className="hx">A quick look</h1>
            <p className="hero-sub">
              This page can include your projects, resume link, and story.
            </p>
          </div>
        </section>

        <section>
          <div className="section-head">
            <div className="eyebrow">Featured</div>
            <h2 className="hx">Selected work</h2>
          </div>

          <div className="card-soft" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-soft" style={{ padding: 16, background: 'rgba(255,255,255,0.55)' }}>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
                    Project {i + 1}
                  </div>
                  <div className="hx" style={{ fontSize: 22, marginTop: 8 }}>
                    Coming soon
                  </div>
                  <div style={{ color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
                    Add real portfolio content once the event details are finalized.
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <a className="btn" href="/event">
                Back to Event details
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

