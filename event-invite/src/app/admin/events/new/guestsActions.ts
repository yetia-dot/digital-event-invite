'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin'

import { revalidatePath } from 'next/cache'

type CreateGuestsInput = {
  eventId: string
  names: string[]
}

function normalizeName(raw: string) {
  return raw.replace(/\s+/g, ' ').trim()
}

function generateInviteToken() {
  // Works in Node runtime used by server actions (Next.js).
  return crypto.randomUUID()
}

export async function createGuestsWithInviteTokens({ eventId, names }: CreateGuestsInput) {
  const cleaned = names
    .map(normalizeName)
    .filter(Boolean)

  // De-dupe case-insensitively but preserve original display casing.
  const seen = new Set<string>()
  const uniqueNames: string[] = []
  for (const n of cleaned) {
    const key = n.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    uniqueNames.push(n)
  }

  if (!uniqueNames.length) {
    return { success: false as const, error: 'No guest names provided.' }
  }

  const payload = uniqueNames.map((name) => ({
    event_id: eventId,
    name,
    invite_token: generateInviteToken(),
  }))

  const { data, error } = await supabaseAdmin
    .from('guests')
    .insert(payload)
    .select('id, name, invite_token')


  if (error) {
    return { success: false as const, error: error.message }
  }

  // If you have an admin event detail page that shows counts, update it.
  revalidatePath(`/admin/events/${eventId}`)

  return {
    success: true as const,
    guests: (data ?? []).map((g) => ({
      id: String(g.id),
      name: g.name as string,
      inviteToken: g.invite_token as string,
    })),
  }
}

