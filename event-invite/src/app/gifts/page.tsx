'use client'

import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import GiftChatWidget from '../components/GiftChatWidget'

type WishlistItem = {
  id: string
  name: string
  priceRange: string
  imageUrl: string
  description: string
  links: { label: string; href: string }[]
}

const WISHLIST: WishlistItem[] = [
  {
    id: 'i1',
    name: 'Personalized keepsake mug',
    priceRange: '$12–$25',
    imageUrl: 'https://picsum.photos/seed/keepsake-mug/800/600',
    description:
      'A cozy daily reminder—perfect for sipping something warm while thinking about you.',
    links: [
      { label: 'Find on Etsy', href: 'https://www.etsy.com/' },
      { label: 'Buy on Amazon', href: 'https://www.amazon.com/' },
      { label: 'Local gift shop', href: 'https://www.google.com/maps' },
    ],
  },
  {
    id: 'i2',
    name: 'Memory photo frame (instant-ready)',
    priceRange: '$18–$40',
    imageUrl: 'https://picsum.photos/seed/photo-frame/800/600',
    description:
      'A frame I can actually use right away—so your gift doesn’t just sit, it shows.',
    links: [
      { label: 'Photo frames on Etsy', href: 'https://www.etsy.com/' },
      { label: 'Photo frames on Amazon', href: 'https://www.amazon.com/' },
      { label: 'Local stationary stores', href: 'https://www.google.com/maps' },
    ],
  },
  {
    id: 'i3',
    name: 'Soft-back journal + pen set',
    priceRange: '$10–$30',
    imageUrl: 'https://picsum.photos/seed/journal/800/600',
    description:
      'For capturing notes, plans, and little moments—something I’ll keep using long after the celebration.',
    links: [
      { label: 'Journals on Amazon', href: 'https://www.amazon.com/' },
      { label: 'Journals on Barnes & Noble', href: 'https://www.barnesandnoble.com/' },
      { label: 'Local bookstore', href: 'https://www.google.com/maps' },
    ],
  },
  {
    id: 'i4',
    name: 'Cozy hoodie (my “always on” favorite)',
    priceRange: '$25–$60',
    imageUrl: 'https://picsum.photos/seed/hoodie/800/600',
    description:
      'Something wearable—because gifts should be useful too. I promise I’ll actually wear it.',
    links: [
      { label: 'Shop hoodies (Amazon)', href: 'https://www.amazon.com/' },
      { label: 'Shop hoodies (Zara)', href: 'https://www.zara.com/' },
      { label: 'Local clothing store', href: 'https://www.google.com/maps' },
    ],
  },
  {
    id: 'i5',
    name: 'Desk mini lamp (warm light)',
    priceRange: '$15–$35',
    imageUrl: 'https://picsum.photos/seed/desk-lamp/800/600',
    description:
      'A small upgrade that makes my space feel calmer and more “me”. Warm light always wins.',
    links: [
      { label: 'Desk lamps on Amazon', href: 'https://www.amazon.com/' },
      { label: 'Home decor stores', href: 'https://www.google.com/maps' },
      { label: 'Lighting on IKEA', href: 'https://www.ikea.com/' },
    ],
  },
  {
    id: 'i6',
    name: 'Reusable water bottle (stays cold)',
    priceRange: '$18–$45',
    imageUrl: 'https://picsum.photos/seed/bottle/800/600',
    description:
      'For long days and quick errands—something practical I’ll keep using every week.',
    links: [
      { label: 'Hydro bottles (Amazon)', href: 'https://www.amazon.com/' },
      { label: 'Stainless bottles (Target)', href: 'https://www.target.com/' },
      { label: 'Local supermarket', href: 'https://www.google.com/maps' },
    ],
  },
]

export default function GiftsPage() {
  const heroImg = useMemo(() => 'https://picsum.photos/seed/gift-ideas-hero/1600/900', [])
  const [reservedIds, setReservedIds] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeItem = activeId ? WISHLIST.find((x) => x.id === activeId) ?? null : null

  function reserveItem(itemId: string) {
    setReservedIds((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]))
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <section
          className="hero"
          style={{
            '--hero-img': `url('${heroImg}')`,
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow">gift ideas</div>
            <h1 className="hx">gift ideas</h1>
            <p className="hero-sub">
              Pick and reserve something from my wishlist—then open <b>Details</b> for helpful links.
            </p>
          </div>
        </section>

        <section>
          <div className="section-head">
            <div className="eyebrow">wishlist items</div>
            <h2 className="hx">Browse & reserve</h2>
          </div>

          <div className="card-soft" style={{ padding: 24 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 16,
              }}
            >
              {WISHLIST.map((item) => {
                const reserved = reservedIds.includes(item.id)
                return (
                  <div
                    key={item.id}
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
                      <div style={{ marginTop: 8, color: 'var(--muted-dark)', fontWeight: 800 }}>
                        {item.priceRange}
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                        <button
                          className={reserved ? 'btn ghost' : 'btn'}
                          disabled={reserved}
                          onClick={() => reserveItem(item.id)}
                          style={{ padding: '10px 16px', borderRadius: 999, flex: '1 1 auto', justifyContent: 'center' }}
                        >
                          {reserved ? 'Reserved' : 'Reserve'}
                        </button>

                        <button
                          className="btn ghost"
                          onClick={() => setActiveId(item.id)}
                          style={{ padding: '10px 16px', borderRadius: 999, flex: '1 1 auto', justifyContent: 'center' }}
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
              })}
            </div>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
              <a className="btn" href="/event">
                Back to Event details
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <GiftChatWidget />

        <Modal
          open={!!activeItem}
          title={activeItem ? activeItem.name : 'Details'}
          onClose={() => setActiveId(null)}
        >
          {activeItem ? (
            <div>
              <p style={{ margin: 0, color: 'var(--muted-dark)', lineHeight: 1.7, fontWeight: 700 }}>
                {activeItem.description}
              </p>

              <div style={{ marginTop: 14 }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
                  Where to find it
                </div>
                <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {activeItem.links.map((l) => (
                    <a
                      key={l.href}
                      className="btn ghost"
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: '10px 16px', borderRadius: 999 }}
                    >
                      {l.label}
                      <span aria-hidden>↗</span>
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


