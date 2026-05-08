// ── BOUTEILLE DISCOVERY STEPS ──
// Tailored for a Brussels wine shop building a bilingual brochure site.

const STEPS = [
  { id: "setup", stage: "01", title: "The basics.", subtitle: "Tell us about your shop.", fields: [
    { key: "shopName", label: "Shop name", type: "text", placeholder: "e.g. Bouteille", required: true },
    { key: "whatYouDo", label: "What does Bouteille offer?", type: "textarea", placeholder: "In a sentence or two — what would you tell someone who's never visited? e.g. We're an independent wine shop in Brussels specialising in natural and small-producer wines from France and Italy.", required: true },
    { key: "audience", label: "Who are your customers?", type: "textarea", placeholder: "Who typically walks through the door? e.g. Young professionals who want interesting wines without the pretension, locals buying for dinner, tourists looking for something to take home.", required: true },
    { key: "stage", label: "Where are you at?", type: "select", options: ["Pre-launch — we're still setting up the shop", "Just opened — first few months", "Established — we have regulars but no real web presence", "Well-known locally — time to look the part online"], required: true },
    { key: "goals", label: "What should this website achieve?", type: "textarea", placeholder: "What does success look like for you? e.g. People find us when they search for wine in Brussels, they get a feel for the shop before visiting, eventually we want to sell online too.", required: true },
  ]},

  { id: "shop", stage: "02", title: "The shop.", subtitle: "Help us understand the experience you offer in person.", fields: [
    { key: "wineStyle", label: "What kind of wines do you focus on?", type: "multiselect", options: ["Natural / biodynamic", "Classic French", "Italian", "Spanish & Portuguese", "New World", "Orange / skin-contact", "Pet-nat / sparkling", "Mixed — a curated range across styles"], required: true },
    { key: "priceRange", label: "What's your typical price range?", type: "select", options: ["Accessible — mostly under €15", "Mid-range — €12–€30", "Premium — €20–€60+", "Mixed — something for every budget"], required: true },
    { key: "inStoreExperience", label: "Describe the in-store experience", type: "textarea", placeholder: "What does it feel like to walk in? e.g. Relaxed, no pressure. There's always a bottle open to taste. We chat, we recommend, it's like visiting a friend who knows wine.", required: true },
    { key: "tastingsEvents", label: "Do you run tastings or events?", type: "select", options: ["Yes — regularly", "Occasionally", "Planning to start", "No"], required: true },
    { key: "tastingsDetail", label: "Tell us more about your events", type: "textarea", placeholder: "What kind of tastings or events? e.g. Weekly Thursday tastings with a winemaker, occasional supper clubs, private tastings for groups.", required: false },
  ]},

  { id: "personality", stage: "03", title: "Personality.", subtitle: "If your shop walked into a room, what would people notice?", fields: [
    { key: "brandPerson", label: "Describe your shop as if it were a person", type: "textarea", placeholder: "What kind of person would they be? e.g. Knowledgeable but never snobby. The kind of person who'd pour you a glass before you've even sat down and tell you the story behind every bottle.", required: true },
    { key: "threeWords", label: "Three words that describe your brand", type: "text", placeholder: "e.g. honest, convivial, curious", required: true },
    { key: "notThisWords", label: "Three words your brand is definitely NOT", type: "text", placeholder: "e.g. pretentious, corporate, mass-market", required: true },
    { key: "closestTo", label: "Which feels closer to your brand?", type: "pairs", pairs: [
      ["Traditional wine shop", "Modern wine bar feel"],
      ["Serious & educational", "Relaxed & social"],
      ["Curated & minimal", "Abundant & generous"],
      ["Neighbourhood local", "Destination shop"],
      ["Rustic & earthy", "Clean & contemporary"],
    ]},
  ]},

  { id: "references", stage: "04", title: "References.", subtitle: "Show us what catches your eye — and what you want to stand apart from.", fields: [
    { key: "admiredBrands", label: "2–3 wine shops, bars, or brands you admire", type: "textarea", placeholder: "These don't have to be in wine. Anything you've seen and thought \"I wish our brand felt like that.\" Tell us what you liked about each. e.g. Cave in Copenhagen — love how warm and unpretentious it feels. Aesop — the consistency and restraint of everything they do.", required: true },
    { key: "competitors", label: "Who are the other wine shops nearby?", type: "textarea", placeholder: "Names or websites of shops you'd consider your neighbours or competitors. We want to see the landscape so we can help you stand out.", required: false },
    { key: "avoidBrands", label: "Anything you want to avoid?", type: "textarea", placeholder: "Is there a style or look you really don't want? e.g. Nothing too corporate, no clip-art grapes, no generic stock photos of vineyards.", required: false },
  ]},

  { id: "existing", stage: "05", title: "What exists.", subtitle: "Help us understand what you're working with today.", fields: [
    { key: "existingBranding", label: "Do you have any branding already?", type: "select", options: ["Nothing — starting from scratch", "Just a logo", "Logo and some colours or fonts", "Full brand identity (that we're refreshing)"], required: true },
    { key: "existingUrl", label: "Current website or social page (if any)", type: "text", placeholder: "https:// or @handle", required: false },
    { key: "keepOrKill", label: "What do you like about your current look? What don't you like?", type: "textarea", placeholder: "e.g. The logo is good but our Instagram doesn't feel cohesive. We like the colours but don't have a website at all yet.", required: false },
    { key: "contentReady", label: "What content do you already have?", type: "multiselect", options: ["Professional photography of the shop", "Photos of the wine selection", "Written descriptions or tasting notes", "Video content", "Photos of events or tastings", "Winemaker / supplier stories", "Nothing yet — we need guidance"], required: true },
    { key: "languages", label: "What languages do you need the site in?", type: "multiselect", options: ["French", "English", "Dutch", "Just one language for now"], required: true },
  ]},

  { id: "sensory", stage: "06", title: "Sensory.", subtitle: "These might feel unusual, but they help us understand the atmosphere you want.", fields: [
    { key: "material", label: "If your shop were a material, what would it be?", type: "text", placeholder: "e.g. worn oak, terracotta, linen, raw concrete, brushed brass", required: false },
    { key: "timeOfDay", label: "What time of day feels like your shop?", type: "select", options: ["Early morning — calm, full of possibility", "Late afternoon — golden light, end-of-day reward", "Golden hour — warm and confident", "Early evening — apéro hour, convivial", "Late night — intimate, candle-lit"], required: false },
    { key: "season", label: "What season?", type: "select", options: ["Spring — fresh, light, new", "Summer — bold, vibrant, warm", "Autumn — rich, mature, textured", "Winter — cosy, intimate, grounding"], required: false },
    { key: "musicPlaying", label: "What music is playing in the shop?", type: "text", placeholder: "e.g. French jazz, lo-fi, vinyl soul, nothing — just conversation", required: false },
    { key: "anythingElse", label: "Anything else that captures the feeling?", type: "textarea", placeholder: "A place, a memory, a photo, a meal — anything that captures the mood you're going for. There's no wrong answer.", required: false },
  ]},

  { id: "scope", stage: "07", title: "The site.", subtitle: "Some specifics about what we're building.", fields: [
    { key: "mustHavePages", label: "Which pages feel essential?", type: "multiselect", options: ["Home", "About / Our Story", "The Wines", "Visit Us (location & hours)", "Tastings & Events", "Contact", "Blog / Journal", "Online Shop (future)"], required: true },
    { key: "functionality", label: "Any specific features?", type: "multiselect", options: ["Wine catalogue (browse, not buy — for now)", "Event booking or RSVP", "Newsletter signup", "Instagram feed integration", "Google Maps embed", "Contact form", "Age verification gate", "Online shop (Phase 2)"], required: true },
    { key: "shopifyFuture", label: "How important is selling online eventually?", type: "select", options: ["Very — it's the main goal after the brochure site", "Would be nice eventually", "Not a priority — the site is about the physical shop", "Not interested in online sales"], required: true },
    { key: "timeline", label: "When do you need this?", type: "select", options: ["As soon as possible", "Within a month", "Within 2–3 months", "No rush — getting it right matters more"], required: true },
  ]},

  { id: "contact", stage: "08", title: "Last thing.", subtitle: "How do we reach you?", fields: [
    { key: "contactName", label: "Your name", type: "text", placeholder: "", required: true },
    { key: "contactEmail", label: "Email", type: "text", placeholder: "", required: true },
    { key: "contactPhone", label: "Phone (optional)", type: "text", placeholder: "", required: false },
  ]},
];

export default STEPS;
