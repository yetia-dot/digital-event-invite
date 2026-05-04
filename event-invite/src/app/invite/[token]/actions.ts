'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

// Handle RSVP submission
export async function submitRsvp(guestId: string, attending: boolean, token: string) {
  const { error } = await supabase
    .from('rsvps')
    .insert({
      id: crypto.randomUUID(),
      guest_id: guestId,
      attending,
      responded_at: new Date().toISOString()
    })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/invite/${token}`)
  return { success: true }
}

// Handle leaving a message (when not attending)
export async function submitMessage(guestId: string, content: string, token: string) {
  const { error } = await supabase
    .from('messages')
    .insert({
      id: crypto.randomUUID(),
      guest_id: guestId,
      content,
      created_at: new Date().toISOString()
    })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/invite/${token}`)
  return { success: true }
}

// Handle wishlist reservation
export async function reserveWishlistItem(itemId: string, token: string) {
  const { error } = await supabase
    .from('wishlist_items')
    .update({
      is_reserved: true,
      reserved_at: new Date().toISOString()
    })
    .eq('id', itemId)
    .eq('is_reserved', false) // safety: only reserve if still available

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/invite/${token}`)
  return { success: true }
}
// Attending: save RSVP and revalidate immediately
export async function submitRsvpAttending(guestId: string, token: string) {
  const { error } = await supabase
    .from('rsvps')
    .insert({
      id: crypto.randomUUID(),
      guest_id: guestId,
      attending: true,
      responded_at: new Date().toISOString()
    })

  if (error) return { success: false, error: error.message }

  revalidatePath(`/invite/${token}`)
  return { success: true }
}

// Declined: save RSVP + optional message in one go, then revalidate
export async function submitRsvpDeclinedWithMessage(
  guestId: string,
  message: string,
  token: string
) {
  const { error: rsvpError } = await supabase
    .from('rsvps')
    .insert({
      id: crypto.randomUUID(),
      guest_id: guestId,
      attending: false,
      responded_at: new Date().toISOString()
    })

  if (rsvpError) return { success: false, error: rsvpError.message }

  // Only insert message if they wrote one
  if (message.trim()) {
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        id: crypto.randomUUID(),
        guest_id: guestId,
        content: message.trim(),
        created_at: new Date().toISOString()
      })

    if (msgError) return { success: false, error: msgError.message }
  }

  revalidatePath(`/invite/${token}`)
  return { success: true }
}