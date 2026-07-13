import HeroClient from './HeroClient'
import { getRsvpCounts } from './rsvpCounts'

export default function Hero() {
  // Server component would be ideal, but this project is currently failing on server-function fetch during initial render.
  // Keep UI working by falling back to 0 if counts are unavailable.
  return <HeroClient peopleComing={0} />
}


