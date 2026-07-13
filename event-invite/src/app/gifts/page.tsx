'use client'

import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import GiftChatWidget from '../components/GiftChatWidget'
import GiftWishlistCard from '../components/GiftWishlistCard'
import { WISHLIST } from '../../lib/giftWishlist'

export default function GiftsPage() {
  const heroImg = useMemo(() => 'https://picsum.photos/seed/gift-ideas-hero/1600/900', [])
  const [reservedIds, setReservedIds] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeItem = activeId ? WISHLIST.find((x) => x.id === activeId) ?? null : null

  function reserveItem(itemId: string) {
    setReservedIds((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]))
  }

  return (
    /* 1. Page Background matches the cream curtains */
    <main className="min-h-screen px-4 pb-12" style={{ backgroundColor: 'var(--bg-parchment)' }}>
      <div className="max-w-6xl mx-auto space-y-6 pt-4">
        <Navbar />

        {/* 2. Hero Section: Rich emerald green base with luminous brass text */}
        <section
          className="hero"
          style={{
            '--hero-img': `url('${heroImg}')`,
            backgroundColor: 'var(--ink)',
            backgroundImage: `linear-gradient(to bottom, rgba(13, 68, 45, 0.6), rgba(13, 68, 45, 0.9)), url('${heroImg}')`,
            boxShadow: '0 20px 40px -15px rgba(13, 68, 45, 0.25)'
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow" style={{ color: 'var(--brass-neon)', textShadow: '0 0 10px var(--brass-glow)' }}>
              A small wishlist
            </div>
            <h1 className="hx" style={{ color: 'var(--ivory)', fontFamily: 'Fraunces, serif' }}>
              gift ideas
            </h1>
            <p className="hero-sub" style={{ color: 'var(--parchment-2)', opacity: 0.9 }}>
                    Your presence is truly the only gift I need. But a few of you have asked what I could use right now, so here&apos;s a short list. Once someone reserves an item, it&apos;s marked as taken so we don&apos;t end up with five of the same thing.


            </p>
          </div>
        </section>

        {/* 3. Main Grid Area */}
        <section className="space-y-4">
          <div className="section-head">
            <div className="eyebrow" style={{ color: 'var(--ink-soft)' }}>wishlist items</div>
            <h2 className="hx" style={{ color: 'var(--ink)' }}>Browse & reserve</h2>
          </div>

          <div 
            className="card-soft" 
            style={{ 
              padding: 28, 
              backgroundColor: 'var(--surface-card)', 
              borderRadius: '16px',
              border: '1px solid rgba(13, 68, 45, 0.06)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {WISHLIST.map((item) => {
                const reserved = reservedIds.includes(item.id)
                return (
                  <GiftWishlistCard
                    key={item.id}
                    item={item}
                    reserved={reserved}
                    onReserve={() => reserveItem(item.id)}
                    onDetails={() => setActiveId(item.id)}
                  />
                )
              })}
            </div>

            {/* 4. Action Button: Emerald structure with a crisp clean hover feel */}
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
              <a 
                className="btn" 
                href="/event"
                style={{
                  backgroundColor: 'var(--ink)',
                  color: 'var(--ivory)',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 14px rgba(13, 68, 45, 0.2)',
                  fontWeight: 600
                }}
              >
                Back to Event details
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <GiftChatWidget />

        {/* Modal content adjustments */}
        <Modal
          open={!!activeItem}
          title={activeItem ? activeItem.name : 'Details'}
          onClose={() => setActiveId(null)}
        >
          {activeItem ? (
            <div>
              <p style={{ margin: 0, color: 'var(--muted-dark)', lineHeight: 1.7 }}>
                {activeItem.description}
              </p>

              <div style={{ marginTop: 20 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Where to find it
                </div>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {activeItem.links.map((l) => (
                    <a
                      key={l.href}
                      className="btn"
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ 
                        padding: '8px 18px', 
                        borderRadius: 999,
                        backgroundColor: 'var(--bg-parchment)',
                        color: 'var(--ink)',
                        fontSize: '13px',
                        border: '1px solid rgba(13, 68, 45, 0.1)',
                        fontWeight: 600
                      }}
                    >
                      {l.label}
                      <span aria-hidden style={{ color: 'var(--brass-neon)', marginLeft: 4 }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </main>
  )
}