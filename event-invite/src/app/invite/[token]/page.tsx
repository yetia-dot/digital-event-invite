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
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-amber-600 font-medium tracking-wide uppercase text-sm">
            You&apos;re invited
          </p>
          <h1 className="text-4xl font-bold text-gray-800">{event?.title}</h1>
          <p className="text-gray-500 text-lg">Dear {guest.name},</p>
          <p className="text-gray-600">{event?.description}</p>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-semibold text-gray-700 text-lg">Event Details</h2>
          <div className="text-gray-600 space-y-1">
          {new Date(event?.date).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}
            <p>🕒 {new Date(event?.date).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit'
            })}</p>
            <p>📍 {event?.location}</p>
          </div>
        </div>

        {/* Agenda */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-700 text-lg">Program</h2>
          <div className="space-y-3">
            {agenda?.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mt-1" />
                  {index < agenda.length - 1 && (
                    <div className="w-0.5 h-full bg-amber-200 mt-1" />
                  )}
                </div>
                <div className="pb-3">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-xs text-amber-600 mt-1">
                    {new Date(item.start_time).toLocaleTimeString('en-US', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-700 text-lg">Gift Wishlist</h2>
          <p className="text-sm text-gray-500">
            Reserve an item to bring as a gift — your identity stays a surprise 🎁
          </p>
          <div className="space-y-3">
            {wishlist?.map((item) => (
              <div key={item.id}
                className="flex justify-between items-center border border-gray-100 rounded-xl p-4">
                <div>
                  <p className={`font-medium ${item.is_reserved ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-xs text-amber-600">{item.price_range}</p>
                </div>
                {item.is_reserved ? (
  <span className="text-xs bg-gray-100 text-gray-400 px-3 py-1 rounded-full">
    Reserved
  </span>
) : (
  <ReserveButton itemId={item.id} token={token} />
)}
              </div>
            ))}
          </div>
        </div>

        {/* RSVP Section */}
<div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
  <h2 className="font-semibold text-gray-700 text-lg">Will you attend?</h2>
  {existingRsvp ? (
          <p className="text-green-600 font-medium">
      ✅ You&apos;ve already responded — thank you, {guest.name}!
    </p>
  ) : (
    <RsvpForm
      guestId={guest.id}
      guestName={guest.name}
      token={token}
    />
  )}
</div>
      </div>
    </main>
  )
}