import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function AdminEventsPage() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-amber-50 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          <p className="text-red-600">Error: {error.message}</p>
          <Link href="/admin" className="text-amber-700 hover:underline">
            Back to Admin
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-amber-600 font-medium tracking-wide uppercase text-sm">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-gray-800">Events</h1>
            <p className="text-gray-600 mt-1">Manage event content and gift wishlist.</p>
          </div>
          <Link
            href="/admin/events/new"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            + New Event
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="font-semibold text-gray-800">All events</div>
            <div className="text-sm text-gray-500">{events?.length ?? 0}</div>
          </div>

          <div className="divide-y divide-gray-100">
            {events?.length ? (
              events.map((event) => (
                <Link
                  key={event.id}
                  href={`/admin/events/${event.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{event.location}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.date
                        ? new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-10 text-gray-600">No events yet.</div>
            )}
          </div>
        </div>

        <Link href="/admin" className="text-amber-700 hover:underline">
          Back to Admin
        </Link>
      </div>
    </main>
  )
}

