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
  /** What this service typically covers. Rendered as a ticked list.
      Superseded by `helpWith` on pages that have the fuller treatment. */
  includes?: string[];
  /** Four short lines letting someone recognise whether the service is for
      them, before they read anything else. */
  forYouIf?: string[];
  /** The detailed breakdown: each a heading, an icon and a short paragraph. */
  helpWith?: { title: string; icon: string; body: string }[];
  /** "strong" where the photograph has no open left third for the heading. */
  heroScrim?: "default" | "strong";
  /** Overrides the hero crop where the subjects sit unusually high or low. */
  heroFocus?: string;
  /** How "what we can help with" is arranged. Ten pages in one template read
      as a form letter, so the arrangement varies while the ingredients —
      type, colour, spacing, icons — stay identical. Defaults to "radial". */
  layout?: "radial" | "alternating" | "columns";
  /** Photographs of the service in practice, distributed through the page:
      the first under the intro, the second partway down the detail, the third
      as a full-width band. Rendered only where they exist. */
  gallery?: { src: string; alt: string }[];
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
    imageAlt: "A man shaving at his own bathroom sink while his support worker waits in the doorway",
    /* Both faces sit in the upper fifth of this photograph, higher than the
       32% default, which was cutting the carer's head at the doorway. */
    heroFocus: "50% 18%",
    lead: "Discreet, sensitive support with the everyday, so you can stay in your own home and keep doing things your way.",
    detail: [
      "When illness or reduced mobility makes everyday things harder, personal care fills the gap. It covers washing, dressing, medication and the rest of the daily routine, delivered quietly and at the times that suit you.",
      "We take time to learn how you like things done — the order you prefer, the products you use, what you would rather manage yourself. Independence is the point, so we help where help is wanted and step back where it is not.",
    ],
    forYouIf: [
      "Everyday tasks like washing or dressing have become harder to manage alone",
      "You are managing medication and would like the reassurance of support",
      "A recent change in health or mobility has altered your routine",
      "Family are helping at present, and everyone would benefit from regular support",
    ],
    helpWith: [
      {
        title: "Medication",
        icon: "pill",
        body:
          "It is easy to forget a dose, or to find the packaging itself difficult. We prompt and support you to take the right medication at the right time, and where there is a clear prescription to follow, our trained carers can administer it.",
      },
      {
        title: "Bathing and washing",
        icon: "bath",
        body:
          "We support you with bathing and showering — getting safely in and out, and help with washing and drying where it is wanted. If you prefer to wash independently, a carer can simply be nearby, so you have the reassurance without the intrusion.",
      },
      {
        title: "Dressing",
        icon: "shirt",
        body:
          "Buttons, zips and laces are often the first things to become awkward. Our carers help with any part of getting dressed, so you can start the day as you mean to go on.",
      },
      {
        title: "Continence",
        icon: "heart",
        body:
          "We support both urinary and faecal continence discreetly and without fuss: help getting to and from the bathroom, monitoring personal hygiene, and changing catheter and stoma bags, incontinence pads, bedding and clothing. Dignity comes first, always.",
      },
      {
        title: "Getting up and settling at night",
        icon: "bed",
        body:
          "We work to your routine rather than ours, with help getting in and out of bed at the times that suit you. Where hoisting is needed, our carers are trained to do it safely.",
      },
      {
        title: "Meals",
        icon: "plate",
        body:
          "From the weekly shop to planning and preparing meals, we help you eat well. That includes support at mealtimes themselves where it is useful.",
      },
      {
        title: "Around the home",
        icon: "home",
        body:
          "Laundry, washing up, vacuuming and the general keeping-on-top-of-things. Small tasks, but they are often what makes staying at home feel manageable.",
      },
    ],
    gallery: [
      {
        src: "/images/personal-care-1.png",
        alt:
          "A carer and an older woman filling a weekly pill organiser together at the kitchen table",
      },
      {
        src: "/images/personal-care-2.png",
        alt:
          "An older man buttoning his own shirt while his carer waits with his cardigan",
      },
      {
        src: "/images/personal-care-3.png",
        alt:
          "A carer and an older woman making lunch together at the kitchen worktop",
      },
    ],
    layout: "radial",
  },
  {
    slug: "adults-over-65",
    title: "Caring for Adults Over 65",
    summary:
      "Outstanding care for people over 65, supporting you in maintaining an independent lifestyle.",
    image: "/images/adults-over-65.png",
    imageAlt: "An older woman walking along a sunlit street with her support worker, both laughing",
    lead: "Support that adapts as needs change, so later life is lived at home rather than somewhere else.",
    detail: [
      "Needs rarely arrive all at once. Most people start with a little help — a weekly shop, a hand in the morning — and add more only as it becomes useful.",
      "We review your plan regularly and change it as circumstances do, so care always matches what is actually needed rather than what was agreed months ago.",
    ],
    forYouIf: [
      "Managing at home is getting harder, but moving out is not what you want",
      "You would like help with a few things rather than everything",
      "Family live too far away to help as often as they would like",
      "Needs have changed recently and the old arrangements no longer fit",
    ],
    helpWith: [
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Help with washing, dressing and the morning routine, at the pace and in the order that suits you.",
      },
      {
        title: "Medication",
        icon: "pill",
        body:
          "Prompting, collecting prescriptions, and where there is a clear prescription to follow, administering medication safely.",
      },
      {
        title: "Meals and shopping",
        icon: "plate",
        body:
          "The weekly shop, meal preparation, and company at mealtimes if eating alone has stopped being enjoyable.",
      },
      {
        title: "Around the house",
        icon: "home",
        body:
          "Laundry, washing up, vacuuming and the small jobs that keep a home feeling like one rather than a chore.",
      },
      {
        title: "Getting out",
        icon: "sun",
        body:
          "To appointments, to the shops, to see people. Staying connected matters as much as anything we do indoors.",
      },
      {
        title: "Company",
        icon: "chat",
        body:
          "Someone to talk to who knows you. For many of our clients this turns out to be the part they value most.",
      },
      {
        title: "Changing needs",
        icon: "clipboard",
        body:
          "We review your plan regularly, so care keeps pace with your circumstances instead of lagging behind them.",
      },
    ],
    gallery: [
      {
        src: "/images/adults-over-65-1.png",
        alt:
          "A carer and an older woman unpacking the food shopping together",
      },
      {
        src: "/images/adults-over-65-2.png",
        alt:
          "An older man and his carer talking over tea beside the fire",
      },
      {
        src: "/images/adults-over-65-3.png",
        alt:
          "A carer helping an older woman out of the car outside her home",
      },
    ],
    layout: "alternating",
  },
  {
    slug: "adults-under-65",
    title: "Caring for Adults Under 65",
    summary:
      "Exceptional care for people under 65, supporting you in maintaining an independent lifestyle.",
    image: "/images/adults-under-65.png",
    imageAlt: "A woman working at her laptop at home, laughing with her support worker over a cup of tea",
    lead: "Care built around working life, family and independence — at any age.",
    detail: [
      "Needing support under 65 is different. You may be working, raising children, studying, or simply intent on keeping a life that looks nothing like a care brochure.",
      "We build care around your commitments rather than the other way round, with visit times that fit your week and carers matched to your interests as well as your needs.",
    ],
    forYouIf: [
      "You are working, studying or raising a family alongside a care need",
      "You want support that fits your week rather than a fixed visit slot",
      "A condition or injury has changed what you need help with",
      "You would rather direct your own care than have it arranged for you",
    ],
    helpWith: [
      {
        title: "Visits around your week",
        icon: "clipboard",
        body:
          "Early, late or in between. We build the rota around work, family and everything else you have on.",
      },
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Discreet help with washing, dressing and daily routine, given the way you want it given.",
      },
      {
        title: "Getting to work and study",
        icon: "car",
        body:
          "Support with transport and getting out of the house, so a care need does not become a reason to stay in.",
      },
      {
        title: "Around the home",
        icon: "home",
        body:
          "Laundry, cleaning and the practical running of a household, so your energy goes where you want it.",
      },
      {
        title: "Appointments",
        icon: "phone",
        body:
          "Help arranging and getting to appointments, and keeping track of what was said afterwards.",
      },
      {
        title: "A carer matched to you",
        icon: "people",
        body:
          "We match on interests and temperament as well as skills. You will be spending real time with this person.",
      },
    ],
    gallery: [
      {
        src: "/images/adults-under-65-1.png",
        alt:
          "A woman heading out for the day, talking to her carer in the hallway",
      },
      {
        src: "/images/adults-under-65-2.png",
        alt:
          "A man showing his carer something on a tablet on the sofa",
      },
    ],
    layout: "columns",
  },
  {
    slug: "dementia-care",
    title: "Dementia",
    summary:
      "Every case of dementia is unique. Our specialist-supported carers create personalised plans built around your loved one.",
    image: "/images/dementia-care.png",
    imageAlt: "A woman and her support worker looking through a photo album together on a sofa",
    lead: "Patient, specialist support that brings routine, reassurance and moments of real connection.",
    detail: [
      "Every case of dementia is different, and what helps one person can unsettle another. Our dementia-trained carers build a plan around the individual — their history, their habits, the things that reassure them.",
      "Familiarity matters enormously, so we keep the same carers visiting wherever we can. Staying at home, surrounded by familiar things, is often the single most settling factor of all.",
    ],
    forYouIf: [
      "A diagnosis is recent and you are not sure what support is available",
      "Familiar routines are becoming harder to keep to",
      "A family carer needs regular breaks to keep going",
      "Staying at home matters, and you want to make that possible for longer",
    ],
    helpWith: [
      {
        title: "Familiar faces",
        icon: "people",
        body:
          "We keep the same carers visiting wherever we can. Consistency does more for someone with dementia than almost anything else.",
      },
      {
        title: "Keeping the routine",
        icon: "clipboard",
        body:
          "The same things at the same time in the same order. Routine is reassuring, and we work hard to protect it.",
      },
      {
        title: "Gentle prompting",
        icon: "chat",
        body:
          "Support with washing, dressing and eating offered as a prompt rather than a takeover, so skills are kept as long as possible.",
      },
      {
        title: "Medication",
        icon: "pill",
        body:
          "Careful support with medication, which becomes harder to manage and more important to get right.",
      },
      {
        title: "Life history",
        icon: "book",
        body:
          "We learn about the person: their work, their music, their people. It gives our carers something real to talk about.",
      },
      {
        title: "Meaningful days",
        icon: "sun",
        body:
          "Activity that suits the person now, not who they were five years ago. A walk, a photo album, a hand with the garden.",
      },
      {
        title: "Respite for family",
        icon: "heart",
        body:
          "Regular breaks for the family carer. Looking after someone with dementia is relentless, and rest is not a luxury.",
      },
    ],
    gallery: [
      {
        src: "/images/dementia-care-1.png",
        alt:
          "An older man watering his garden pots while his carer holds the hose",
      },
      {
        src: "/images/dementia-care-2.png",
        alt:
          "An older woman and her carer doing a jigsaw together at the kitchen table",
      },
      {
        src: "/images/dementia-care-3.png",
        alt:
          "A carer helping an older woman into her cardigan in her bedroom",
      },
    ],
    layout: "radial",
  },
  {
    slug: "physical-disabilities",
    title: "Physical Disabilities",
    summary:
      "Our carers support a range of conditions including physical disabilities, Alzheimer's, multiple sclerosis, strokes and cerebral palsy.",
    image: "/images/physical-disabilities.png",
    imageAlt: "A man reaching for a mug at his kitchen worktop, his support worker nearby",
    lead: "Practical, respectful support with mobility, routine and daily living.",
    detail: [
      "Our carers support people living with a wide range of conditions, including physical disabilities, multiple sclerosis, the effects of a stroke, cerebral palsy and acquired brain injury.",
      "The aim is always the same: remove the obstacles, keep the independence. We work to your routine and your equipment, and our carers are trained in safe moving and handling.",
    ],
    forYouIf: [
      "Mobility has changed and your home routine needs to change with it",
      "You need support with transfers or equipment",
      "You are managing a condition such as MS, stroke or cerebral palsy",
      "You want practical help without losing control of your own day",
    ],
    helpWith: [
      {
        title: "Moving and handling",
        icon: "hands",
        body:
          "Safe transfers, including hoisting where it is needed. Our carers are trained and refreshed in this regularly.",
      },
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Washing, dressing and hygiene support, given with dignity and at your direction.",
      },
      {
        title: "Equipment",
        icon: "wheelchair",
        body:
          "Help using the equipment and adaptations in your home, and flagging when something is no longer working for you.",
      },
      {
        title: "Meals and household",
        icon: "plate",
        body:
          "Cooking, shopping and keeping on top of the house, so daily life takes less out of you.",
      },
      {
        title: "Getting out",
        icon: "car",
        body:
          "Support with transport and access, so appointments and plans stay possible.",
      },
      {
        title: "Therapy and appointments",
        icon: "clipboard",
        body:
          "Support with exercises set by your physiotherapist and getting to the appointments that matter.",
      },
    ],
    gallery: [
      {
        src: "/images/physical-disabilities-1.png",
        alt:
          "A man in a wheelchair chopping vegetables at his kitchen worktop, his carer beside him",
      },
      {
        src: "/images/physical-disabilities-3.png",
        alt:
          "An older man doing seated exercises with a resistance band, his carer counting with him",
      },
    ],
    layout: "alternating",
  },
  {
    slug: "sensory-impairments",
    title: "Sensory Impairments",
    summary:
      "We recognise the particular challenges of sensory impairment, and are committed to offering comprehensive support.",
    image: "/images/sensory-impairments.png",
    heroScrim: "strong",
    imageAlt: "A woman making tea confidently in her own kitchen, her support worker beside her",
    lead: "Confident support for people living with sight or hearing loss.",
    detail: [
      "Sensory impairment changes how a home works and how support needs to be given. We recognise those particular challenges and train our carers to meet them properly.",
      "That means clear, unhurried communication, keeping belongings where you expect to find them, and assistance that builds confidence rather than dependence.",
    ],
    forYouIf: [
      "Sight or hearing loss has made daily routines harder",
      "You want support that builds confidence rather than replacing it",
      "Correspondence, appointments or technology are becoming difficult",
      "A recent change in sight or hearing has knocked your confidence",
    ],
    helpWith: [
      {
        title: "Communication that works for you",
        icon: "ear",
        body:
          "We learn how you prefer to communicate and our carers adapt to it, unhurried and without raising their voice unnecessarily.",
      },
      {
        title: "A consistent home",
        icon: "home",
        body:
          "Things stay where you expect to find them. Nothing gets tidied into a new place without telling you.",
      },
      {
        title: "Reading and correspondence",
        icon: "eye",
        body:
          "Help with post, forms and anything else that arrives in print and needs dealing with.",
      },
      {
        title: "Technology and aids",
        icon: "clipboard",
        body:
          "Support using hearing aids, magnifiers, screen readers and the equipment that makes life easier.",
      },
      {
        title: "Getting out",
        icon: "car",
        body:
          "Confident support with travel and appointments, guided the way you want to be guided.",
      },
      {
        title: "Company",
        icon: "chat",
        body:
          "Conversation and company, which matter more when a sensory impairment has made the world feel smaller.",
      },
    ],
    gallery: [
      {
        src: "/images/sensory-impairments-1.png",
        alt:
          "A carer reading a letter aloud to a woman at her dining table",
      },
      {
        src: "/images/sensory-impairments-2.png",
        alt:
          "An older man adjusting his hearing aid while his carer speaks clearly to him",
      },
    ],
    layout: "columns",
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    summary:
      "Housing with personal support for people who need help at home but wish to stay independent — daily tasks, personal care and shared living options.",
    image: "/images/supported-living.png",
    imageAlt: "A young man loading his own washing machine while his support worker chats from the doorway",
    lead: "Housing with personal support, for people who need help at home but want to stay independent.",
    detail: [
      "Supported living combines a place of your own with the support needed to live in it well. It can mean your own tenancy or a shared household, with support ranging from a few hours a week to a constant presence.",
      "The emphasis is on building skills and confidence — cooking, budgeting, travel, work — so that support can step back as independence grows.",
    ],
    forYouIf: [
      "You want your own place, with support to make that work",
      "You are moving out of family or residential care for the first time",
      "You would like to build skills rather than have things done for you",
      "A shared household with support would suit you better than living alone",
    ],
    helpWith: [
      {
        title: "Your own tenancy",
        icon: "key",
        body:
          "Your home, your rules, your front door. Support comes to you rather than you fitting into a service.",
      },
      {
        title: "Daily living",
        icon: "home",
        body:
          "Cooking, cleaning, laundry and shopping, done alongside you so the skills build over time.",
      },
      {
        title: "Money and admin",
        icon: "clipboard",
        body:
          "Budgeting, bills, benefits and appointments. The paperwork side of independence is often the hardest part.",
      },
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Where it is needed, given discreetly and only to the extent it is wanted.",
      },
      {
        title: "Getting out and involved",
        icon: "sun",
        body:
          "Work, college, clubs, friends. Support to build a life outside the front door as well as behind it.",
      },
      {
        title: "Support that steps back",
        icon: "people",
        body:
          "As confidence grows, support reduces. That is the aim from the first day, and we review it regularly.",
      },
    ],
    gallery: [
      {
        src: "/images/supported-living-1.png",
        alt:
          "A young man cooking pasta in his own flat while his support worker chats from the doorway",
      },
    ],
    layout: "alternating",
  },
  {
    slug: "learning-disability",
    title: "Learning Disability",
    summary:
      "Personalised support that helps people build independence, confidence and life skills, promoting dignity, inclusion and well-being.",
    image: "/images/learning-disability.png",
    imageAlt: "A young woman painting at a table while her support worker looks on, delighted",
    lead: "Personalised support that builds independence, confidence and life skills.",
    detail: [
      "We support people with learning disabilities to live the life they choose, with as much or as little help as that takes. Choice comes first, and support is offered rather than imposed.",
      "Our care promotes dignity, inclusion and overall well-being, and our carers are chosen for patience and a genuine interest in the people they support.",
    ],
    forYouIf: [
      "You want support that offers choices rather than making them for you",
      "Building independence and confidence is the goal",
      "You need help accessing work, college or activities",
      "Family are looking for support that treats you as an adult",
    ],
    helpWith: [
      {
        title: "Choice first",
        icon: "chat",
        body:
          "Support is offered, not imposed. Everything starts from what you want your day to look like.",
      },
      {
        title: "Daily routines",
        icon: "clipboard",
        body:
          "Help with getting up, meals, medication and the shape of the day, in a way that builds habits rather than dependence.",
      },
      {
        title: "Life skills",
        icon: "key",
        body:
          "Cooking, shopping, travel, money. Practical skills practised together until they are yours.",
      },
      {
        title: "Work and learning",
        icon: "sun",
        body:
          "Support getting to college, work or training, and staying there once you have started.",
      },
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Where it is needed, given respectfully and with as much privacy as possible.",
      },
      {
        title: "Being part of things",
        icon: "people",
        body:
          "Clubs, groups, friendships and community. Inclusion is not an add-on to the care plan.",
      },
    ],
    layout: "columns",
  },
  {
    slug: "hospital-discharge",
    title: "Hospital Discharge",
    summary:
      "Personalised support for a safe, smooth transition from hospital to home, helping people recover confidently and avoid readmission.",
    image: "/images/hospital-discharge.png",
    imageAlt: "A man settling back into his armchair at home while his support worker brings tea",
    lead: "A calm, well-arranged return home, so recovery happens safely.",
    detail: [
      "Coming home after a hospital stay is the point at which things most often go wrong. We arrange the practical side — the house warm and stocked, medication understood, equipment in place — so that arriving home feels safe rather than daunting.",
      "Support is usually most intensive in the first days and eases as confidence returns. Getting this period right is what prevents readmission.",
    ],
    forYouIf: [
      "You are in hospital now and planning to go home",
      "An admission is coming up and you want support arranged in advance",
      "You are home already but struggling more than expected",
      "Family are worried about how the first weeks at home will go",
    ],
    helpWith: [
      {
        title: "Before you come home",
        icon: "home",
        body:
          "The heating on, the fridge stocked, the bed made and the route to the bathroom clear. Small things that change how arriving feels.",
      },
      {
        title: "Prescriptions and shopping",
        icon: "basket",
        body:
          "Collecting what you need so it is waiting rather than something to sort out on day one.",
      },
      {
        title: "New medication",
        icon: "pill",
        body:
          "Hospital often changes a prescription. We help you understand what has changed and keep to it.",
      },
      {
        title: "Mobility and equipment",
        icon: "wheelchair",
        body:
          "Support with any new equipment, and with moving safely around your home while you are recovering.",
      },
      {
        title: "Personal care while you recover",
        icon: "bath",
        body:
          "More help at first, easing off as you get stronger. The plan is meant to shrink.",
      },
      {
        title: "Keeping family informed",
        icon: "phone",
        body:
          "We keep the people who care about you in the loop, which is often what lets them stop worrying.",
      },
    ],
    layout: "alternating",
  },
  {
    slug: "live-in-care",
    title: "Live-in Care",
    summary:
      "A carer who lives with you at home — round-the-clock support without moving.",
    image: "/images/live-in-care.png",
    imageAlt: "An elderly couple having breakfast together while their live-in carer makes toast",
    lead: "A carer who lives with you at home — round-the-clock support, without moving.",
    detail: [
      "Live-in care is the alternative to a care home for people who need support through the day and reassurance overnight. A carer moves in, and life carries on in the house you know.",
      "For couples it means staying together. For everyone it means keeping your own routine, your own bed and your own front door.",
    ],
    forYouIf: [
      "Round-the-clock support is needed, and a care home is not what you want",
      "You are a couple and want to stay together",
      "Overnight reassurance matters as much as daytime help",
      "Familiar surroundings are important to you or your relative",
    ],
    helpWith: [
      {
        title: "Someone there",
        icon: "people",
        body:
          "A carer lives in your home, so support is available through the day and reassurance is there overnight.",
      },
      {
        title: "Your routine, kept",
        icon: "clipboard",
        body:
          "You decide when to get up, what to eat and how the day runs. That is the difference between home and an institution.",
      },
      {
        title: "Personal care",
        icon: "bath",
        body:
          "Washing, dressing and the daily routine, given by someone who knows exactly how you like it done.",
      },
      {
        title: "Meals and household",
        icon: "plate",
        body:
          "Cooking, shopping, laundry and keeping the house running as it always has.",
      },
      {
        title: "Medication",
        icon: "pill",
        body:
          "Full support with medication, including collecting prescriptions and keeping track of changes.",
      },
      {
        title: "Couples together",
        icon: "heart",
        body:
          "Live-in care often lets couples stay in their own home together when other options would separate them.",
      },
      {
        title: "Company",
        icon: "chat",
        body:
          "Someone in the house to talk to, which for many people is the single biggest change.",
      },
    ],
    layout: "columns",
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
    icon: "kindness",
    body:
      "Our friendly and dedicated carers will always meet you with warmth and a smile. With Moor & Coast Care, care doesn't have to feel clinical.",
  },
  {
    title: "Respect",
    icon: "respect",
    body:
      "By treating every client with dignity and sensitivity, no matter the circumstance, we maintain our service users' independence and pride.",
  },
  {
    title: "Highest quality of care",
    icon: "quality",
    body:
      "We always provide the highest standard of care, adapting and responding to our clients' changing needs for as long as you need us.",
  },
  {
    title: "Reliability and punctuality",
    icon: "reliability",
    body:
      "We work as closely as possible to the client's own schedule. Let us work around you, so that life isn't all about appointments.",
  },
  {
    title: "Embracing cultural differences",
    icon: "culture",
    body:
      "We welcome all cultural differences and promise to be respectful regardless of religion, ethnicity, sexual orientation or any of the things that make you who you are.",
  },
  {
    title: "That something extra",
    icon: "extra",
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
