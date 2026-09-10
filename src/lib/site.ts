/**
 * Single source of truth for site-wide business content.
 * Editing copy, contact details or service data happens here — not in components.
 * Facts (address, phone, email, services) are taken from the live business listing.
 */

export const business = {
  name: "Moore & Coast Care",
  legalName: "Moore & Coast Care Limited",
  tagline: "Exceptional home care across Whitby & North Yorkshire",
  intro:
    "Compassionate, professional care that helps people live safely and independently in the place they love most — their own home.",
  phone: "07867 790487",
  phoneHref: "tel:+447867790487",
  email: "info@moorandcoastcare.co.uk",
  address: {
    line1: "Unit F6, St Hilda's Business Centre",
    line2: "The Ropery",
    city: "Whitby",
    region: "North Yorkshire",
    postcode: "YO22 4ET",
    country: "England",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Care Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

/** Trust signals — shown prominently near the top of the homepage. */
export const trustSignals = [
  "CQC Registered",
  "Fully Trained Carers",
  "DBS Checked",
  "Medication Trained",
  "Person-Centred Care",
  "Local Whitby Team",
] as const;

/**
 * The homepage hero photograph — one image, not a carousel.
 * Replace with the portrait 4:5 version when it is generated; the current file
 * is the wide inspiration shot and will crop tightly on desktop.
 */
export const heroImage = {
  src: "/images/hero-main.png",
  alt: "A support worker and an older man laughing together on a park bench in the sunshine",
  /* Both subjects sit right of centre in this wide source image, so the crop
     is pulled that way. A portrait 4:5 original would not need this. */
  focus: "62% 45%",
} as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** Optional — only the four services that have commissioned photography. */
  image?: string;
  imageAlt?: string;
};

/**
 * The complete list of care we provide — all ten, in one flat array.
 *
 * Previously this was split into four "services" plus five "specialisms",
 * which implied a hierarchy that does not exist: the split reflected which
 * four had photographs, not what we actually offer. Someone searching for
 * live-in care should find it as readily as personal care, so the homepage
 * lists all ten and lets the visitor find themselves.
 *
 * Each row links to its anchor on /services rather than to its own page —
 * ten thin pages would compete with each other; one strong page does not.
 */
export const services: Service[] = [
  {
    slug: "personal-care",
    title: "Personal Care",
    summary:
      "Discreet, dignified help with washing, dressing, mobility and medication.",
    image: "/images/personal-care.png",
    imageAlt:
      "A carer gently supporting an elderly man as he walks through his home",
  },
  {
    slug: "dementia-care",
    title: "Dementia Care",
    summary:
      "Patient, specialist support that brings routine, reassurance and connection.",
    image: "/images/dementia-care.png",
    imageAlt:
      "A carer and an older woman looking through a photo album together",
  },
  {
    slug: "live-in-care",
    title: "Live-in Care",
    summary:
      "A carer who lives with you at home — round-the-clock support without moving.",
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    summary:
      "Helping adults with disabilities live independently and take part fully.",
    image: "/images/supported-living.png",
    imageAlt:
      "A support worker and a younger adult cooking together in a kitchen",
  },
  {
    slug: "hospital-discharge",
    title: "Hospital Discharge Support",
    summary:
      "A calm, well-arranged return home so recovery can happen safely.",
    image: "/images/hospital-discharge.png",
    imageAlt: "A carer helping an elderly person settle comfortably at home",
  },
  {
    slug: "adults-over-65",
    title: "Caring for Adults Over 65",
    summary:
      "Support that adapts as needs change, helping people stay in their own home.",
  },
  {
    slug: "adults-under-65",
    title: "Caring for Adults Under 65",
    summary:
      "Care built around working life, family and independence, at any age.",
  },
  {
    slug: "physical-disabilities",
    title: "Physical Disabilities",
    summary:
      "Practical, respectful support with mobility, routine and daily living.",
  },
  {
    slug: "sensory-impairments",
    title: "Sensory Impairments",
    summary:
      "Confident support for people living with sight or hearing loss.",
  },
  {
    slug: "learning-disability",
    title: "Learning Disability Support",
    summary:
      "Encouraging choice, confidence and community for the people we support.",
  },
];

/** Kept for the services page, which still groups the five as specialisms. */
export const specialisms = [
  "Caring for adults over 65",
  "Caring for adults under 65",
  "Physical disabilities support",
  "Sensory impairments",
  "Learning disability support",
] as const;

export const whyChooseUs = [
  {
    title: "Compassion first",
    body: "We recruit for kindness. Our carers treat every client as they would their own family.",
  },
  {
    title: "Genuinely local",
    body: "A Whitby team that knows the community, the coast and the people we care for.",
  },
  {
    title: "Person-centred plans",
    body: "Care built around the individual — their routine, preferences and independence, never a template.",
  },
  {
    title: "Trained & trusted",
    body: "Fully trained, DBS-checked and medication-competent carers you can rely on.",
  },
] as const;

/**
 * Illustrative testimonials for layout and design.
 * Replace with real, consented client testimonials before going live.
 */
export const testimonials = [
  {
    quote:
      "The carers have become like family. Mum is happier than she's been in years, and we finally feel we can breathe.",
    author: "Daughter of a client",
    location: "Whitby",
  },
  {
    quote:
      "Nothing is ever too much trouble. The team is punctual, warm and completely reliable — a weight off our minds.",
    author: "Son of a client",
    location: "Sleights",
  },
  {
    quote:
      "After Dad's hospital stay they arranged everything so calmly. Coming home felt safe rather than frightening.",
    author: "Family member",
    location: "Robin Hood's Bay",
  },
] as const;
