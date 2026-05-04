'use client'

import { useState } from 'react'
import { submitRsvpAttending, submitRsvpDeclinedWithMessage } from './actions'

interface Props {
  guestId: string
  guestName: string
  token: string
}

export default function RsvpForm({ guestId, guestName, token }: Props) {
  const [step, setStep] = useState<'initial' | 'declined' | 'done'>('initial')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAttending() {
    setLoading(true)
    const result = await submitRsvpAttending(guestId, token)
    if (result.success) {
      setStep('done')
    } else {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // No server call yet — just update local state
  function handleDeclined() {
    setStep('declined')
  }

  async function handleMessageSubmit(skip: boolean) {
    setLoading(true)
    const result = await submitRsvpDeclinedWithMessage(
      guestId,
      skip ? '' : message,
      token
    )
    if (result.success) {
      setStep('done')
    } else {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <p className="text-green-600 font-medium">
        ✅ Thank you, {guestName}! Your response has been recorded.
      </p>
    )
  }

  if (step === 'declined') {
    return (
      <div className="space-y-3">
        <p className="text-gray-600">
          We'll miss you! Would you like to leave a message? 💌
        </p>
        <textarea
          className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
          rows={4}
          placeholder="Write your congratulatory message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            onClick={() => handleMessageSubmit(false)}
            disabled={loading || !message.trim()}
            className="flex-1 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 
                       text-white font-medium py-3 rounded-xl transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          <button
            onClick={() => handleMessageSubmit(true)}
            disabled={loading}
            className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50
                       text-gray-600 font-medium py-3 rounded-xl transition"
          >
            Skip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleAttending}
          disabled={loading}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 
                     text-white font-medium py-3 rounded-xl transition"
        >
          {loading ? 'Saving...' : "Yes, I'll be there! 🎉"}
        </button>
        <button
          onClick={handleDeclined}
          disabled={loading}
          className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 
                     text-gray-700 font-medium py-3 rounded-xl transition"
        >
          Sorry, I can't make it
        </button>
      </div>
    </div>
  )
}