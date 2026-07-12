'use client'

import Link from 'next/link'

export default function Gifts() {
  return (
    <section className="card-soft" style={{ padding: 24 }}>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <div className="eyebrow">Gifts</div>
        <h2 className="hx">Optional wishlist</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <p style={{ margin: 0, color: 'var(--muted-dark)', fontWeight: 700, lineHeight: 1.7 }}>
          If you’d like to bring a gift, the wishlist is available via the Gifts page.
        </p>

        <Link className="btn" href="/gifts" style={{ padding: '10px 16px', borderRadius: 999 }}>
          Browse gifts
        </Link>
      </div>
    </section>
  )
}

