'use server'

const GOOGLE_MAPS_LOCATION_URL = 'https://www.google.com/maps?q=8.999247,38.840951'

export type RsvpInput = {
  name: string
  phone: string
  attending: boolean
  guests?: number
  message?: string
}

export async function submitRsvpToGoogleSheets(input: RsvpInput) {
  const url = process.env.GOOGLE_SHEETS_APPS_SCRIPT_URL
  if (!url) {
    return {
      success: false as const,
      error:
        'Missing GOOGLE_SHEETS_APPS_SCRIPT_URL in the server environment variables.',
    }
  }

  const payload = {
    action: 'rsvp',
    name: input.name,
    phone: input.phone,
    attending: input.attending ? 'yes' : 'no',
    guests: input.guests ?? 1,
    message: input.message ?? '',
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Apps Script is public; no credentials/cookies needed.
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      return {
        success: false as const,
        error: `Google Sheets backend returned HTTP ${res.status}`,
      }
    }

    if (!data || data.ok !== true) {
      return {
        success: false as const,
        error: data?.error ? String(data.error) : 'Unknown Google Sheets error',
      }
    }

    return { success: true as const, locationUrl: GOOGLE_MAPS_LOCATION_URL }
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

export type RsvpCounts = {
  peopleComing: number
  giftsReserved: number
}

export type RsvpNamesResponse = {
  ok: true
  peopleComingNames: string[]
} | null

export async function getRsvpNamesFromGoogleSheets(): Promise<string[]> {
  const url = process.env.GOOGLE_SHEETS_APPS_SCRIPT_URL
  if (!url) return []

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'rsvp_names' }),
    })

    const data = (await res.json().catch(() => null)) as
      | { ok?: unknown; peopleComingNames?: unknown }
      | null

    if (!res.ok || !data || data.ok !== true) return []

    const namesRaw = Array.isArray(data.peopleComingNames) ? data.peopleComingNames : []

    return namesRaw
      .map((n) => (typeof n === 'string' ? n.trim() : ''))
      .filter(Boolean)
  } catch {
    return []
  }
}

export async function getRsvpCountsFromGoogleSheets(): Promise<RsvpCounts> {
  const url = process.env.GOOGLE_SHEETS_APPS_SCRIPT_URL
  if (!url) {
    return {
      peopleComing: 0,
      giftsReserved: 0,
    }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'rsvp_counts' }),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      return { peopleComing: 0, giftsReserved: 0 }
    }

    // Expected shape: { ok: true, peopleComing: number, giftsReserved: number }
    if (!data || data.ok !== true) {
      return { peopleComing: 0, giftsReserved: 0 }
    }

    const peopleComing = Number(data.peopleComing ?? 0)
    const giftsReserved = Number(data.giftsReserved ?? 0)

    return {
      peopleComing: Number.isFinite(peopleComing) ? peopleComing : 0,
      giftsReserved: Number.isFinite(giftsReserved) ? giftsReserved : 0,
    }
  } catch {
    return { peopleComing: 0, giftsReserved: 0 }
  }
}





