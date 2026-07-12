export type RsvpCounts = {
  peopleComing: number
  giftsReserved: number
}

// NOTE: Placeholder implementation.
// This repo currently submits RSVP data to a Google Sheets Apps Script via
// `submitRsvpToGoogleSheets`. There is no existing, client-callable endpoint
// for reading totals.
//
// Once the backend endpoint exists, replace this with a real fetch.
export async function getRsvpCounts(): Promise<RsvpCounts> {
  return {
    peopleComing: 0,
    giftsReserved: 0,
  }
}

