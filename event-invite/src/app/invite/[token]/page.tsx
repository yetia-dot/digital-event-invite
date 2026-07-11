import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import RsvpForm from './RsvpForm'
import ReserveButton from './ReserveButton'

// This tells Next.js this page is dynamic (different per token)
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function InvitePage({ params }: PageProps) {
  const { token } = await params

  // 1. Find the guest by their unique token
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('*')
    .eq('invite_token', token)
    .single()

  // If token is invalid, show 404
  if (guestError || !guest) {
    notFound()
  }

  // 2. Fetch the event
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', guest.event_id)
    .single()

  // 3. Fetch agenda items in order
  const { data: agenda } = await supabase
    .from('agenda_items')
    .select('*')
    .eq('event_id', guest.event_id)
    .order('order_index')

  // 4. Fetch wishlist items
  const { data: wishlist } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('event_id', guest.event_id)

  // 5. Check if guest already RSVP'd
  const { data: existingRsvp } = await supabase
    .from('rsvps')
    .select('*')
    .eq('guest_id', guest.id)
    .single()

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HERO */}
        <section
          className="hero"
          style={{
            // Optional: give the hero a subtle image feel without requiring assets.
            // If you add a photo later, replace this with a real URL.
            '--hero-img': `url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221600%22 height=%22900%22%3E%3Cdefs%3E%3CradialGradient id=%22g%22 cx=%2250%25%22 cy=%2220%25%22 r=%2280%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23B08D57%22 stop-opacity=%220.35%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%2312181B%22 stop-opacity=%220.9%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width=%221600%22 height=%22900%22 fill=%22url(%23g)%22/%3E%3C/svg%3E')`,
          } as React.CSSProperties}
        >
          <div className="hero-content">
            <div className="eyebrow">You&apos;re invited</div>
            <h1 className="hx">{event?.title}</h1>
            <p className="hero-sub">
              Dear <span style={{ fontWeight: 700 }}>{guest.name}</span> — {event?.description}
            </p>

            <div className="card-soft" style={{ padding: 18 }}>
              <div className="mono" style={{ fontSize: 14, color: 'var(--brass-light)' }}>
                {event?.date
                  ? new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : null}
              </div>
              <div style={{ marginTop: 6, fontWeight: 700 }}>
                <span style={{ marginRight: 10 }}>🕒</span>
                {event?.date
                  ? new Date(event.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : null}
              </div>
              <div style={{ marginTop: 4, color: 'var(--muted-dark)' }}>
                📍 {event?.location}
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA */}
        <section>
          <div className="section-head">
            <div className="eyebrow">Program</div>
            <h2 className="hx">Schedule of events</h2>
          </div>

          <div className="card-soft" style={{ padding: 24 }}>
            <div className="timeline">
              {agenda?.map((item) => (
                <div key={item.id} className="tl-row">
                  <div className="tl-time mono">
                    {item?.start_time
                      ? new Date(item.start_time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : null}
                  </div>
                  <div>
                    <div className="tl-name">{item.title}</div>
                    {item.description ? (
                      <div style={{ marginTop: 6, color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.6 }}>
                        {item.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="tl-note" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WISHLIST */}
        <section>
          <div className="section-head">
            <div className="eyebrow">Gift Wishlist</div>
            <h2 className="hx">Choose a gift (optional)</h2>
          </div>

          <div className="card-soft" style={{ padding: 24 }}>
            <p style={{ color: 'var(--muted-dark)', marginBottom: 18, lineHeight: 1.7 }}>
              Reserve an item to bring as a gift — your identity stays a surprise 🎁
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {wishlist?.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                    alignItems: 'center',
                    border: '1px solid rgba(18,24,27,0.08)',
                    borderRadius: 16,
                    padding: 14,
                    background: 'rgba(255,255,255,0.55)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        textDecoration: item.is_reserved ? 'line-through' : undefined,
                        color: item.is_reserved ? 'rgba(18,24,27,0.35)' : 'var(--ink)',
                      }}
                    >
                      {item.name}
                    </div>
                    {item.description ? (
                      <div style={{ marginTop: 6, color: 'var(--muted-dark)', fontSize: 13, lineHeight: 1.5 }}>
                        {item.description}
                      </div>
                    ) : null}
                    {item.price_range ? (
                      <div style={{ marginTop: 6, color: 'var(--brass)', fontSize: 12, fontWeight: 700 }}>
                        {item.price_range}
                      </div>
                    ) : null}
                  </div>

                  {item.is_reserved ? (
                    <span className="pill reserved">Reserved</span>
                  ) : (
                    <ReserveButton itemId={item.id} token={token} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section>
          <div className="section-head" style={{ textAlign: 'center', marginBottom: 18 }}>
            <div className="eyebrow">Kindly Respond</div>
            <h2 className="hx">Will you attend?</h2>
          </div>

          {existingRsvp ? (
            <div className="rsvp-card" style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--sage)', fontWeight: 800, fontSize: 16 }}>
                ✅ You&apos;ve already responded — thank you, {guest.name}!
              </div>
            </div>
          ) : (
            <div className="rsvp-card">
              <RsvpForm guestId={guest.id} guestName={guest.name} token={token} />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

