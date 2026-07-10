'use client'

import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import { createEventWithAgendaAndWishlist } from './actions'
import type { CreateEventFormValues } from './actions'




function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

type AgendaDraft = {
  clientId: string
  title: string
  description: string
  startTime: string
  orderIndex: number
}

type WishlistDraft = {
  clientId: string
  name: string
  description: string
  priceRange: string
}

export default function NewAdminEventPage() {
  const [pending, startTransition] = useTransition()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('') // datetime-local value
  const [location, setLocation] = useState('')

  const [agenda, setAgenda] = useState<AgendaDraft[]>([
    {
      clientId: uid('ag'),
      title: '',
      description: '',
      startTime: '',
      orderIndex: 0,
    },
  ])

  const [wishlist, setWishlist] = useState<WishlistDraft[]>([
    {
      clientId: uid('wl'),
      name: '',
      description: '',
      priceRange: '',
    },
  ])

  const [formError, setFormError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  const minDateError = useMemo(() => {
    if (!date) return ''
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return 'Invalid date.'
    return ''
  }, [date])

  function updateAgenda(clientId: string, patch: Partial<AgendaDraft>) {
    setAgenda((prev) => prev.map((x) => (x.clientId === clientId ? { ...x, ...patch } : x)))
  }

  function addAgendaItem() {
    setAgenda((prev) => {
      const nextIndex = prev.length
      return [
        ...prev,
        {
          clientId: uid('ag'),
          title: '',
          description: '',
          startTime: '',
          orderIndex: nextIndex,
        },
      ]
    })
  }

  function removeAgendaItem(clientId: string) {
    setAgenda((prev) => {
      const filtered = prev.filter((x) => x.clientId !== clientId)
      // Recompute order indices based on array position
      return filtered.map((x, idx) => ({ ...x, orderIndex: idx }))
    })
  }

  function updateWishlist(clientId: string, patch: Partial<WishlistDraft>) {
    setWishlist((prev) => prev.map((x) => (x.clientId === clientId ? { ...x, ...patch } : x)))
  }

  function addWishlistItem() {
    setWishlist((prev) => [
      ...prev,
      { clientId: uid('wl'), name: '', description: '', priceRange: '' },
    ])
  }

  function removeWishlistItem(clientId: string) {
    setWishlist((prev) => prev.filter((x) => x.clientId !== clientId))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setFormError('')
    setSuccess(false)

    if (!title.trim()) return setFormError('Event title is required.')
    if (!description.trim()) return setFormError('Event description is required.')
    if (!date) return setFormError('Event date is required.')
    if (minDateError) return setFormError(minDateError)
    if (!location.trim()) return setFormError('Event location is required.')

    const values: CreateEventFormValues = {
      title,
      description,
      date,
      location,
      agenda: agenda.map((a) => ({
        title: a.title,
        description: a.description,
        startTime: a.startTime,
        orderIndex: a.orderIndex,
      })),
      wishlist: wishlist.map((w) => ({
        name: w.name,
        description: w.description,
        priceRange: w.priceRange,
      })),
    }

    startTransition(async () => {
      await createEventWithAgendaAndWishlist(values)
      // Server action redirects on success.
      setSuccess(true)
    })
  }

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <p className="text-amber-600 font-medium tracking-wide uppercase text-sm">Admin</p>
          <h1 className="text-3xl font-bold text-gray-800">Create Event</h1>
          <p className="text-gray-600">Add event details, program agenda, and gift wishlist.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <section className="space-y-3">
              <h2 className="font-semibold text-gray-800">Event</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">Title</span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="e.g. Summer Wedding"
                    required
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">Location</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="e.g. The Garden Hall"
                    required
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">Date & time</span>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </label>

                <div className="flex items-end">
                  <p className="text-xs text-gray-500">
                    Times are stored in ISO format.
                  </p>
                </div>
              </div>

              <label className="space-y-1 block">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                  placeholder="Write a short message for your guests..."
                  required
                />
              </label>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-800">Program (Agenda)</h2>
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="text-sm bg-amber-400 hover:bg-amber-500 text-white px-3 py-2 rounded-xl transition"
                >
                  + Add agenda item
                </button>
              </div>

              <div className="space-y-4">
                {agenda.map((item, idx) => (
                  <div key={item.clientId} className="border border-gray-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Agenda #{idx + 1}</p>
                        <p className="text-xs text-gray-500">Displayed in the order you add items.</p>
                      </div>
                      {agenda.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAgendaItem(item.clientId)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="space-y-1">
                        <span className="text-sm font-medium text-gray-700">Start time</span>
                        <input
                          type="time"
                          value={item.startTime}
                          onChange={(e) => updateAgenda(item.clientId, { startTime: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          placeholder="18:30"
                        />
                      </label>

                      <label className="space-y-1">
                        <span className="text-sm font-medium text-gray-700">Title</span>
                        <input
                          value={item.title}
                          onChange={(e) => updateAgenda(item.clientId, { title: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          placeholder="e.g. Welcome drinks"
                        />
                      </label>
                    </div>

                    <label className="space-y-1 block">
                      <span className="text-sm font-medium text-gray-700">Description</span>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateAgenda(item.clientId, { description: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                        placeholder="Optional details..."
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-800">Gift Wishlist</h2>

                <button
                  type="button"
                  onClick={addWishlistItem}
                  className="text-sm bg-amber-400 hover:bg-amber-500 text-white px-3 py-2 rounded-xl transition"
                >
                  + Add wishlist item
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  Tip: after creating the event, come back here to create guest invite links.
                </p>
              </div>


              <div className="space-y-4">
                {wishlist.map((item, idx) => (
                  <div key={item.clientId} className="border border-gray-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Wishlist #{idx + 1}</p>
                        <p className="text-xs text-gray-500">Guests reserve items without revealing identity.</p>
                      </div>
                      {wishlist.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWishlistItem(item.clientId)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="space-y-1">
                        <span className="text-sm font-medium text-gray-700">Item name</span>
                        <input
                          value={item.name}
                          onChange={(e) => updateWishlist(item.clientId, { name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          placeholder="e.g. KitchenAid mixer"
                        />
                      </label>

                      <label className="space-y-1">
                        <span className="text-sm font-medium text-gray-700">Price range</span>
                        <input
                          value={item.priceRange}
                          onChange={(e) => updateWishlist(item.clientId, { priceRange: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          placeholder="$50-$150"
                        />
                      </label>
                    </div>

                    <label className="space-y-1 block">
                      <span className="text-sm font-medium text-gray-700">Description</span>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateWishlist(item.clientId, { description: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                        placeholder="Optional details..."
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex items-center justify-between gap-4 pt-2">
              <Link
                href="/admin/events"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Cancel
              </Link>


              <button
                type="submit"
                disabled={pending}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-xl transition"
              >
                {pending ? 'Creating...' : 'Create event'}
              </button>
            </div>
          </form>

          {success && <p className="text-green-600 text-sm mt-4">Event created.</p>}
        </div>

        {/* Guests UI (only works after event exists). We keep it visually on the page but guard with eventId. */}
        {/* Current flow redirects to /admin/events/[eventId], so this section is mostly for when you wire a multi-step flow later. */}
      </div>
    </main>
  )
}


