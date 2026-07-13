'use client'

import Link from 'next/link'

export default function Portfolio() {
  return (
    <Link
      href="/portfolio"
      aria-label="Go to portfolio page"
      style={{ textDecoration: 'none' }}
    >
      <section className="card-soft" style={{ padding: 24 }}>
        <div className="section-head" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Portfolio</div>
          <h2 className="hx">Recent work & moments</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <p style={{ margin: 0, color: 'var(--muted-dark)', fontWeight: 750, lineHeight: 1.7 }}>
            I’m a multidisciplinary builder — currently finishing my B.Sc. in Software Engineering (AASTU).
            This page is a snapshot of the three lanes that feed into each other.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 10,
              width: '100%',
            }}
          >
            <div style={{ color: 'var(--muted-dark)', fontWeight: 800, lineHeight: 1.6, fontSize: 14 }}>
              • Software: leadership, teaching, and shipping web apps (React / Next.js, Django, DSA)
            </div>
            <div style={{ color: 'var(--muted-dark)', fontWeight: 800, lineHeight: 1.6, fontSize: 14 }}>
              • Content: editorial work that converts to action (LinkedIn / IG / TikTok)
            </div>
            <div style={{ color: 'var(--muted-dark)', fontWeight: 800, lineHeight: 1.6, fontSize: 14 }}>
              • Games: Unity/C# projects with OOP discipline
            </div>
          </div>

          <div style={{ marginTop: 4 }}>
            <span className="btn ghost" style={{ padding: '10px 16px', borderRadius: 999, display: 'inline-flex', gap: 8 }}>
              View portfolio <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </section>
    </Link>
  )
}



