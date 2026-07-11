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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ color: 'var(--muted-dark)', lineHeight: 1.7, fontWeight: 600 }}>
          We&apos;ll miss you! Would you like to leave a message? 💌
        </p>

        <textarea
          className="w-full resize-none"
          rows={4}
          placeholder="Write your congratulatory message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            border: '1px solid rgba(18,24,27,0.18)',
            background: '#fff',
            borderRadius: 2,
            padding: '11px 13px',
            color: 'var(--ink)',
            fontFamily: "'Inter',sans-serif",
            fontSize: 14,
            outline: 'none',
            minHeight: 110,
          }}
        />

        {error && (
          <p style={{ color: 'var(--maroon)', fontWeight: 700, fontSize: 13 }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => handleMessageSubmit(false)}
            disabled={loading || !message.trim()}
            className="btn"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          <button
            onClick={() => handleMessageSubmit(true)}
            disabled={loading}
            className="btn ghost"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Skip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {error && <p style={{ color: 'var(--maroon)', fontWeight: 700, fontSize: 13 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleAttending}
          disabled={loading}
          className="btn"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {loading ? 'Saving...' : 'Yes, I&apos;ll be there! 🎉'}
        </button>

        <button
          onClick={handleDeclined}
          disabled={loading}
          className="btn ghost"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          Sorry, I can&apos;t make it
        </button>
      </div>
    </div>
  )
}


