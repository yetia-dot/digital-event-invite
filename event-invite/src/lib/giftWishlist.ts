export type WishlistItem = {
  id: string
  name: string
  priceRange: string
  imageUrl: string
  description: string
  links: { label: string; href: string }[]
}

export const WISHLIST: WishlistItem[] = [
  {
    id: 'i1',
    name: 'Sunglasses',
    priceRange: '500–2200 ETB',
    imageUrl: 'https://picsum.photos/seed/sunglasses/800/600',
    description:
      'Small, old-money aesthetics. Thin & stylish frames (no bulky look).',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i2',
    name: 'Small mirror',
    priceRange: '500–1000 ETB',
    imageUrl: 'https://picsum.photos/seed/small-mirror/800/600',
    description:
      'Small, elegant—no too many/flashy colors. Perfect for quick checks.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i3',
    name: 'Watch',
    priceRange: '1000–2000 ETB',
    imageUrl: 'https://picsum.photos/seed/watch/800/600',
    description:
      'Leather handle/strap. Avoid stainless steel (I’m allergic to it).',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i4',
    name: 'Wired earphones (iPhone)',
    priceRange: '700–1000 ETB',
    imageUrl: 'https://picsum.photos/seed/earphones-iphone/800/600',
    description:
      'For iPhone—simple, reliable wired earphones that match iPhone use.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i5',
    name: 'Card holder wallet',
    priceRange: '800–1500 ETB',
    imageUrl: 'https://picsum.photos/seed/card-holder/800/600',
    description:
      'Black or brown. No flashy logo or busy pattern—clean & minimal.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i6',
    name: 'Wireless mouse',
    priceRange: '1700–3000 ETB',
    imageUrl: 'https://picsum.photos/seed/wireless-mouse/800/600',
    description:
      'HP brand preference. Works smoothly as a daily wireless mouse.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i7',
    name: 'PC bag (tote bag)',
    priceRange: '1500–3500 ETB',
    imageUrl: 'https://picsum.photos/seed/pc-tote-bag/800/600',
    description:
      'Leather/waterproof material. Black or brown color. Designed to carry a PC safely.',
    links: [{ label: 'Telegram reference', href: 'https://t.me/ziafindssss' }],
  },
  {
    id: 'i8',
    name: 'Backpack',
    priceRange: '2000–5000 ETB',
    imageUrl: 'https://picsum.photos/seed/backpack/800/600',
    description:
      'Black color. Waterproof, slim profile, with a PC compartment.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i9',
    name: 'Tripod (smart tracking)',
    priceRange: '3000–6000 ETB',
    imageUrl: 'https://picsum.photos/seed/tripod/800/600',
    description:
      'Q13 smart tracking tripod preference—smooth tracking for content.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i10',
    name: 'Mic (dual mic)',
    priceRange: '1500–4800 ETB',
    imageUrl: 'https://picsum.photos/seed/mic-dual/800/600',
    description:
      'K9 dual mic preference. Support for iPhone use.',
    links: [{ label: 'Search nearby (Google Maps)', href: 'https://www.google.com/maps' }],
  },
  {
    id: 'i11',
    name: 'Begena',
    priceRange: '6000–9000 ETB',
    imageUrl: 'https://picsum.photos/seed/begena/800/600',
    description:
      'Simple, clean, elegant design—no complex or extra details.',
    links: [
      { label: 'Telegram', href: 'https://t.me/tsnhabegena' },
      { label: 'TikTok', href: 'https://vt.tiktok.com/ZSX6N66hV/' },
    ],
  },
]


