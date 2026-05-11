import Link from 'next/link'
import { supabase } from '@/lib/supabase'

function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: number
  hint?: string
  tone: 'amber' | 'green' | 'red' | 'gray'
}) {
  const toneClasses =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-800 border-amber-100'
      : tone === 'green'
        ? 'bg-green-50 text-green-800 border-green-100'
        : tone === 'red'
          ? 'bg-red-50 text-red-800 border-red-100'
          : 'bg-gray-50 text-gray-800 border-gray-100'

  return (
    <div
      className={`rounded-2xl border ${toneClasses} p-5 flex flex-col gap-2`}>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="text-3xl font-bold leading-none">{value}</div>
      {hint ? <div className="text-xs text-gray-600">{hint}</div> : null}
    </div>
  )
}

type PageProps = {
  params: Promise<{ eventId: string }>
}

export default async function AdminEventDetailPage({ params }: PageProps) {
  const { eventId } = await params

  // 1) Fetch event row
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single()

  if (eventError || !event) {
    return (
      <main className="min-h-screen bg-amber-50 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Event not found</h1>
          <p className="text-red-600">{eventError?.message ?? 'Unknown error'}</p>
          <Link href="/admin/events" className="text-amber-700 hover:underline">
            Back to Events
          </Link>
        </div>
      </main>
    )
  }

  // 2) Compute dashboard counts
  // Sent links: number of guests invited (rows in guests)
  const { count: guestsCount, error: guestsCountError } = await supabase
    .from('guests')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)

  // RSVP counts: fetch guest ids for this event, then count rsvps by attending
  const { data: guestRows } = await supabase
    .from('guests')
    .select('id')
    .eq('event_id', eventId)


  const guestIds = guestRows?.map((g) => g.id).filter(Boolean) ?? []

  const { count: attendingCount, error: attendingCountError } = await supabase
    .from('rsvps')
    .select('id', { count: 'exact', head: true })
    .eq('attending', true)
    .in('guest_id', guestIds)

  const { count: notAttendingCount, error: notAttendingCountError } = await supabase
    .from('rsvps')
    .select('id', { count: 'exact', head: true })
    .eq('attending', false)
    .in('guest_id', guestIds)


  const { count: reservedGiftsCount, error: reservedGiftsCountError } = await supabase
    .from('wishlist_items')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('is_reserved', true)

  const guestsSent = guestsCount ?? 0
  const attending = attendingCount ?? 0
  const notAttending = notAttendingCount ?? 0
  const giftsReserved = reservedGiftsCount ?? 0

  const showWarning =
    !!guestsCountError ||
    !!attendingCountError ||
    !!notAttendingCountError ||
    !!reservedGiftsCountError

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-amber-600 font-medium tracking-wide uppercase text-sm">Admin</p>
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <div className="text-sm text-gray-600">
              {event.date
                ? new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : '—'}{' '}
              · {event.location ?? '—'}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/events"
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-xl transition"
            >
              ← Back
            </Link>
          </div>
        </div>

        {showWarning ? (
          <div className="bg-white border border-amber-100 rounded-2xl p-4 text-amber-900">
            <div className="font-semibold text-sm">Some metrics may be incomplete</div>
            <div className="text-xs mt-1 text-amber-800">
              One or more count queries returned an error.
            </div>
          </div>
        ) : null}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            tone="amber"
            label="Invite links sent"
            value={guestsSent}
            hint="Total guests created for this event"
          />
          <StatCard
            tone="green"
            label="Accepted (will attend)"
            value={attending}
            hint="RSVPs with attending = true"
          />
          <StatCard
            tone="red"
            label="Can’t make it"
            value={notAttending}
            hint="RSVPs with attending = false"
          />
          <StatCard
            tone="gray"
            label="Gifts reserved"
            value={giftsReserved}
            hint="Wishlist items reserved"
          />
        </section>
      </div>
    </main>
  )
}

