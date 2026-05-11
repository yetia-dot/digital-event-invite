import Link from 'next/link'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <p className="text-amber-600 font-medium tracking-wide uppercase text-sm">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-gray-800">Event Manager</h1>
          <p className="text-gray-600">Create and manage your events and gift wishlist.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/admin/events"
              className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-gray-800">Events</div>
              <div className="text-sm text-gray-500 mt-1">View all events</div>
            </Link>

            <Link
              href="/admin/events/new"
              className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-gray-800">Create Event</div>
              <div className="text-sm text-gray-500 mt-1">Add agenda + wishlist</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

