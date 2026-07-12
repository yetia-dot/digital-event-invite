'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type ChatPopupStep = {
  id: string
  text: string
  delayMs: number
}

export default function GiftChatWidget() {
  const steps = useMemo<ChatPopupStep[]>(
    () => [
      {
        id: 's1',
        text: "hey, i have come to realize that i might be a bit difficult person to piick a gift for",
        delayMs: 450,
      },
      {
        id: 's2',
        text: 'I know its the thought that counts',
        delayMs: 1250,
      },
      {
        id: 's3',
        text: 'but i blv gifts should be either something i could remember you by or something i could make a good use out of',
        delayMs: 2050,
      },
      {
        id: 's4',
        text: "so incase you wanted to bring along something but couldnt decide what, heres a list of things on my wishlist",
        delayMs: 2900,
      },
      {
        id: 's5',
        text: 'pick and reserve one of your choice, so as to avoid repetitions',
        delayMs: 3700,
      },
      {
        id: 's6',
        text: 'no pressure,',
        delayMs: 4500,
      },
    ],
    []
  )

  const timersRef = useRef<number[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(true)
  const [currentText, setCurrentText] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])

  // Adds extra time between consecutive “notification” messages.
  // (Base delays are defined per step; we apply an additional offset per step.)
  const delayExtraPerStepMs = 900


  useEffect(() => {
    // schedule sequential reveal
    // (useEffect body remains side-effect-only to satisfy eslint rule)
    setTimeout(() => {
      setIsPopupVisible(true)
      setCurrentText('')
      setChatHistory([])
    }, 0)


    // clear any existing timers
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []

    steps.forEach((s, idx) => {
      const timer = window.setTimeout(() => {
        setCurrentText(s.text)
        setChatHistory((prev) => {
          // Avoid duplicates if effect re-runs while timers are still firing.
          if (prev[prev.length - 1] === s.text) return prev
          return [...prev, s.text]
        })

        if (idx === steps.length - 1) {
          window.setTimeout(() => {
            setIsPopupVisible(false)
          }, 1100)
        }
      }, s.delayMs + idx * delayExtraPerStepMs)
      timersRef.current.push(timer)
    })

    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }
  }, [steps])


  return (
    <div aria-label="Gift support chat">
      {isPopupVisible ? (
        <div
          style={{
            position: 'fixed',
            right: 18,
            bottom: 86,
            zIndex: 999,
            width: 320,
            maxWidth: 'calc(100vw - 36px)',
            padding: 12,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(18,24,27,0.10)',
            boxShadow: '0 16px 38px rgba(14,42,32,0.18)',
            backdropFilter: 'blur(10px)',
          }}
          role="status"
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                background: 'rgba(196,75,180,0.12)',
                border: '1px solid rgba(196,75,180,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}
              aria-hidden
            >
              ✨
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--brass)', fontWeight: 900 }}>
                wishlist chat
              </div>
              <div
                style={{
                  marginTop: 6,
                  color: 'var(--ink)',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  fontSize: 13,
                }}
              >
                {currentText}
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  className="btn ghost"
                  onClick={() => setIsPopupVisible(false)}
                  style={{ padding: '8px 10px', fontSize: 13, borderRadius: 999 }}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: 18,
          border: '1px solid rgba(18,24,27,0.10)',
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 16px 38px rgba(14,42,32,0.18)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        💬
      </button>

      {/* Minimal “chat open” panel (optional vibe) */}
      {isOpen ? (
        <div
          style={{
            position: 'fixed',
            right: 18,
            bottom: 86,
            zIndex: 999,
            width: 360,
            maxWidth: 'calc(100vw - 36px)',
            padding: 14,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(18,24,27,0.10)',
            boxShadow: '0 16px 38px rgba(14,42,32,0.18)',
            backdropFilter: 'blur(10px)',
          }}
          role="dialog"
          aria-modal="false"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--brass)', fontWeight: 900 }}>
                wishlist support
              </div>
              <div style={{ marginTop: 6, fontWeight: 900, color: 'var(--ink)' }}>
                Need help picking a gift?
              </div>
            </div>
            <button
              className="btn ghost"
              onClick={() => setIsOpen(false)}
              style={{ padding: '8px 10px', fontSize: 13, borderRadius: 999 }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              marginTop: 12,
              color: 'var(--muted-dark)',
              lineHeight: 1.6,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Reserve an item below, then tap <b>Details</b> for links.
            <div style={{ marginTop: 8 }}>(This is a friendly vibe widget—no real messaging backend.)</div>
          </div>

          <div
            style={{
              marginTop: 12,
              borderRadius: 12,
              border: '1px solid rgba(18,24,27,0.08)',
              background: 'rgba(255,255,255,0.55)',
              padding: 10,
              maxHeight: 220,
              overflowY: 'auto',
            }}
            aria-label="Chat messages"
          >
            {chatHistory.length === 0 ? (
              <div style={{ color: 'var(--muted-dark)', fontWeight: 800, fontSize: 13, lineHeight: 1.6 }}>
                Loading messages...
              </div>
            ) : (
              chatHistory.map((msg, i) => (
                <div key={`${i}-${msg}`} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 900, color: 'var(--brass-light)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                    wishlist chat
                  </div>
                  <div style={{ marginTop: 4, color: 'var(--ink)', fontWeight: 800, lineHeight: 1.35, fontSize: 13 }}>
                    {msg}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <button
              className="btn block"
              onClick={() => setIsOpen(false)}
              style={{ background: 'var(--ink-soft)', color: 'var(--ivory)', padding: '10px 16px', borderRadius: 999 }}
            >
              Got it
            </button>
          </div>

        </div>
      ) : null}
    </div>
  )
}

