'use client'

import React from 'react'

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}): React.ReactElement | null {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.52)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        zIndex: 1000,
      }}
    >
      <div
        className="card-soft"
        style={{
          width: '100%',
          maxWidth: 560,
          padding: 18,
          background: 'rgba(255,255,255,0.92)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--brass-light)', fontWeight: 900 }}>
              {title}
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn ghost"
            style={{ padding: '8px 12px', fontSize: 13 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ marginTop: 14 }}>{children}</div>
      </div>
    </div>
  )
}

