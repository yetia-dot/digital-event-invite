'use client'

import { useMemo, useState, useTransition } from 'react'

function dedupeTrimmedLines(lines: string[]) {
  const cleaned = lines.map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
  const seen = new Set<string>()
  const out: string[] = []
  for (const n of cleaned) {
    const key = n.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(n)
  }
  return out
}

export type GuestPreview = {
  name: string
  key: string
}

export default function GuestsUi({
  eventId,
  siteUrl,
  createGuestsWithInviteTokens,
}: {
  eventId: string
  siteUrl: string
  createGuestsWithInviteTokens: (args: {
    eventId: string
    names: string[]
  }) => Promise<{
    success: true
    guests: Array<{ id: string; name: string; inviteToken: string }>
  } | { success: false; error: string }>
}) {
  const [text, setText] = useState('')
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [created, setCreated] = useState<
    Array<{ id: string; name: string; inviteToken: string }>
  >([])

  const lines = useMemo(() => {
    return text
      .split(/\r?\n/g)
      .map((l) => l.trim())
      .filter(Boolean)
  }, [text])

  const uniqueNames = useMemo(() => dedupeTrimmedLines(lines), [lines])

  const preview: GuestPreview[] = useMemo(() => {
    return uniqueNames.slice(0, 30).map((name) => ({
      name,
      key: name.toLowerCase(),
    }))
  }, [uniqueNames])

  const inviteLinksText = useMemo(() => {
    const base = siteUrl.replace(/\/$/, '')
    return created
      .map((g) => `${g.name}: ${base}/invite/${g.inviteToken}`)
      .join('\n')
  }, [created, siteUrl])

  async function handleCreate() {
    setError('')
    setCreated([])

    const names = uniqueNames
    if (!names.length) {
      setError('Paste at least one guest name (one per line).')
      return
    }

    startTransition(async () => {
      const res = await createGuestsWithInviteTokens({ eventId, names })
      if (!res.success) {
        setError(res.error)
        return
      }
      setCreated(res.guests)
    })
  }

  return (
    <section className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-800">Invite guests</h2>
          <p className="text-sm text-gray-600 mt-1">
            Paste names (one per line). We’ll generate a unique invite link for
            each guest.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Unique names: </div>
          <div className="text-sm font-semibold text-gray-800">{uniqueNames.length}</div>
        </div>
      </div>

      <label className="space-y-1 block">
        <span className="text-sm font-medium text-gray-700">Guest names</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
          placeholder={'e.g.\nAlex\nSamantha\nJordan'}
        />
      </label>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-800">Preview</div>
        {uniqueNames.length ? (
          <div className="flex flex-wrap gap-2">
            {preview.map((p) => (
              <span
                key={p.key}
                className="text-xs bg-white border border-gray-200 text-gray-800 px-2 py-1 rounded-full"
              >
                {p.name}
              </span>
            ))}
            {uniqueNames.length > 30 ? (
              <span className="text-xs text-gray-500 self-center">
                + {uniqueNames.length - 30} more
              </span>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-gray-500">Nothing to preview yet.</div>
        )}
      </div>

      {error ? <p className="text-red-600 text-sm">{error}</p> : null}

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={handleCreate}
          disabled={pending || !uniqueNames.length}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-xl transition"
        >
          {pending ? 'Generating...' : 'Create invite links'}
        </button>
      </div>

      {created.length ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-gray-800">Copy invite links</h3>
              <p className="text-sm text-gray-600 mt-1">
                You can paste this into emails/DMs. Format: <span className="font-mono">Name: link</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Created: </div>
              <div className="text-sm font-semibold text-gray-800">{created.length}</div>
            </div>
          </div>

          <textarea
            value={inviteLinksText}
            readOnly
            rows={7}
            className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none resize-none bg-white"
          />

          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(inviteLinksText)
            }}
            className="text-sm border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold px-4 py-2 rounded-xl transition"
          >
            Copy to clipboard
          </button>
        </div>
      ) : null}
    </section>
  )
}

