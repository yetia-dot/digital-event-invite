'use client'

import Link from 'next/link'
import { useState } from 'react'
import { submitRsvpToGoogleSheets } from './invite/actions'

function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}): React.ReactElement | null {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.52)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        zIndex: 1000,
      }}
    >
      <div
        className="card-soft"
        style={{
          width: '100%',
          maxWidth: 560,
          padding: 18,
          background: 'rgba(255,255,255,0.92)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
              {title}
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn ghost"
            style={{ padding: '8px 12px', fontSize: 13 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ marginTop: 14 }}>{children}</div>
      </div>
    </div>
  )
}

function RsvpComingModals() {
  const [openYes, setOpenYes] = useState(false)
  const [openNo, setOpenNo] = useState(false)

  const [nameYes, setNameYes] = useState('')
  const [phoneYes, setPhoneYes] = useState('')
  const [loadingYes, setLoadingYes] = useState(false)
  const [errorYes, setErrorYes] = useState('')

  const [nameNo, setNameNo] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [messageNo, setMessageNo] = useState('')
  const [loadingNo, setLoadingNo] = useState(false)
  const [errorNo, setErrorNo] = useState('')

  async function submitYes() {
    setLoadingYes(true)
    setErrorYes('')

    const phone = phoneYes.replace(/\D/g, '')

    const res = await submitRsvpToGoogleSheets({
      name: nameYes.trim(),
      phone,
      attending: true,
      guests: 1,
      message: '',
    })

    if (!res.success) {
      setErrorYes(res.error ?? 'Could not submit RSVP')
      setLoadingYes(false)
      return
    }

    setLoadingYes(false)
    setOpenYes(false)
  }

  async function submitNo() {
    setLoadingNo(true)
    setErrorNo('')

    const phone = phoneNo.replace(/\D/g, '')

    const res = await submitRsvpToGoogleSheets({
      name: nameNo.trim(),
      phone,
      attending: false,
      guests: 1,
      message: messageNo.trim(),
    })

    if (!res.success) {
      setErrorNo(res.error ?? 'Could not submit response')
      setLoadingNo(false)
      return
    }

    setLoadingNo(false)
    setOpenNo(false)
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => setOpenYes(true)} style={{ padding: '12px 22px' }}>
          Yes
        </button>
        <button className="btn ghost" onClick={() => setOpenNo(true)} style={{ padding: '12px 22px' }}>
          No
        </button>
      </div>

          <Modal open={openYes} title="Youre coming!" onClose={() => setOpenYes(false)}>
        <div className="form-row">
          <div className="field full">
            <label>Name</label>
            <input value={nameYes} onChange={(e) => setNameYes(e.target.value)} placeholder="Your name" />
          </div>
          <div className="field full">
            <label>Number</label>
            <input
              value={phoneYes}
              onChange={(e) => setPhoneYes(e.target.value)}
              placeholder="Phone number"
              inputMode="numeric"
            />
          </div>
        </div>

        {errorYes ? <p style={{ color: 'var(--maroon)', fontWeight: 800, marginTop: 10 }}>{errorYes}</p> : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button className="btn" onClick={submitYes} disabled={loadingYes || !nameYes.trim() || !phoneYes.trim()} style={{ flex: 1, justifyContent: 'center' }}>
            {loadingYes ? 'Saving...' : 'Submit'}
          </button>
          <button className="btn ghost" onClick={() => setOpenYes(false)} disabled={loadingYes} style={{ flex: 1, justifyContent: 'center' }}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal open={openNo} title="Can&#39;t make it" onClose={() => setOpenNo(false)}>
        <p style={{ color: 'var(--muted-dark)', lineHeight: 1.7, fontWeight: 700 }}>
          owww, we would have loved your presence.
        </p>

        <div className="form-row" style={{ marginTop: 12 }}>
          <div className="field full">
            <label>Name</label>
            <input value={nameNo} onChange={(e) => setNameNo(e.target.value)} placeholder="Your name" />
          </div>
          <div className="field full">
            <label>Number</label>
            <input
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Phone number"
              inputMode="numeric"
            />
          </div>
          <div className="field full">
            <label>Warm wish (optional)</label>
            <textarea
              rows={4}
              value={messageNo}
              onChange={(e) => setMessageNo(e.target.value)}
              placeholder="Write a warm message..."
            />
          </div>
        </div>

        {errorNo ? <p style={{ color: 'var(--maroon)', fontWeight: 800, marginTop: 10 }}>{errorNo}</p> : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button className="btn" onClick={submitNo} disabled={loadingNo || !nameNo.trim() || !phoneNo.trim()} style={{ flex: 1, justifyContent: 'center' }}>
            {loadingNo ? 'Saving...' : 'Submit'}
          </button>
          <button className="btn ghost" onClick={() => setOpenNo(false)} disabled={loadingNo} style={{ flex: 1, justifyContent: 'center' }}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen px-4" style={{ paddingTop: 0 }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="sticky top-0 z-50">
          <div
            style={{
              padding: 10,
              position: 'sticky',
              top: 0,
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.0)',
              borderBottom: '1px solid rgba(18,24,27,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
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
            <div className="eyebrow"></div>
            <h1 className="hx">you are cordially invited to celebration of Yetnayet&apos;s graduation</h1>
            <p className="hero-sub">
              Your presence will make this day even more meaningful.
            </p>

            <div className="card-soft" style={{ padding: 18, background: 'rgba(255,255,255,0.62)' }}>
              <div className="mono" style={{ fontSize: 13, color: 'var(--brass-light)' }}>
                Celebration details
              </div>
              <div style={{ marginTop: 6, fontWeight: 900 }}>sunday july 19, 2026</div>
              <div style={{ marginTop: 4, color: 'var(--muted-dark)' }}>summit, near cambridge academy</div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flexBasis: '100%', textAlign: 'center', fontWeight: 900, color: 'var(--ivory)' }}>
                you are coming, right?
              </div>
              <RsvpComingModals />
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              {
                k: 'Moments',
                v: 'Short speeches, celebrations, and a few moments to remember.',
                img: 'https://picsum.photos/seed/expect-moments/900/520',
              },
              {
                k: 'RSVP',
                v: 'Confirm your name + number to unlock the exact location.',
                img: 'https://picsum.photos/seed/expect-rsvp/900/520',
              },
              {
                k: 'Gifts',
                v: 'Optional wishlist available via the Gifts link.',
                img: 'https://picsum.photos/seed/expect-gifts/900/520',
              },
            ].map((it) => (
              <div key={it.k}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900, marginBottom: 10 }}>
                  {it.k}
                </div>

                <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="card-soft"
                      style={{
                        minWidth: 320,
                        maxWidth: 360,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      <div
                        style={{
                          height: 180,
                          background: `url(${it.img}) center/cover`,
                          position: 'relative',
                        }}
                      />
                      <div style={{ padding: 16 }}>
                        <div className="hx" style={{ fontSize: 18 }}>
                          {it.v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

