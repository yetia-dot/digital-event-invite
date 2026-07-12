'use client'

import AgendaWhatToExpect from '../components/AgendaWhatToExpect'
import Gifts from '../components/Gifts'
import Hero from '../components/Hero'
import LocationRsvp from '../components/LocationRsvp'
import Navbar from '../components/Navbar'
import Portfolio from '../components/Portfolio'


export default function Home() {
  return (
    <main className="min-h-screen px-4" style={{ paddingTop: 0 }}>
      <div className="max-w-6xl mx-auto space-y-2">
        <Navbar />
        <Hero />
        <AgendaWhatToExpect />
        <LocationRsvp/>
        <Portfolio />
        <Gifts />
      </div>
    </main>
  )
}


