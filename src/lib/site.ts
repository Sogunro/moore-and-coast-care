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
/**
 * Social profiles shown in the top utility bar.
 * URLs are placeholders until the real handles are supplied — a link to a
 * non-existent profile is worse than no icon, so entries without an href are
 * not rendered.
 */
export const social: { label: string; href: string; icon: "facebook" | "instagram" }[] = [
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "Instagram", href: "", icon: "instagram" },
];

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
  /** One line under the page heading. Falls back to `summary` if unset. */
  lead?: string;
  /** Body copy for the service's own page, one string per paragraph. */
  detail?: string[];
  /** What this service typically covers. Rendered as a ticked list. */
  includes?: string[];
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
    lead: "Discreet, sensitive support with the everyday, so you can stay in your own home and keep doing things your way.",
    detail: [
      "Personal care covers the parts of the day that have become harder to manage alone. It is delivered quietly and respectfully, at the times that suit you, by a carer you know.",
      "We take the time to learn how you like things done — the order you prefer, the products you use, what you would rather do yourself. Independence is the point; we help only where help is wanted.",
    ],
    includes: [
      "Washing, bathing and showering",
      "Dressing and undressing",
      "Help with mobility around the home",
      "Medication reminders and administration",
      "Continence care, discreetly handled",
      "Support getting up and settling at night",
    ],
  },
  {
    slug: "adults-over-65",
    title: "Caring for Adults Over 65",
    summary:
      "Outstanding care for people over 65, supporting you in maintaining an independent lifestyle.",
    lead: "Support that adapts as needs change, so later life is lived at home rather than somewhere else.",
    detail: [
      "Needs rarely arrive all at once. Most people start with a little help — a weekly shop, a hand in the morning — and add more only as it becomes useful.",
      "We review your plan regularly and change it as circumstances do, so care always matches what is actually needed rather than what was agreed months ago.",
    ],
    includes: [
      "Help with washing, dressing and mobility",
      "Meals, shopping and household tasks",
      "Medication support",
      "Company and conversation",
      "Trips out and appointments",
      "Regular reviews as needs change",
    ],
  },
  {
    slug: "adults-under-65",
    title: "Caring for Adults Under 65",
    summary:
      "Exceptional care for people under 65, supporting you in maintaining an independent lifestyle.",
    lead: "Care built around working life, family and independence — at any age.",
    detail: [
      "Needing support under 65 is different. You may be working, raising children, studying, or simply intent on keeping a life that looks nothing like a care brochure.",
      "We build care around your commitments rather than the other way round, with visit times that fit your week and carers matched to your interests as well as your needs.",
    ],
    includes: [
      "Visit times built around work and family",
      "Personal care and daily living support",
      "Help getting out to work, study or social plans",
      "Support with appointments and transport",
      "Carers matched to your interests",
    ],
  },
  {
    slug: "dementia-care",
    title: "Dementia",
    summary:
      "Every case of dementia is unique. Our specialist-supported carers create personalised plans built around your loved one.",
    image: "/images/dementia-care.png",
    imageAlt:
      "A carer and an older woman looking through a photo album together",
    lead: "Patient, specialist support that brings routine, reassurance and moments of real connection.",
    detail: [
      "Every case of dementia is different, and what helps one person can unsettle another. Our dementia-trained carers build a plan around the individual — their history, their habits, the things that reassure them.",
      "Familiarity matters enormously, so we keep the same carers visiting wherever we can. Staying at home, surrounded by familiar things, is often the single most settling factor of all.",
    ],
    includes: [
      "Dementia-trained, consistent carers",
      "Familiar routines maintained day to day",
      "Gentle prompting and orientation",
      "Support with eating, drinking and medication",
      "Meaningful activity and conversation",
      "Respite so family carers can rest",
    ],
  },
  {
    slug: "physical-disabilities",
    title: "Physical Disabilities",
    summary:
      "Our carers support a range of conditions including physical disabilities, Alzheimer's, multiple sclerosis, strokes and cerebral palsy.",
    lead: "Practical, respectful support with mobility, routine and daily living.",
    detail: [
      "Our carers support people living with a wide range of conditions, including physical disabilities, multiple sclerosis, the effects of a stroke, cerebral palsy and acquired brain injury.",
      "The aim is always the same: remove the obstacles, keep the independence. We work to your routine and your equipment, and our carers are trained in safe moving and handling.",
    ],
    includes: [
      "Safe moving, handling and transfers",
      "Personal care and hygiene support",
      "Help with equipment and adaptations",
      "Meal preparation and household tasks",
      "Getting out and about",
      "Support with appointments and therapy",
    ],
  },
  {
    slug: "sensory-impairments",
    title: "Sensory Impairments",
    summary:
      "We recognise the particular challenges of sensory impairment, and are committed to offering comprehensive support.",
    lead: "Confident support for people living with sight or hearing loss.",
    detail: [
      "Sensory impairment changes how a home works and how support needs to be given. We recognise those particular challenges and train our carers to meet them properly.",
      "That means clear, unhurried communication, keeping belongings where you expect to find them, and assistance that builds confidence rather than dependence.",
    ],
    includes: [
      "Communication tailored to you",
      "Keeping the home consistent and safe",
      "Support with correspondence and admin",
      "Help with appointments and travel",
      "Assistance with technology and aids",
      "Company and conversation",
    ],
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    summary:
      "Housing with personal support for people who need help at home but wish to stay independent — daily tasks, personal care and shared living options.",
    image: "/images/supported-living.png",
    imageAlt:
      "A support worker and a younger adult cooking together in a kitchen",
    lead: "Housing with personal support, for people who need help at home but want to stay independent.",
    detail: [
      "Supported living combines a place of your own with the support needed to live in it well. It can mean your own tenancy or a shared household, with support ranging from a few hours a week to a constant presence.",
      "The emphasis is on building skills and confidence — cooking, budgeting, travel, work — so that support can step back as independence grows.",
    ],
    includes: [
      "Support with daily living tasks",
      "Building life skills and confidence",
      "Personal care where needed",
      "Help managing money and appointments",
      "Getting involved in the community",
      "Shared or individual living options",
    ],
  },
  {
    slug: "learning-disability",
    title: "Learning Disability",
    summary:
      "Personalised support that helps people build independence, confidence and life skills, promoting dignity, inclusion and well-being.",
    lead: "Personalised support that builds independence, confidence and life skills.",
    detail: [
      "We support people with learning disabilities to live the life they choose, with as much or as little help as that takes. Choice comes first, and support is offered rather than imposed.",
      "Our care promotes dignity, inclusion and overall well-being, and our carers are chosen for patience and a genuine interest in the people they support.",
    ],
    includes: [
      "Support with daily routines",
      "Building independence and life skills",
      "Help accessing work, study and activities",
      "Personal care where needed",
      "Support with appointments and health",
      "Company and community involvement",
    ],
  },
  {
    slug: "hospital-discharge",
    title: "Hospital Discharge",
    summary:
      "Personalised support for a safe, smooth transition from hospital to home, helping people recover confidently and avoid readmission.",
    image: "/images/hospital-discharge.png",
    imageAlt: "A carer helping an elderly person settle comfortably at home",
    lead: "A calm, well-arranged return home, so recovery happens safely.",
    detail: [
      "Coming home after a hospital stay is the point at which things most often go wrong. We arrange the practical side — the house warm and stocked, medication understood, equipment in place — so that arriving home feels safe rather than daunting.",
      "Support is usually most intensive in the first days and eases as confidence returns. Getting this period right is what prevents readmission.",
    ],
    includes: [
      "Preparing the home before you arrive",
      "Collecting prescriptions and shopping",
      "Support with new medication",
      "Help with mobility and equipment",
      "Personal care during recovery",
      "Gradually reducing support as you improve",
    ],
  },
  {
    slug: "live-in-care",
    title: "Live-in Care",
    summary:
      "A carer who lives with you at home — round-the-clock support without moving.",
    lead: "A carer who lives with you at home — round-the-clock support, without moving.",
    detail: [
      "Live-in care is the alternative to a care home for people who need support through the day and reassurance overnight. A carer moves in, and life carries on in the house you know.",
      "For couples it means staying together. For everyone it means keeping your own routine, your own bed and your own front door.",
    ],
    includes: [
      "A carer living in your home",
      "Support available day and night",
      "Personal care, meals and housekeeping",
      "Medication management",
      "Company and companionship",
      "Couples supported together",
    ],
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
      icon: "pill",
      body:
        "Attentive, reliable assistance to take medication on time, stay hydrated and meet other wellness needs.",
    },
    {
      title: "Staying active",
      icon: "walk",
      body:
        "Motivational, friendly support to keep you moving and healthy — from a simple walk to customised exercise.",
    },
    {
      title: "Meals and food shopping",
      icon: "basket",
      body:
        "Support with the supermarket run, and with planning and preparing nutritious, enjoyable meals.",
    },
    {
      title: "Transport",
      icon: "car",
      body:
        "Enjoy a ride in your own car or another comfortable one — we will help you get where you are going.",
    },
    {
      title: "Housekeeping",
      icon: "broom",
      body:
        "Help with dishwashing, laundry, rubbish removal, seasonal projects and getting organised.",
    },
    {
      title: "Personal care and hygiene",
      icon: "bath",
      body:
        "Discreet, professional and respectful assistance with dressing, bathing and toileting.",
    },
    {
      title: "Companionship",
      icon: "people",
      body:
        "More than typical care support. Our staff take part in activities and build genuine relationships — there is always someone to talk to.",
    },
    {
      title: "Check-in visits",
      icon: "calendar",
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
