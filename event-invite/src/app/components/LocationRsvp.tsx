'use client'

import { useState } from 'react'
import { submitRsvpToGoogleSheets } from '../invite/actions'

export default function LocationRsvp() {
  const GOOGLE_MAPS_LOCATION_URL = 'https://www.google.com/maps?q=8.999247,38.840951'

  // Form State
  const [isGoing, setIsGoing] = useState<boolean | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  
  // Status States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isGoing === null || !name.trim() || !phone.trim()) return

    setLoading(true)
    setError('')

    const cleanPhone = phone.replace(/\D/g, '')

    // Phone validation: 10 digits starting with 09 or 07
    if (!/^(09|07)\d{8}$/.test(cleanPhone)) {
      setLoading(false)
      setError('Phone number must be 10 digits and start with 09 or 07.')
      return
    }

    try {
      const res = await submitRsvpToGoogleSheets({
        name: name.trim(),
        phone: cleanPhone,
        attending: isGoing,
        guests: 1,
        message: isGoing ? '' : message.trim(),
      })

      if (!res.success) {
        setError(res.error ?? 'Could not submit your response. Please try again.')
        setLoading(false)
        return
      }

      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      setError('An unexpected connection error occurred.')
      setLoading(false)
    }
  }

  // Reset function if they want to edit their response before leaving
  const resetFormSelection = () => {
    setIsGoing(null)
    setName('')
    setPhone('')
    setMessage('')
    setError('')
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-[#1E1E1C]/60 rounded-2xl border border-stone-200/10 backdrop-blur-md">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Location details & Map Trigger */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-medium block mb-2">
              The Venue
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-[#F9F6F0] font-light tracking-wide">
              Where to Find Us
            </h2>
          </div>
          
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
            The celebration will take place in Addis Ababa. Click the map preview below to pull up exact coordinates and driving directions via Google Maps.
          </p>

          {/* Styled Map Card Link (only after RSVP confirmation + going === true) */}
          {submitted && isGoing === true ? (
            <a
              href={GOOGLE_MAPS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative h-48 w-full rounded-xl overflow-hidden border border-stone-200/20 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://picsum.photos/seed/addismap/600/400')` }}
              />
              <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/50 transition-colors flex flex-col items-center justify-center text-center p-4">
                <span className="bg-[#F9F6F0] text-stone-900 text-xs uppercase tracking-widest px-4 py-2 rounded-full font-semibold shadow transition-transform group-hover:scale-105">
                  Open in Google Maps ↗
                </span>
                <span className="text-[10px] text-stone-200 tracking-wider mt-2 font-mono">
                  Lat: 8.9992, Long: 38.8409
                </span>
              </div>
            </a>
          ) : (
            <div
              className="block relative h-48 w-full rounded-xl overflow-hidden border border-stone-200/20 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.35)' }}
            >
              <div className="h-full w-full flex flex-col items-center justify-center text-center p-4">
                <span className="text-[12px] text-stone-500 dark:text-stone-400 font-semibold">
                  Exact location unlocks after you confirm you&apos;re coming.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: RSVP Action Frame */}
        <div className="bg-[#FAF9F5] dark:bg-[#242422] p-8 rounded-xl border border-stone-200/10 shadow-sm flex flex-col justify-center min-h-[340px]">
          {!submitted ? (
            <form onSubmit={handleRsvpSubmit} className="space-y-5">
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl text-stone-800 dark:text-[#E6E4DE] mb-1 font-light">
                  Are you joining us?
                </h3>
                <p className="text-xs text-stone-400 tracking-wide font-light">
                  Please respond by July 15th to finalize attendance data.
                </p>
              </div>

              {/* Attendance Toggle Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setIsGoing(true); setError(''); }}
                  disabled={loading}
                  className={`py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 font-medium border ${
                    isGoing === true 
                      ? 'bg-[#C9A227] border-[#C9A227] text-white shadow-sm' 
                      : 'border-stone-300/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => { setIsGoing(false); setError(''); }}
                  disabled={loading}
                  className={`py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 font-medium border ${
                    isGoing === false 
                      ? 'bg-stone-600 border-stone-600 text-white shadow-sm' 
                      : 'border-stone-300/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>

              {/* Dynamic Information Input Form Fields */}
              {isGoing !== null && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-medium pl-1">Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      disabled={loading}
                      className="w-full bg-white dark:bg-[#1E1E1C] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227] transition-colors disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-medium pl-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 09xxxxxxxx or 07xxxxxxxx"
                      inputMode="numeric"
                      required
                      disabled={loading}
                      className="w-full bg-white dark:bg-[#1E1E1C] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227] transition-colors disabled:opacity-60"
                    />
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 font-light">
                      Must be 10 digits and start with 09 or 07.
                    </p>
                  </div>

                  {/* Show warm wish input only if declining */}
                  {isGoing === false && (
                    <div className="animate-fade-in">
                      <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-medium pl-1">Warm Wish (Optional)</label>
                      <textarea 
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a warm message..."
                        disabled={loading}
                        className="w-full bg-white dark:bg-[#1E1E1C] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227] transition-colors resize-none disabled:opacity-60"
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold text-center pt-1 pl-1">
                      {error}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={loading || !name.trim() || !phone.trim()}
                    className="w-full bg-stone-900 dark:bg-[#F9F6F0] text-white dark:text-stone-900 text-xs uppercase tracking-widest py-3 rounded-full font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Submit Response'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* Thank You / Success Panel */
            <div className="text-center space-y-4 py-8 animate-fade-in">
              <span className="text-4xl block">{isGoing ? '✅' : '✉️'}</span>
              <h3 className="font-serif text-2xl text-stone-800 dark:text-[#E6E4DE] font-light">
                {isGoing ? "You're coming!" : 'Warm Wishes'}
              </h3>

              <p className="text-sm text-stone-500 dark:text-stone-400 font-light max-w-xs mx-auto leading-relaxed">
                {isGoing
                  ? "Your RSVP is confirmed. The exact Google Maps location is now unlocked."
                  : "Owww, we would have loved your presence. Thank you for letting us know—your sweet notes mean the world!"}
              </p>

              {isGoing ? (
                <>
                  <a
                    href={GOOGLE_MAPS_LOCATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-stone-900 dark:bg-[#F9F6F0] text-white dark:text-stone-900 text-xs uppercase tracking-widest py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                  >
                    Open exact Google Maps location
                    <span aria-hidden className="ml-2">
                      →
                    </span>
                  </a>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-mono leading-relaxed">
                    Address: Summit near Cambridge Academy
                  </div>
                </>
              ) : null}

              <button
                type="button"
                onClick={resetFormSelection}
                className="text-[11px] uppercase tracking-wider text-[#C9A227] hover:underline pt-4 block mx-auto font-medium"
              >
                Change response
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}