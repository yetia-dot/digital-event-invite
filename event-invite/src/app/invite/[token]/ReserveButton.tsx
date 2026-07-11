'use client'

import { useState } from 'react'
import { reserveWishlistItem } from './actions'

interface Props {
  itemId: string
  token: string
}

export default function ReserveButton({ itemId, token }: Props) {
  const [loading, setLoading] = useState(false)
  const [reserved, setReserved] = useState(false)
  const [error, setError] = useState('')

  async function handleReserve() {
    setLoading(true)
    const result = await reserveWishlistItem(itemId, token)
    if (result.success) {
      setReserved(true)
    } else {
      setError('Could not reserve. Try again.')
    }
    setLoading(false)
  }

  if (reserved) {
    return (
      <span className="pill reserved">
        Reserved ✓
      </span>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
      <button
        onClick={handleReserve}
        disabled={loading}
        className="btn"
        style={{ padding: '10px 18px', fontSize: 13, background: 'var(--maroon)', color: 'var(--ivory)' }}
      >
        {loading ? '...' : 'Reserve'}
      </button>
      {error ? (
        <p style={{ color: 'var(--maroon)', fontWeight: 700, fontSize: 12 }}>{error}</p>
      ) : null}
    </div>
  )
}
