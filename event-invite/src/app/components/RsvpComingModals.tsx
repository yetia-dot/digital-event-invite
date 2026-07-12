'use client'

import { useState } from 'react'
import { submitRsvpToGoogleSheets } from '../invite/actions'
import Modal from './Modal'

export default function RsvpComingModals() {
  const [openYes, setOpenYes] = useState(false)
  const [openNo, setOpenNo] = useState(false)

  const [nameYes, setNameYes] = useState('')
  const [phoneYes, setPhoneYes] = useState('')
  const [loadingYes, setLoadingYes] = useState(false)
  const [errorYes, setErrorYes] = useState('')

  const [nameNo, setNameNo] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [messageNo, setMessageNo] = useState('')
  const [loadingNo, setLoadingNo] = useState(false)
  const [errorNo, setErrorNo] = useState('')

  async function submitYes() {
    setLoadingYes(true)
    setErrorYes('')

    const phone = phoneYes.replace(/\D/g, '')

    const res = await submitRsvpToGoogleSheets({
      name: nameYes.trim(),
      phone,
      attending: true,
      guests: 1,
      message: '',
    })

    if (!res.success) {
      setErrorYes(res.error ?? 'Could not submit RSVP')
      setLoadingYes(false)
      return
    }

    setLoadingYes(false)
    setOpenYes(false)
  }

  async function submitNo() {
    setLoadingNo(true)
    setErrorNo('')

    const phone = phoneNo.replace(/\D/g, '')

    const res = await submitRsvpToGoogleSheets({
      name: nameNo.trim(),
      phone,
      attending: false,
      guests: 1,
      message: messageNo.trim(),
    })

    if (!res.success) {
      setErrorNo(res.error ?? 'Could not submit response')
      setLoadingNo(false)
      return
    }

    setLoadingNo(false)
    setOpenNo(false)
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => setOpenYes(true)} style={{ padding: '12px 22px' }}>
          Yes
        </button>
        <button className="btn ghost" onClick={() => setOpenNo(true)} style={{ padding: '12px 22px' }}>
          No
        </button>
      </div>

      <Modal open={openYes} title="Youre coming!" onClose={() => setOpenYes(false)}>
        <div className="form-row">
          <div className="field full">
            <label>Name</label>
            <input value={nameYes} onChange={(e) => setNameYes(e.target.value)} placeholder="Your name" />
          </div>
          <div className="field full">
            <label>Number</label>
            <input
              value={phoneYes}
              onChange={(e) => setPhoneYes(e.target.value)}
              placeholder="Phone number"
              inputMode="numeric"
            />
          </div>
        </div>

        {errorYes ? <p style={{ color: 'var(--maroon)', fontWeight: 800, marginTop: 10 }}>{errorYes}</p> : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            className="btn"
            onClick={submitYes}
            disabled={loadingYes || !nameYes.trim() || !phoneYes.trim()}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            {loadingYes ? 'Saving...' : 'Submit'}
          </button>
          <button
            className="btn ghost"
            onClick={() => setOpenYes(false)}
            disabled={loadingYes}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal open={openNo} title="Can&#39;t make it" onClose={() => setOpenNo(false)}>
        <p style={{ color: 'var(--muted-dark)', lineHeight: 1.7, fontWeight: 700 }}>
          owww, we would have loved your presence.
        </p>

        <div className="form-row" style={{ marginTop: 12 }}>
          <div className="field full">
            <label>Name</label>
            <input value={nameNo} onChange={(e) => setNameNo(e.target.value)} placeholder="Your name" />
          </div>
          <div className="field full">
            <label>Number</label>
            <input
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Phone number"
              inputMode="numeric"
            />
          </div>
          <div className="field full">
            <label>Warm wish (optional)</label>
            <textarea
              rows={4}
              value={messageNo}
              onChange={(e) => setMessageNo(e.target.value)}
              placeholder="Write a warm message..."
            />
          </div>
        </div>

        {errorNo ? <p style={{ color: 'var(--maroon)', fontWeight: 800, marginTop: 10 }}>{errorNo}</p> : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            className="btn"
            onClick={submitNo}
            disabled={loadingNo || !nameNo.trim() || !phoneNo.trim()}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            {loadingNo ? 'Saving...' : 'Submit'}
          </button>
          <button
            className="btn ghost"
            onClick={() => setOpenNo(false)}
            disabled={loadingNo}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

