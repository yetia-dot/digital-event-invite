'use client'

import Link from 'next/link'
import { WISHLIST } from '../../lib/giftWishlist'

export default function Gifts() {
  const previewItems = WISHLIST.slice(0, 3)

  return (
    <Link
      href="/gifts"
      aria-label="Go to gifts page"
      style={{ textDecoration: 'none' }}
    >
      <section className="card-soft" style={{ padding: 24 }}>
        <div className="section-head" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Gifts</div>
          <h2 className="hx">Optional wishlist</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <p style={{ margin: 0, color: 'var(--muted-dark)', fontWeight: 750, lineHeight: 1.7 }}>
            Your presence is truly the only gift I need. But if you’d like to bring something, here’s a short list.
          </p>

          <div style={{ width: '100%', display: 'grid', gap: 8 }}>
            {previewItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  border: '1px solid var(--ink-line)',
                  background: 'rgba(255,255,255,0.35)',
                  borderRadius: 12,
                  padding: '10px 12px',
                }}
              >
                <div style={{ fontWeight: 900, color: 'var(--ink)', fontSize: 14 }}>{item.name}</div>
                <div style={{ color: 'var(--muted-dark)', fontWeight: 800, fontSize: 13 }}>{item.priceRange}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 4 }}>
            <span className="btn" style={{ padding: '10px 16px', borderRadius: 999, display: 'inline-flex', gap: 8 }}>
              Browse gifts <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </section>
    </Link>
  )
}



