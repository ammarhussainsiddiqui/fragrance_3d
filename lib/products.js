const process = [
  {
    id: 1,
    number: "1",
    title: "The Brief",
    description: "The first conversation: the memory, the place and the mood you want to wear.",
    position: "top-left",
  },
  {
    id: 2,
    number: "4",
    title: "The Flacon",
    description: "Glass, collar and label, considered as carefully as the composition itself.",
    position: "top-right",
  },
  {
    id: 3,
    number: "2",
    title: "Materials",
    description: "We select the rare naturals and accords that will carry the composition.",
    position: "middle-left",
  },
  {
    id: 4,
    number: "5",
    title: "Maturation",
    description: "The composition rests for weeks so the materials settle and marry.",
    position: "middle-right",
  },
  {
    id: 5,
    number: "3",
    title: "Composition",
    description: "Modifications, rest and refinement until the sillage is exactly right.",
    position: "bottom-left",
  },
  {
    id: 6,
    number: "6",
    title: "Numbering",
    description: "Each flacon is filled, sealed and numbered by hand in the atelier.",
    position: "bottom-right",
  },
]

export const products = [
  {
    id: 1,
    slug: 'bois-d-ambre',
    name: "Nº 01 — Bois d'Ambre",
    volume: '50 ml · 1.7 fl oz · Eau de Parfum',
    variant: 'amber',
    imagePath: '/images/bottle-amber-light.png',
    description:
      'Smoked cedar and labdanum over a warm amber base. Top notes of pink pepper and bergamot open onto a heart of iris and ambrette; the trail is resinous, dry and quietly enveloping.',
    notes: {
      top: ['Pink Pepper', 'Bergamot'],
      heart: ['Iris', 'Ambrette'],
      base: ['Smoked Cedar', 'Labdanum', 'Amber'],
    },
    ingredients: process,
    benefits: [
      { icon: 'leaf', title: 'Rare Naturals', description: 'Built around a single rare material — here, a smoked Atlas cedar distilled for the house.' },
      { icon: 'sparkles', title: 'Composed by Hand', description: 'Balanced, matured and refined in the atelier over eighteen months before its first numbering.' },
      { icon: 'clock', title: 'Lasting Sillage', description: 'A 20% concentration that stays close for the first hour, then lingers for the rest of the day.' },
    ],
  },

  {
    id: 2,
    slug: 'fleur-noire',
    name: 'Nº 02 — Fleur Noire',
    volume: '50 ml · 1.7 fl oz · Eau de Parfum',
    variant: 'noir',
    imagePath: '/images/bottle-noir-light.png',
    description:
      'Night-blooming tuberose and black orchid, grounded in oud and vetiver. A floral composed for the evening — opulent at first, then dark, velvety and low.',
    notes: {
      top: ['Black Pepper', 'Saffron'],
      heart: ['Tuberose', 'Black Orchid'],
      base: ['Oud', 'Vetiver', 'Tonka'],
    },
    ingredients: process,
    benefits: [
      { icon: 'leaf', title: 'Rare Naturals', description: 'An Indian tuberose absolute, extracted in small lots and used at a generous dose.' },
      { icon: 'sparkles', title: 'Composed by Hand', description: 'Matured for twelve weeks so the oud and the flower learn to speak in the same voice.' },
      { icon: 'clock', title: 'Lasting Sillage', description: 'An evening fragrance with an eight-hour trail and a soft, ambered dry-down.' },
    ],
  },

  {
    id: 3,
    slug: 'sel-blanc',
    name: 'Nº 03 — Sel Blanc',
    volume: '50 ml · 1.7 fl oz · Eau de Parfum',
    variant: 'clair',
    imagePath: '/images/bottle-clair-light.png',
    description:
      'Sea salt, fig leaf and white musk. A luminous citrus opening that dries down to warm, sun-bleached driftwood — clean, mineral and effortless.',
    notes: {
      top: ['Sicilian Lemon', 'Sea Salt'],
      heart: ['Fig Leaf', 'Neroli'],
      base: ['Driftwood', 'White Musk'],
    },
    ingredients: process,
    benefits: [
      { icon: 'leaf', title: 'Rare Naturals', description: 'Fig leaf absolute and cold-pressed Sicilian lemon, sourced from a single grower.' },
      { icon: 'sparkles', title: 'Composed by Hand', description: 'A deliberately transparent structure, refined until nothing could be removed.' },
      { icon: 'clock', title: 'Lasting Sillage', description: 'Light on the skin but persistent — a mineral musk that lasts well into the afternoon.' },
    ],
  },

  {
    id: 4,
    slug: 'encens-vert',
    name: 'Nº 04 — Encens Vert',
    volume: '50 ml · 1.7 fl oz · Eau de Parfum',
    variant: 'vert',
    imagePath: '/images/bottle-vert-light.png',
    description:
      'Frankincense and green galbanum with a heart of violet leaf. Resinous, cool and quietly ceremonial — a fragrance for stone rooms and early mornings.',
    notes: {
      top: ['Galbanum', 'Cardamom'],
      heart: ['Violet Leaf', 'Frankincense'],
      base: ['Myrrh', 'Cypriol', 'Moss'],
    },
    ingredients: process,
    benefits: [
      { icon: 'leaf', title: 'Rare Naturals', description: 'Omani frankincense resin, steam-distilled slowly to keep its green, lemony facets.' },
      { icon: 'sparkles', title: 'Composed by Hand', description: 'Built in the chypre tradition and matured until the resins turn soft and mineral.' },
      { icon: 'clock', title: 'Lasting Sillage', description: 'A cool, close trail that deepens over the day into smoke and moss.' },
    ],
  },


]

export const getProductById = (id) => products.find((p) => p.id === id)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
