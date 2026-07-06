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

/** Hero background images — gently crossfaded in the homepage carousel. */
export const heroSlides = [
  {
    src: "/images/hero.png",
    alt: "A carer sharing a warm moment with an elderly client at home",
  },
  {
    src: "/images/hero-2.png",
    alt: "A carer laughing with an elderly woman over a cup of tea",
  },
  {
    src: "/images/hero-3.png",
    alt: "A carer helping an elderly man in his hallway",
  },
  {
    src: "/images/hero-4.png",
    alt: "A carer walking arm-in-arm with an elderly woman along the Whitby seafront",
  },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "personal-care",
    title: "Personal Care",
    summary:
      "Discreet, dignified support with everyday tasks — washing, dressing, mobility and medication — tailored to each person.",
    image: "/images/personal-care.png",
    imageAlt:
      "A carer gently supporting an elderly man as he walks through his home",
  },
  {
    slug: "dementia-care",
    title: "Dementia Care",
    summary:
      "Patient, specialist support that brings routine, reassurance and moments of connection for people living with dementia.",
    image: "/images/dementia-care.png",
    imageAlt:
      "A carer and an older woman looking through a photo album together",
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    summary:
      "Enabling adults with disabilities to live independently, build confidence and take part fully in their community.",
    image: "/images/supported-living.png",
    imageAlt: "A support worker and a younger adult cooking together in a kitchen",
  },
  {
    slug: "hospital-discharge",
    title: "Hospital Discharge Support",
    summary:
      "A calm, reassuring return home after a hospital stay, with everything arranged so recovery can happen safely.",
    image: "/images/hospital-discharge.png",
    imageAlt: "A carer helping an elderly person settle comfortably at home",
  },
];

/** Additional specialisms listed on the services page. */
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
