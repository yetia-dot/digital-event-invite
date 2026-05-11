'use server'

import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export type CreateEventFormValues = {
  title: string
  description: string
  date: string
  location: string
  agenda: Array<{
    title: string
    description: string
    startTime: string
    orderIndex: number
  }>
  wishlist: Array<{
    name: string
    description: string
    priceRange: string
  }>
}

function normalizeDateInput(date: string) {
  // Accepts datetime-local string (YYYY-MM-DDTHH:mm)
  // Store as ISO.
  const d = new Date(date)
  return d.toISOString()
}

export async function createEventWithAgendaAndWishlist(values: CreateEventFormValues) {
  const title = values.title.trim()
  const description = values.description.trim()
  const location = values.location.trim()

  const eventDateIso = normalizeDateInput(values.date)

  const { data: eventRow, error: eventError } = await supabase
    .from('events')
    .insert({
      title,
      description,
      date: eventDateIso,
      location,
    })
    .select('*')
    .single()

  if (eventError) {
    return { success: false as const, error: eventError.message }
  }

  const eventId = eventRow.id as string

  // Insert agenda items
  if (values.agenda.length) {
    const agendaPayload = values.agenda
      .filter((x) => x.title.trim())
      .map((x) => ({
        event_id: eventId,
        title: x.title.trim(),
        description: x.description.trim(),
        start_time: new Date(x.startTime).toISOString(),
        order_index: x.orderIndex,
      }))

    const { error: agendaError } = await supabase.from('agenda_items').insert(agendaPayload)
    if (agendaError) {
      return { success: false as const, error: agendaError.message }
    }
  }

  // Insert wishlist items
  if (values.wishlist.length) {
    const wishlistPayload = values.wishlist
      .filter((x) => x.name.trim())
      .map((x) => ({
        event_id: eventId,
        name: x.name.trim(),
        description: x.description.trim(),
        price_range: x.priceRange.trim(),
        is_reserved: false,
      }))

    const { error: wishlistError } = await supabase.from('wishlist_items').insert(wishlistPayload)
    if (wishlistError) {
      return { success: false as const, error: wishlistError.message }
    }
  }

  redirect(`/admin/events/${eventId}`)
}

