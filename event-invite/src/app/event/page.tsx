'use client'

import { useMemo, useState } from 'react'

const GOOGLE_MAPS_LOCATION_URL = 'https://www.google.com/maps?q=8.999247,38.840951'

function formatPhoneInput(v: string) {
  // light normalization for display; keep digits/plus/spaces/dashes
  return v
}

export default function EventPage() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<'yes' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const heroImg = useMemo(() => {
    // placeholder image; replace with real asset later
    return "https://picsum.photos/seed/event-hero/1600/900"
  }, [])

  function resetRsvpFlow() {
    setName('')
    setPhone('')
    setAttending(null)
    setSubmitted(false)
    setRsvpOpen(false)
  }

  function openRsvp() {
    setRsvpOpen(true)
    setSubmitted(false)
    setAttending(null)
  }

  function submitRsvp(e: React.FormEvent) {
    e.preventDefault()
    const n = name.trim()
    const p = phone.trim()
    if (!n) return
    if (!p) return
    if (attending !== 'yes') return

    setSubmitted(true)
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* NAV */}
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
              <span style={{ color: 'var(--ink)' }}>Event</span> · <span style={{ color: 'var(--maroon)' }}>’26</span>
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

        {/* HERO / EVENT DETAILS */}
        <section
          className="hero"
          style={{
            '--hero-img': `url('${heroImg}')`,
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow">Commencement Celebration</div>
            <h1 className="hx">
              You&apos;re invited
            </h1>
            <p className="hero-sub">
              Join us for an unforgettable day of celebration, speeches, and community.
            </p>

            <div className="card-soft" style={{ padding: 18, background: 'rgba(255,255,255,0.62)' }}>
              <div className="mono" style={{ fontSize: 13, color: 'var(--brass-light)' }}>
                Date &amp; time
              </div>
              <div style={{ marginTop: 6, fontWeight: 900 }}>
                {/* Basic template; replace with real event values later */}
                Saturday, August 15, 2026 · 3:00 PM
              </div>
              <div style={{ marginTop: 4, color: 'var(--muted-dark)' }}>
                📍 Summit near Cambridge Academy
              </div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn" onClick={openRsvp}>
                RSVP
                <span aria-hidden>→</span>
              </button>
              <a className="btn ghost" href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
                Location (exact)
              </a>
            </div>

            <div style={{ marginTop: 10, color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.6 }}>
              Location will be revealed after RSVP confirmation to keep things organized.
            </div>
          </div>
        </section>

        {/* RSVP FLOW */}
        <section>
          <div className="section-head" style={{ textAlign: 'center', marginBottom: 18 }}>
            <div className="eyebrow">Kindly Respond</div>
            <h2 className="hx">Will you join the celebration?</h2>
          </div>

          <div className="card-soft" style={{ padding: 24 }}>
            {!rsvpOpen ? (
              <div style={{ textAlign: 'center', color: 'var(--muted-dark)', lineHeight: 1.7 }}>
                Tap <b>RSVP</b> to confirm attendance. After you submit your name and number,
                we’ll show the exact Google Maps location.
              </div>
            ) : (
              <form onSubmit={submitRsvp} className="space-y-4">
                <div className="form-row">
                  <div className="field full">
                    <label htmlFor="rsvp-name">Your name</label>
                    <input
                      id="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Amina Ali"
                      className="field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field full">
                    <label htmlFor="rsvp-phone">Number</label>
                    <input
                      id="rsvp-phone"
                      value={formatPhoneInput(phone)}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="e.g. +251 9xx xxx xxx"
                      className="field"
                      style={{ width: '100%' }}
                      type="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>

                <div className="card-soft" style={{ padding: 16, background: 'rgba(255,255,255,0.55)' }}>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
                    Confirmation
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className={attending === 'yes' ? 'btn' : 'btn ghost'}
                      onClick={() => setAttending('yes')}
                    >
                      Yes, I&apos;m coming 🎉
                    </button>
                    <button
                      type="button"
                      className={attending !== 'yes' ? 'btn' : 'btn ghost'}
                      onClick={() => setAttending(null)}
                    >
                      Not yet
                    </button>
                  </div>

                  {!submitted && attending !== 'yes' ? (
                    <div style={{ marginTop: 10, color: 'var(--muted-dark)', fontSize: 13 }}>
                      Choose <b>Yes</b> to continue.
                    </div>
                  ) : null}
                </div>

                <button className="btn block" type="submit" disabled={!name.trim() || !phone.trim() || attending !== 'yes'}>
                  Confirm RSVP
                </button>
              </form>
            )}

            {submitted ? (
              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    color: 'var(--sage)',
                    fontWeight: 900,
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  ✅ Thanks, {name.trim()} — your RSVP is confirmed.
                </div>

                <div style={{ marginTop: 14, textAlign: 'center' }}>
                  <a className="btn" href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
                    Open exact Google Maps location
                    <span aria-hidden>→</span>
                  </a>
                </div>

                <div style={{ marginTop: 10, color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.6 }}>
                  Address: Summit near Cambridge Academy
                </div>

                <div style={{ marginTop: 14, textAlign: 'center' }}>
                  <button className="btn ghost" type="button" onClick={resetRsvpFlow}>
                    Edit RSVP
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}

