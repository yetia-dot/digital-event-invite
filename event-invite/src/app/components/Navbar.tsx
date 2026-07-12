'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30">
      <div
        style={{
          position: 'sticky',
          padding: 8,
          top: 0,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255,255,255,0.0)',
          borderBottom: '1px solid rgba(18,24,27,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <nav style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn ghost" href="/invite">
            Invite
          </Link>
          <Link className="btn ghost" href="/portfolio">
            Portfolio
          </Link>
          <Link className="btn ghost" href="/gifts" >
            Gifts
          </Link>
        </nav>
      </div>
    </header>
  )
}

