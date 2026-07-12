'use client'

import Link from 'next/link'

export default function Portfolio() {
  return (
    <section className="card-soft" style={{ padding: 24 }}>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Portfolio</div>
        <h2 className="hx">Recent work & moments</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <p style={{ margin: 0, color: 'var(--muted-dark)', fontWeight: 700, lineHeight: 1.7 }}>
          Explore highlights, memories, and the story behind the celebration.
        </p>

        <Link className="btn ghost" href="/portfolio" style={{ padding: '10px 16px', borderRadius: 999 }}>
          View portfolio
        </Link>
      </div>
    </section>
  )
}

