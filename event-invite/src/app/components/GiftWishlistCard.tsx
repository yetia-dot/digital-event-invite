'use client'

import React from 'react'
import type { WishlistItem } from '../../lib/giftWishlist'

export default function GiftWishlistCard({
  item,
  reserved,
  onReserve,
  onDetails,
}: {
  item: WishlistItem
  reserved: boolean
  onReserve: () => void
  onDetails: () => void
}) {
  return (
    <div
      className="card-soft"
      style={{
        padding: 16,
        background: 'rgba(255,255,255,0.55)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 170,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(18,24,27,0.08)',
          background: 'rgba(255,255,255,0.4)',
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
          {reserved ? 'Reserved' : 'Available'}
        </div>
        <div className="hx" style={{ fontSize: 20, marginTop: 6, lineHeight: 1.15 }}>
          {item.name}
        </div>
        <div style={{ marginTop: 8, color: 'var(--muted-dark)', fontWeight: 800 }}>{item.priceRange}</div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <button
            className={reserved ? 'btn ghost' : 'btn'}
            disabled={reserved}
            onClick={onReserve}
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              flex: '1 1 auto',
              justifyContent: 'center',
            }}
          >
            {reserved ? 'Reserved' : 'Reserve'}
          </button>

          <button
            className="btn ghost"
            onClick={onDetails}
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              flex: '1 1 auto',
              justifyContent: 'center',
            }}
          >
            Details
          </button>
        </div>

        <div style={{ marginTop: 12, color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.6 }}>
          {reserved
            ? 'Someone already reserved this one—pick another to avoid repeats.'
            : 'Tap Reserve to claim it for your turn.'}
        </div>
      </div>
    </div>
  )
}

