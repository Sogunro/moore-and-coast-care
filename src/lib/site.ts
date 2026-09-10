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
  /* The hero line. Deliberately factual: what, where and who, before any
     feeling, because a visitor should know what this company does at a
     glance rather than after a sentence of warmth. */
  heroLead:
    "Personal care, dementia support and live-in care for adults of every age — in their own home.",
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

/**
 * Primary navigation.
 *
 * "How We Work" is not listed yet — its copy has not been supplied, and a nav
 * item pointing at an empty or invented page is worse than its absence. Add it
 * here once that page exists.
 *
 * Careers is reachable from the footer rather than the nav: seven items is
 * already the most a single row holds comfortably.
 */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Care Services", href: "/services" },
  { label: "Our Carers", href: "/our-carers" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

/** Trust signals — shown prominently near the top of the homepage. */
/**
 * Each signal carries its own emoji rather than a repeated checkmark, which
 * made six distinct assurances read as one generic list of claims.
 *
 * Emoji are used here for their full-colour, pictorial weight — a flat
 * single-colour line set read as blank at this size. The trade-off, accepted
 * deliberately: each platform draws its own emoji (Apple, Windows and Android
 * all differ), so this strip will not look identical on every device.
 *
 * Written as escapes rather than literal characters so the file stays
 * ASCII-safe through tooling that mangles multi-byte source.
 */
export const trustSignals: { label: string; emoji: string }[] = [
  { label: "CQC Registered", emoji: "\u{1F6E1}\u{FE0F}" },
  { label: "Fully Trained Carers", emoji: "\u{1F465}" },
  { label: "DBS Checked", emoji: "\u{1FAAA}" },
  { label: "Medication Trained", emoji: "\u{1F48A}" },
  { label: "Person-Centred Care", emoji: "\u{2764}\u{FE0F}" },
  { label: "Local Whitby Team", emoji: "\u{1F4CD}" },
];

/**
 * Homepage hero slides.
 *
 * Three images, rotating — and the rotation has a job. A single photograph of
 * an elderly man with a walking stick told visitors this was a service for
 * old people, which is not what the company does. Three people of three
 * different generations says "adults of every age" faster than any sentence
 * could, and that is the one thing a visitor must grasp at a glance.
 *
 * Order matters: the working-age woman leads, because she does the most work
 * against the assumption. The older gentleman comes last, present but not
 * defining.
 *
 * All three are 16:9, composed for this frame: subjects in the right half
 * with headroom above, and the left third left open for the headline. That
 * composition is why no slide needs a focal-point override — earlier versions
 * were portrait or ultra-wide and had to be cropped hard, which cost the
 * support workers the tops of their heads.
 */
export const heroSlides = [
  {
    src: "/images/hero-kitchen.png",
    alt: "A woman working at her laptop at home, laughing with her support worker over a cup of tea",
  },
  {
    src: "/images/hero-park.png",
    alt: "A young man and his support worker walking through a sunlit park, laughing together",
  },
  {
    src: "/images/hero-main.png",
    alt: "An older man and his support worker laughing together on a park bench overlooking the water",
  },
] as const;

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
      "Discreet, sensitive support with day-to-day living, helping you maintain your independence at home.",
    image: "/images/personal-care.png",
    imageAlt:
      "A carer gently supporting an elderly man as he walks through his home",
  },
  {
    slug: "adults-over-65",
    title: "Caring for Adults Over 65",
    summary:
      "Outstanding care for people over 65, supporting you in maintaining an independent lifestyle.",
  },
  {
    slug: "adults-under-65",
    title: "Caring for Adults Under 65",
    summary:
      "Exceptional care for people under 65, supporting you in maintaining an independent lifestyle.",
  },
  {
    slug: "dementia-care",
    title: "Dementia",
    summary:
      "Every case of dementia is unique. Our specialist-supported carers create personalised plans built around your loved one.",
    image: "/images/dementia-care.png",
    imageAlt:
      "A carer and an older woman looking through a photo album together",
  },
  {
    slug: "physical-disabilities",
    title: "Physical Disabilities",
    summary:
      "Our carers support a range of conditions including physical disabilities, Alzheimer's, multiple sclerosis, strokes and cerebral palsy.",
  },
  {
    slug: "sensory-impairments",
    title: "Sensory Impairments",
    summary:
      "We recognise the particular challenges of sensory impairment, and are committed to offering comprehensive support.",
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    summary:
      "Housing with personal support for people who need help at home but wish to stay independent — daily tasks, personal care and shared living options.",
    image: "/images/supported-living.png",
    imageAlt:
      "A support worker and a younger adult cooking together in a kitchen",
  },
  {
    slug: "learning-disability",
    title: "Learning Disability",
    summary:
      "Personalised support that helps people build independence, confidence and life skills, promoting dignity, inclusion and well-being.",
  },
  {
    slug: "hospital-discharge",
    title: "Hospital Discharge",
    summary:
      "Personalised support for a safe, smooth transition from hospital to home, helping people recover confidently and avoid readmission.",
    image: "/images/hospital-discharge.png",
    imageAlt: "A carer helping an elderly person settle comfortably at home",
  },
  {
    slug: "live-in-care",
    title: "Live-in Care",
    summary:
      "A carer who lives with you at home — round-the-clock support without moving.",
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

/**
 * About-page content, supplied by the company. This is their own wording —
 * edit with care, and do not paraphrase claims about what is offered.
 */
export const about = {
  privacy: {
    title: "Your privacy is central",
    body:
      "Here at Moor & Coast Care, we understand that your situation is private. We take it upon ourselves to champion your privacy and independence with quality care staff who offer an excellent, compassionate service.",
  },

  /* The opening line is pulled out as a lead; the rest follows as body copy. */
  mission: {
    lead:
      "It is our unwavering commitment and passion to provide truly exceptional care to every individual we serve.",
    paragraphs: [
      "We believe that every person deserves to experience compassion, respect, and dignity throughout their care journey. Our mission is to create a nurturing environment that fosters independence, promotes well-being, and enhances the overall quality of life for our clients.",
      "Driven by our core values of empathy, integrity, and excellence, we aspire to be an industry leader in delivering great care, raising standards across the sector and leading our peers by example. Our dedicated team of compassionate caregivers is trained and motivated to go above and beyond to address the unique needs of each individual. Through a robust and detail-oriented care planning process, open communication, and attentive support, we aim to empower our clients to live life to the fullest, regardless of their age or abilities.",
      "As a trusted partner in care, we continuously seek to innovate and adapt our services to match the evolving needs of our clients and the wider community. We collaborate with healthcare professionals, organisations, and community resources to create a comprehensive support system that promotes overall well-being and a sense of belonging.",
      "At Moor & Coast Care, we are dedicated to creating an environment where individuals can thrive, confident that they are in the hands of caring professionals committed to their happiness, health, and holistic well-being.",
    ],
  },
} as const;

/** How We Work page — the company's own wording. */
export const howWeWork = {
  /* The one place on the site where numbering carries real information:
     these genuinely happen in order. */
  steps: [
    {
      title: "Outline your needs",
      body:
        "Our specialist domiciliary care team receives your enquiry. We review and discuss your requirements, explain the services on offer, and give you an outline of anticipated costs.",
    },
    {
      title: "Assessed home visit",
      body:
        "We arrange for an assessor to visit you at home and carry out a care and risk assessment. Once that visit is complete, we offer you a fully costed care package.",
    },
    {
      title: "Finalise your care package",
      body:
        "We finalise your package with you and your family, and together identify the most suitable carer. You will meet them to say hello before deciding. If further training is needed, we arrange it.",
    },
    {
      title: "Your service begins",
      body:
        "Once everyone is satisfied, we are delighted to begin your care service and improve your quality of life.",
    },
  ],

  /* What the service covers day to day. Three of these were supplied without
     a heading; the names here are inferred and should be confirmed. */
  help: [
    {
      title: "Medication reminders",
      body:
        "Attentive, reliable assistance to take medication on time, stay hydrated and meet other wellness needs.",
    },
    {
      title: "Staying active",
      body:
        "Motivational, friendly support to keep you moving and healthy — from a simple walk to customised exercise.",
    },
    {
      title: "Meals and food shopping",
      body:
        "Support with the supermarket run, and with planning and preparing nutritious, enjoyable meals.",
    },
    {
      title: "Transport",
      body:
        "Enjoy a ride in your own car or another comfortable one — we will help you get where you are going.",
    },
    {
      title: "Housekeeping",
      body:
        "Help with dishwashing, laundry, rubbish removal, seasonal projects and getting organised.",
    },
    {
      title: "Personal care and hygiene",
      body:
        "Discreet, professional and respectful assistance with dressing, bathing and toileting.",
    },
    {
      title: "Companionship",
      body:
        "More than typical care support. Our staff take part in activities and build genuine relationships — there is always someone to talk to.",
    },
    {
      title: "Check-in visits",
      body:
        "A skilled care advisor can be with you in as little as two hours to support you or a loved one.",
    },
  ],

  assessment: {
    title: "A free, no-strings care assessment",
    body:
      "A member of our team will visit you at home to carry out a full assessment of your care requirements. It lets us understand you, your personal preferences, and the level and package of support you need.",
  },
} as const;

/** Care Services page intro — the company's own wording. */
export const servicesIntro =
  "At Moor & Coast Care, our unwavering commitment and passion drive us to deliver exceptional care to every individual we serve. We believe everyone should experience compassion, respect and dignity throughout their care journey.";

/** Our Carers page — the company's own wording. */
export const carers = {
  intro: {
    title: "A carer you can believe in",
    body:
      "Only the highest calibre of care staff is selected for Moor & Coast Care. Every employee is thoroughly screened and background checked, so we present a team ready to provide exceptional support when you need it.",
  },

  /* The six reasons, each a short block. */
  promises: [
    {
      title: "Selected and vetted",
      body:
        "Only the highest calibre of care staff is selected for Moor & Coast Care, with all employees thoroughly screened and background checked.",
    },
    {
      title: "Trained and experienced",
      body:
        "All staff are highly trained and qualified. We offer carers trained across a range of areas, specialising in dementia and other health requirements.",
    },
    {
      title: "Tailored support",
      body:
        "We have extensive experience matching the right carer to your lifestyle and interests — someone with the necessary skill and knowledge, who also shares your hobbies and understands your cultural needs.",
    },
    {
      title: "Excellence and honesty",
      body:
        "Our focus is on helping people stay healthy and in the comfort of their own home. Our promise is to employ the best care professionals and provide a competitive, superior and safe level of care.",
    },
    {
      title: "Passionate staff",
      body:
        "Every employee is carefully screened and assessed, including their reasons for choosing care as a career. Only passionate and driven carers join our team.",
    },
  ],

  /* The vetting checks. A plain list: 13 items, no elaboration needed. */
  checks: [
    "Skills verification",
    "Professional reference checks",
    "Mandatory training",
    "Criminal record checks",
    "Competences",
    "Work aptitude",
    "Employment eligibility",
    "Employment history",
    "Personal reference checks",
    "Face-to-face interview",
    "Education history",
    "Care experience",
  ],

  /* Conditions the team is experienced with. Deliberately unillustrated:
     any photograph here would have to depict a specific condition. */
  skills: [
    "Elderly and EMI",
    "Mental health",
    "Alzheimer's",
    "Physical disability",
    "Acquired brain injury",
    "Spinal injury",
    "Palliative care",
    "Parkinson's",
    "Heart disease and stroke",
    "Dementia",
    "End of life care",
    "Cancer care",
  ],
} as const;

/** The six values, in the company's own words. */
export const values = [
  {
    title: "Kindness and compassion",
    body:
      "Our friendly and dedicated carers will always meet you with warmth and a smile. With Moor & Coast Care, care doesn't have to feel clinical.",
  },
  {
    title: "Respect",
    body:
      "By treating every client with dignity and sensitivity, no matter the circumstance, we maintain our service users' independence and pride.",
  },
  {
    title: "Highest quality of care",
    body:
      "We always provide the highest standard of care, adapting and responding to our clients' changing needs for as long as you need us.",
  },
  {
    title: "Reliability and punctuality",
    body:
      "We work as closely as possible to the client's own schedule. Let us work around you, so that life isn't all about appointments.",
  },
  {
    title: "Embracing cultural differences",
    body:
      "We welcome all cultural differences and promise to be respectful regardless of religion, ethnicity, sexual orientation or any of the things that make you who you are.",
  },
  {
    title: "That something extra",
    body:
      "We are diligent and mindful of changing health and care requirements, and go the extra mile to continually improve each client's quality of life.",
  },
] as const;

/** Why families choose Moor & Coast — the four reasons, in their words. */
export const whyChooseUs = [
  {
    title: "Positive recommendations",
    body:
      "We are evolving and gaining momentum through word of mouth, earning recommendations through consistent, quality service to our clients and carers.",
  },
  {
    title: "A regulated service",
    body:
      "We are registered with the Care Quality Commission and work in unison with Social Services departments and health professionals.",
  },
  {
    title: "Efficient response",
    body:
      "Our procedures work effectively on each client's behalf, with dependable support staff. We can commence work within 24 to 48 hours of a request.",
  },
  {
    title: "We care for our carers",
    body:
      "All new staff complete an induction training course and return for an annual update, with specialist training throughout. A dedicated support team offers advice and a listening ear whenever it is needed.",
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
