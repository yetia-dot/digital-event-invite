'use server'

import { getRsvpCountsFromGoogleSheets, type RsvpCounts } from '../invite/actions'

export { type RsvpCounts }

export async function getRsvpCounts(): Promise<RsvpCounts> {
  return getRsvpCountsFromGoogleSheets()
}



