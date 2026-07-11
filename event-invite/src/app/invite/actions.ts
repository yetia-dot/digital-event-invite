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

