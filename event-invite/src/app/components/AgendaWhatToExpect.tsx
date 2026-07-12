'use client'

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  image: string;
}

const agendaData: AgendaItem[] = [
  {
    time: '5:30 LT',
    title: 'Guests Welcoming',
    description: 'Arrive early to mingle, find your seats, and settle in as the afternoon festivities begin.',
    image: 'https://picsum.photos/seed/welcome/800/600',
  },
  {
    time: '6:00 LT',
    title: 'Lunch Gathering',
    description: 'Enjoy a curated, delicious selection of dishes served in honor of the celebration.',
    image: 'https://picsum.photos/seed/lunch/800/600',
  },
  {
    time: '9:00 LT',
    title: 'Graduation & Cake Ceremony',
    description: 'The main event! Toasting to the journey, cutting the cake, and brief special remarks.',
    image: 'https://picsum.photos/seed/cake/800/600',
  },
  {
    time: '10:00 LT',
    title: 'Gifts & Group Pictures',
    description: 'Capturing memories with friends and family. A dedicated moment for group photos and well-wishes.',
    image: 'https://picsum.photos/seed/photos/800/600',
  },
  {
    time: '11:00 LT - Late',
    title: 'Music & Dance',
    description: 'Letting loose and celebrating into the night with great music and unmatched energy.',
    image: 'https://picsum.photos/seed/dance/800/600',
  },
]

export default function AgendaWhatToExpect() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#FAF9F5]/60 dark:bg-[#1C1C1A]/40 rounded-2xl backdrop-blur-md border border-stone-200/10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-medium block mb-2">
          The Timeline
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-[#F9F6F0] tracking-wide font-light">
          What to Expect
        </h2>
        <span className="h-[1px] w-16 bg-[#C9A227]/40 inline-block mt-4" />
      </div>

      {/* Horizontal Scroll Layout for Elegant Event Cards */}
      <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-thin scrollbar-thumb-stone-300/50 snap-x snap-mandatory px-2">
        {agendaData.map((item, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[290px] sm:w-[340px] bg-white dark:bg-[#242422] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div
                className="h-48 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Time Badge Overlay */}
                <div className="absolute top-4 left-4 bg-[#F9F6F0] dark:bg-[#1E1E1C] px-3 py-1.5 rounded-full shadow-sm border border-[#C9A227]/20">
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-semibold">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-mono block mb-1">
                  Phase 0{index + 1}
                </span>
                <h3 className="font-serif text-xl text-stone-800 dark:text-[#E6E4DE] mb-2 font-medium tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Subtle bottom border accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  )
}