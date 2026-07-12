'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  // Target date: Sunday, July 19, 2026 (adjust time if needed)
  const targetDate = new Date('2026-07-19T11:00:00') 

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Set initial values on mount to prevent SSR mismatch
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="hero relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl text-center px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 28, 0.4), rgba(20, 20, 18, 0.75)), url('https://picsum.photos/seed/landing-hero/1600/900')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        {/* Elegant Eyebrow Group */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-medium">
            The Celebration
          </span>
          <span className="h-[1px] w-12 bg-[#C9A227]/50 inline-block" />
          <span className="text-xs uppercase tracking-[0.25em] text-stone-300 font-light">
            Invitation
          </span>
        </div>

        {/* Serif Headings */}
        <h1 className="font-serif text-4xl md:text-6xl text-[#F9F6F0] tracking-wide leading-tight mb-2 font-light">
          Yetnayet&apos;s Graduation
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-stone-300 tracking-wide font-light mb-8">
          Class of 2026
        </p>

        {/* Date & Location Grid */}
        <div className="w-full max-w-lg border-y border-stone-200/10 py-6 my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200/10">
          <div className="flex flex-col justify-center py-2 md:py-0">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">When</span>
            <span className="text-sm uppercase font-semibold tracking-wider text-[#F9F6F0]">
              Sunday, July 19, 2026
            </span>
          </div>
          <div className="flex flex-col justify-center py-2 md:py-0">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Where</span>
            <span className="text-sm uppercase font-semibold tracking-wider text-[#F9F6F0]">
              Addis Ababa, Ethiopia
            </span>
          </div>
        </div>

        {/* Minimalist Countdown Timer */}
        <div className="my-8">
          <div className="flex gap-4 md:gap-8 justify-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
                <span className="font-serif text-3xl md:text-4xl text-[#F9F6F0] font-light tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A227] mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link 
            href="/portfolio" 
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-stone-400/30 text-stone-200 hover:text-white hover:bg-white/5 transition-all duration-300 text-xs uppercase tracking-widest text-center"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}