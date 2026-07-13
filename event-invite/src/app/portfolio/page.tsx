'use client'

import { useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'

const LINKS = {
  jami: 'https://jami.bio/yetia?nav=main',
  github: 'https://github.com/yetia-dot',
  linkedin: 'https://www.linkedin.com/in/yetnayet-aramde-949ba23a9/',
  email: 'yetnayetlakewaramde@gmail.com',
}

function TrackCard({
  title,
  subtitle,
  accent = 'var(--brass)',
  children,
}: {
  title: string
  subtitle?: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <article className="card-soft" style={{ padding: 22, position: 'relative' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 16,
          border: '1px solid rgba(18,24,27,0.08)',
          pointerEvents: 'none',
          boxShadow: '0 10px 26px rgba(18,24,27,0.08)',
          background:
            'linear-gradient(135deg, rgba(201,162,39,0.18), rgba(168,44,44,0.08), rgba(11,110,79,0.10))',
          opacity: 0.22,
          mixBlendMode: 'multiply',
        }}
      />

      <div style={{ position: 'relative' }}>
        <div className="mono" style={{ color: 'var(--brass-light)', fontSize: 12, fontWeight: 900 }}>
          <span style={{ color: accent }}>TRACK</span>
          {subtitle ? <span style={{ color: 'var(--brass-light)' }}> · {subtitle}</span> : null}
        </div>
        <h3 className="hx" style={{ marginTop: 10, fontSize: 26 }}>
          {title}
        </h3>
        <div style={{ marginTop: 14, lineHeight: 1.75, color: 'var(--muted-dark)', fontSize: 14 }}>
          {children}
        </div>
      </div>
    </article>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 10 }}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export default function PortfolioPage() {
  const heroImg = useMemo(() => 'https://picsum.photos/seed/portfolio-hero/1600/900', [])

  // Tiny enhancement: smooth scroll to anchors when using the track nav.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const a = target?.closest?.('a[data-scroll]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (!href.startsWith('#')) return
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', href)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <main className="min-h-screen py-10 px-4" style={{ backgroundColor: 'var(--bg-parchment)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        {/* HERO */}
        <section
          className="hero"
          style={{
            // CSS custom property
            ...( { ['--hero-img' as unknown as string]: `url('${heroImg}')` } as React.CSSProperties),
          }}
        >
          <div className="hero-content">
            <div className="eyebrow">Portfolio &amp; Highlights</div>
            <h1 className="hx">Software, Games, &amp; Stories</h1>
            <p className="hero-sub">
              I’m a multidisciplinary builder — currently finishing my B.Sc. in Software Engineering (AASTU).
              This page is a snapshot of the three lanes that feed into each other.
            </p>

            <div
              className="card-soft"
              style={{
                marginTop: 22,
                padding: 18,
                background: 'var(--surface-card)',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: 'var(--ink)',
                }}
              >
                Quick links
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12, alignItems: 'center' }}>
                <a className="btn" href={`mailto:${LINKS.email}?subject=Portfolio%20hello`} style={{ background: 'var(--maroon)' }}>
                  Email me

                  <span aria-hidden>→</span>
                </a>
                <a className="btn ghost" href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--brass-neon)' }}>
                  LinkedIn
                </a>
                <a className="btn ghost" href={LINKS.github} target="_blank" rel="noreferrer" style={{ color: 'var(--brass-neon)' }}>
                  GitHub
                </a>
                <a className="btn ghost" href={LINKS.jami} target="_blank" rel="noreferrer" style={{ color: 'var(--brass-neon)' }}>
                  More links
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="section-head">
            <div className="eyebrow">About</div>
            <h2 className="hx">The three-sides builder</h2>
          </div>

          <div className="card-soft" style={{ padding: 26 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 18,
                alignItems: 'start',
              }}
            >
              <div>
                <p style={{ margin: 0, color: 'var(--muted-dark)', fontSize: 15, lineHeight: 1.9, fontWeight: 650 }}>
                  I write software, I make games, and I run content that gets people to actually show up.
                  Currently finishing my B.Sc. in Software Engineering at Addis Ababa Science and Technology University —
                  I’ve led teams, taught hundreds of students, and shipped work across all three lanes.
                </p>
                <p style={{ margin: '14px 0 0', color: 'var(--muted-dark)', fontSize: 14, lineHeight: 1.8 }}>
                  If you have an opportunity that fits engineering, game dev, or content/social — I’d love an
                  introduction.
                </p>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Contact
                </div>
                <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 800, fontSize: 13 }}>Email</span>
                    <a className="btn ghost" style={{ padding: 0, borderRadius: 0, color: 'var(--ink)' }} href={`mailto:${LINKS.email}`}>
                      {LINKS.email}
                    </a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 800, fontSize: 13 }}>Phone</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 800, fontSize: 13 }}>+251 97 202 5684</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 800, fontSize: 13 }}>Location</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 800, fontSize: 13 }}>Addis Ababa, Ethiopia</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <a className="btn ghost" href={LINKS.jami} target="_blank" rel="noreferrer">
                      jami.bio/yetia
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, borderTop: '1px solid var(--ink-line)', paddingTop: 18 }}>
              <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                Jump to
              </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                <a className="btn" href="#software" data-scroll style={{ background: 'var(--ink)' }}>
                  Software Engineering
                </a>
                <a className="btn" href="#content" data-scroll style={{ background: 'var(--maroon)' }}>

                  Content &amp; Social
                </a>
                <a className="btn" href="#games" data-scroll style={{ background: 'var(--sage)' }}>

                  Game Development
                </a>
                <a className="btn" href="#awards" data-scroll style={{ background: 'var(--brass)' }}>
                  Awards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TRACKS */}
        <section id="software">
          <div className="section-head">
            <div className="eyebrow">1. Software Engineer</div>
            <h2 className="hx">Full-stack leaning, learning-driven</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <TrackCard
              title="Technical leadership, teaching, and shipping"
              subtitle="React / Next.js • Django • DSA"
              accent="var(--brass)"
            >
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                    One-line summary
                  </div>
                  <p style={{ margin: '8px 0 0', fontWeight: 750 }}>
                    Full-stack leaning software engineer with hands-on experience shipping web apps, leading small dev
                    teams, and teaching backend curriculum to 100+ students.
                  </p>
                </div>

                <div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                    Experience highlights
                  </div>
                  <List
                    items={[
                      'Technical Lead, Google Developers\' Group (AASTU) — Oct 2024 – Apr 2025: Recruited and led 10 mentors to design a Django backend curriculum for 100+ students; guided capstone qualification for a final-year hackathon.',
                      'Software Engineer Intern, Eskalate — Jul 2024 – Oct 2024: Led a team of 5 to build a Next.js web app, cutting delivery time by 40%; improved UI and data consistency using Redux + Tailwind.',
                      "Coding Instructor, Yenetta Code — Mar 2023 – Aug 2024: Taught Python to 100+ students (ages 5–18), using interactive exercises to reach a 100% task completion rate.",
                    ]}
                  />
                </div>

                <div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                    Selected projects
                  </div>
                  <List
                    items={[
                      'Farm2Table — B2B platform connecting wholesalers and farmers (React + Django) — Top 8 out of 40+ teams.',
                      'BankDash — responsive e-banking app (React.js/Next.js/Tailwind) focused on UX and performance.',
                      'Class Scheduling System — Java + React + MySQL: conflict resolution reduced conflicts from 7 to 3 per week.',
                      'Prolink — Flutter + Firebase: real-time collaboration, messaging, and a job/project marketplace.',
                    ]}
                  />
                </div>

                <div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                    Skills snapshot
                  </div>
                  <p style={{ margin: '8px 0 0' }}>
                    JavaScript/TypeScript, Python, Java, C++/C#/etc • React, Next.js, Django, MySQL • Redux, Tailwind,
                    Git/GitHub, Jira/Trello.
                  </p>
                </div>
              </div>
            </TrackCard>
          </div>
        </section>

        <section id="content">
          <div className="section-head">
            <div className="eyebrow">2. Social Media Manager &amp; Content Writer</div>
            <h2 className="hx">Make content that converts to action</h2>
          </div>

          <TrackCard title="Editorial, event coverage, and growth" subtitle="LinkedIn • IG • TikTok" accent="var(--maroon)">
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  One-line summary
                </div>
                <p style={{ margin: '8px 0 0', fontWeight: 750 }}>
                  Social media manager and content writer with three years running brand content, live event coverage,
                  and audience growth across multiple platforms.
                </p>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Experience highlights
                </div>
                <List
                  items={[
                    'Content Writer, PTGR AG — Feb 2026 – Present: curating daily crypto market updates and preparing LinkedIn + newsletter content.',
                    'Social Media Manager & Telemarketer, Awura Computing PLC — Jul 2024 – Dec 2025: covered OwlEvents launch across LinkedIn/IG/TikTok/Telegram/Facebook; used engagement data to qualify leads.',
                    'Social Media Manager, Hult Prize AASTU — Dec 2023 – Apr 2024: Creative Director for event content and posts that converted students into registered teams.',
                    'Social Media Manager (Intern), GDG (AASTU) — May 2023 – Oct 2023: managed live broadcast across three community channels and secured 10 internship slots via sponsor outreach.',
                  ]}
                />
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Skills snapshot
                </div>
                <p style={{ margin: '8px 0 0' }}>
                  Content strategy & editorial calendars • copywriting • videography & photography • live broadcast management
                  • engagement analytics & lead qualification • sponsor/partner outreach.
                </p>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Awards & recognition
                </div>
                <List items={['Certificate of Contribution, Hult Prize — for success of Hult Prize 2024 pre-regionals (Mar 2024)', 'IELTS (Band 7.5, Speaking 8.0) — Jan 2024', "Silver Award, International Queen's Commonwealth Essay Competition — Aug 2021"]} />
              </div>
            </div>
          </TrackCard>
        </section>

        <section id="games">
          <div className="section-head">
            <div className="eyebrow">3. Game Developer</div>
            <h2 className="hx">Unity/C# game logic with OOP discipline</h2>
          </div>

          <TrackCard title="Built and shipped playable games" subtitle="Unity • C# • OOP" accent="var(--sage)">
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  One-line summary
                </div>
                <p style={{ margin: '8px 0 0', fontWeight: 750 }}>
                  Unity/C# game developer with training in object-oriented game architecture — led a 50-student cohort and shipped two complete playable games from scratch.
                </p>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Project highlights
                </div>
                <List
                  items={[
                    'Ping-Pong — 2D Unity/C#: collision + physics, two-player mode, real-time score tracking, retro-inspired design.',
                    'Color Switch — endless mode with color-based obstacles, OOP-structured mechanics, and real-time score tracking.',
                  ]}
                />
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Skills snapshot
                </div>
                <p style={{ margin: '8px 0 0' }}>
                  C#, Unity Engine, object-oriented programming, collision detection & physics systems, game design, Git.
                </p>
              </div>

              <div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                  Leadership
                </div>
                <List items={['Cohort Lead, Game Development Bootcamp — Muqecha Studios (Jun 2023 – Aug 2024): led 50+ students in developing game projects.']} />
              </div>
            </div>
          </TrackCard>
        </section>

        {/* AWARDS */}
        <section id="awards">
          <div className="section-head">
            <div className="eyebrow">Quick-reference</div>
            <h2 className="hx">Awards & recognition</h2>
          </div>

          <div className="card-soft" style={{ padding: 26 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 14 }}>
              {[
                { k: 'Top 8 Innovator', v: 'A2SV 2024 Hackathon (of 40+ teams) — Software Engineering' },
                { k: 'Top 3 Finalist', v: 'GDSC 2024 Hackathon (of 10+ teams) — Mobile Development' },
                { k: 'Dean’s List', v: '2023 — Addis Ababa Science and Technology University' },
                { k: 'Contribution', v: 'Hult Prize pre-regionals 2024 — Certificate of Contribution' },
                { k: 'IELTS', v: 'Band 7.5 (Speaking 8.0) — British Council' },
                { k: 'Silver Award', v: "International Queen's Commonwealth Essay Competition — 2021" },
              ].map((a) => (
                <div key={a.k} style={{ padding: 16, borderRadius: 14, border: '1px solid var(--ink-line)', background: 'var(--surface-card)' }}>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 900, color: 'var(--brass-light)' }}>
                    {a.k}
                  </div>
                  <div style={{ marginTop: 8, color: 'var(--muted-dark)', fontSize: 14, lineHeight: 1.6, fontWeight: 750 }}>
                    {a.v}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <a className="btn" href="/event" style={{ background: 'var(--ink)' }}>
                Back to Event
                <span aria-hidden>→</span>
              </a>
              <div style={{ color: 'var(--muted-dark)', fontSize: 13, fontWeight: 700 }}>
                Want the latest updates? Visit <a href={LINKS.jami} className="btn ghost" style={{ padding: 0, background: 'transparent' }} target="_blank" rel="noreferrer">jami.bio/yetia</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


