import Link from 'next/link'
import { getRsvpNamesFromGoogleSheets } from '../invite/actions'

export default async function RsvpNamesPage() {
  const names = await getRsvpNamesFromGoogleSheets()

  return (
    <main className="min-h-screen px-4 py-10" style={{ backgroundColor: 'var(--bg-parchment)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="eyebrow">RSVPs</div>
          <h1 className="hx">People who are coming</h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm font-light">
            Showing {names.length} RSVP{names.length === 1 ? '' : 's'} from the Google Sheet.
          </p>
        </div>

        <section className="card-soft" style={{ padding: 24 }}>
          {names.length === 0 ? (
            <p className="text-stone-600 dark:text-stone-400 font-light">
              No RSVPs yet.
            </p>
          ) : (
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 10,
              }}
            >
              {names.map((name, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className="card-soft"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(13, 68, 45, 0.06)',
                  }}
                >
                  <div style={{ fontWeight: 900, color: 'var(--ink)', fontSize: 14 }}>{name}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-center">
          <Link
            href="/"
            className="btn"
            style={{
              textDecoration: 'none',
              padding: '12px 26px',
              borderRadius: 999,
            }}
          >
            Back to event
          </Link>
        </div>
      </div>
    </main>
  )
}

