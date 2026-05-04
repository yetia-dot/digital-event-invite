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
      <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
        Reserved ✓
      </span>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleReserve}
        disabled={loading}
        className="text-xs bg-amber-400 hover:bg-amber-500 disabled:opacity-50 
                   text-white px-3 py-1 rounded-full transition"
      >
        {loading ? '...' : 'Reserve'}
      </button>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}