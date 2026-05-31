// ── YELLOW-TAIL PREMIERE DISCOVERY STEPS ──
// Tailored for a film premiere microsite for Yellow-Tail / Indelible Pictures.

const STEPS = [
  { id: "film", stage: "01", title: "The film.", subtitle: "Let's start with the basics about Yellow-Tail.", fields: [
    { key: "canonicalTitle", label: "Which title should we use everywhere?", type: "select", options: ["YELLOW TAIL (two words, as on the poster)", "Yellow-Tail (hyphenated, as on IMDb)"], required: true },
    { key: "logline", label: "Approved logline for the site", type: "textarea", placeholder: "The one-liner you want on the microsite. e.g. Two brothers who survived the same childhood horror in opposite ways are forced back together — and discover that how you answer violence can be more dangerous than the violence itself.", required: true },
    { key: "synopsis", label: "Approved synopsis", type: "textarea", placeholder: "2–4 sentences that capture the story. We'll use this as-is on the site — send us the signed-off version.", required: true },
    { key: "runtime", label: "Runtime", type: "text", placeholder: "e.g. 18 minutes", required: false },
    { key: "language", label: "Language(s)", type: "text", placeholder: "e.g. English", required: false },
    { key: "genre", label: "How would you genre-tag the film?", type: "text", placeholder: "e.g. Psychological thriller / drama", required: true },
  ]},

  { id: "premiere", stage: "02", title: "The premiere.", subtitle: "Tell us about the event so we can build the site around it.", fields: [
    { key: "premiereDate", label: "Confirmed premiere date", type: "text", placeholder: "e.g. Saturday 28 June 2026", required: true },
    { key: "premiereVenue", label: "Venue name and city", type: "text", placeholder: "e.g. Curzon Soho, London", required: true },
    { key: "premiereFormat", label: "What kind of event is this?", type: "multiselect", options: ["Public screening — open ticketing", "Invite-only / industry screening", "Press & media event", "Q&A or panel after the screening", "Reception / drinks", "Hybrid — in-person + livestream", "Red carpet / step-and-repeat"], required: true },
    { key: "premiereLabel", label: "How should we bill the event?", type: "select", options: ["UK Premiere", "World Premiere", "London Premiere", "New York Premiere", "Special Screening", "Other — I'll specify"], required: true },
    { key: "premiereLabelOther", label: "If other, specify", type: "text", placeholder: "", required: false },
    { key: "ticketing", label: "How will people attend?", type: "select", options: ["Free RSVP — we need an RSVP form on the site", "Paid tickets — link to external ticketing (Eventbrite, etc.)", "Paid tickets — we want ticketing on the site itself", "Invite only — no public RSVP needed", "Not decided yet"], required: true },
    { key: "ticketingUrl", label: "External ticketing URL (if applicable)", type: "text", placeholder: "https://", required: false },
  ]},

  { id: "diptych", stage: "03", title: "The bigger picture.", subtitle: "Yellow-Tail and FOLIO — help us understand the narrative.", fields: [
    { key: "diptychImportance", label: "How prominently should FOLIO feature on the site?", type: "select", options: ["Front and centre — this premiere is a launchpad for the feature", "Meaningful section — a clear 'what's next' moment", "A subtle mention — keep the focus on Yellow-Tail", "Don't mention FOLIO at all"], required: true },
    { key: "folioSynopsis", label: "Approved FOLIO synopsis for the site", type: "textarea", placeholder: "If we're featuring FOLIO, give us the copy you'd like us to use. Leave blank if not applicable.", required: false },
    { key: "folioStatus", label: "Current status of FOLIO", type: "select", options: ["In development — early stages", "In development — screenplay complete", "Pre-production", "Seeking financing / co-production partners", "Prefer not to say publicly"], required: false },
    { key: "folioCta", label: "What should visitors do if they're interested in FOLIO?", type: "multiselect", options: ["Sign up to a mailing list", "Contact the producer directly", "Download a look-book or pitch deck", "Nothing — information only for now", "Other — I'll specify"], required: false },
  ]},

  { id: "creative", stage: "04", title: "Look and feel.", subtitle: "The poster gives us a strong steer — but we want to hear it from you.", fields: [
    { key: "keyMoment", label: "Is there a key scene, image, or idea from the film we should lean into on the site?", type: "textarea", placeholder: "e.g. The moment the brothers first see each other again. The pencil. The tension of a conversation where nothing is said directly. Whatever captures the essence of the film for you.", required: true },
    { key: "emotionalTakeaway", label: "What should someone feel after 30 seconds on the site?", type: "textarea", placeholder: "e.g. Unsettled but curious. Like something is about to happen. Like they need to see this film.", required: true },
    { key: "toneWords", label: "Three words that describe the tone you want for the site", type: "text", placeholder: "e.g. tense, literary, premium", required: true },
    { key: "toneNot", label: "Three words the site should definitely NOT feel", type: "text", placeholder: "e.g. scrappy, generic, loud", required: true },
    { key: "closestTo", label: "Which feels closer to the right direction?", type: "pairs", pairs: [
      ["Dark & atmospheric", "Light & airy"],
      ["Restrained & minimal", "Rich & cinematic"],
      ["Arthouse / festival", "Mainstream / commercial"],
      ["Text-driven & literary", "Image-driven & visual"],
      ["The site is an event page", "The site is a world to enter"],
    ]},
    { key: "colorDirection", label: "Colour direction — do you agree with the poster palette?", type: "select", options: ["Yes — muted greens and denim with yellow accent only", "Mostly, but I'd adjust a few things", "I'd prefer a different direction entirely", "Open to your recommendation"], required: true },
    { key: "colorNotes", label: "Any colour notes?", type: "textarea", placeholder: "If you'd adjust the palette, tell us what you're thinking.", required: false },
    { key: "referenceSites", label: "Any film sites or microsites you think look great?", type: "textarea", placeholder: "Links to any premiere sites, film pages, or campaign microsites you admire — from any genre. Tell us what you liked about each.", required: false },
  ]},

  { id: "people", stage: "05", title: "Cast & crew.", subtitle: "Who should be featured on the site and how.", fields: [
    { key: "castBios", label: "Will you provide bios and headshots for the cast?", type: "select", options: ["Yes — we'll send them over", "Just names, no bios needed", "Only for leads (Bryant L. Lewis, Robert Barnes Jr., Nathaniel J. Ryan)", "Not sure yet — we need guidance"], required: true },
    { key: "nameConfirm", label: "Please confirm exact spellings", type: "textarea", placeholder: "Especially: 'Eldrige' or 'Eldridge'? Is 'Firo' a mononym? Full name for Olivia Ridge? Which actors play the two brothers?", required: false },
    { key: "directorBio", label: "Approved director bio for Tosin Oshinyemi", type: "textarea", placeholder: "A paragraph about Tosin for the site. We can draft this for you if you prefer — just say.", required: false },
    { key: "additionalCrew", label: "Any additional crew to credit on the site?", type: "textarea", placeholder: "e.g. Director of Photography, Composer, Production Designer — anyone beyond what's on the poster.", required: false },
    { key: "laurels", label: "Festival selections, laurels, or awards?", type: "textarea", placeholder: "Any selections, nominations, or wins to display. Leave blank if none yet.", required: false },
  ]},

  { id: "assets", stage: "06", title: "What exists.", subtitle: "We need strong visuals to build a strong site. Help us understand what you have.", fields: [
    { key: "stills", label: "Film stills — what can you provide?", type: "select", options: ["We have a full set of production stills (10+)", "A few key stills (3–5)", "Just the poster — no other stills yet", "We can pull frames from the film", "Nothing yet — we need guidance"], required: true },
    { key: "stillsNote", label: "Any stills that are especially strong?", type: "textarea", placeholder: "Describe any images you think capture the film — even loosely. e.g. There's a wide shot of both brothers in the same room, not looking at each other. Or: the close-up of the pencil in his hand.", required: false },
    { key: "videoAssets", label: "Video assets — what's available?", type: "multiselect", options: ["Trailer (final cut)", "Teaser (30–60 seconds)", "Behind-the-scenes footage", "Director's video statement or interview", "Sizzle reel or proof-of-concept clip", "We can provide a clip from the film", "Nothing yet"], required: true },
    { key: "trailerStatus", label: "If there's a trailer or teaser, where is it?", type: "select", options: ["Ready to embed — we'll send the link (YouTube / Vimeo)", "In production — will be ready before site launch", "No trailer planned", "Not sure yet"], required: true },
    { key: "audioScore", label: "Is there a score or soundtrack we could use on the site?", type: "select", options: ["Yes — we can provide a clip or track", "There's a score but we'd prefer not to use it online", "No original score", "Not sure — let's discuss"], required: false },
    { key: "posterKeyArt", label: "Poster and key art", type: "multiselect", options: ["Full-res premiere poster", "Alternative poster or key art", "Production company logos (IPG, MCM Creative)", "Title treatment / logotype as a separate file", "None of the above"], required: true },
    { key: "btsPhotos", label: "Behind-the-scenes photos?", type: "select", options: ["Yes — we have on-set / production photos", "A few informal ones", "No BTS photography"], required: false },
    { key: "pressQuotes", label: "Press quotes or endorsements?", type: "select", options: ["Yes — we'll send approved quotes", "We have some but need to verify permissions", "No — not applicable", "We'd like help sourcing / formatting them"], required: false },
    { key: "socialMedia", label: "Social media links for the film or production", type: "textarea", placeholder: "Instagram, X/Twitter, Vimeo, YouTube, Letterboxd — anything we should link to from the site.", required: false },
    { key: "pressKit", label: "Do you have a press kit or EPK?", type: "select", options: ["Yes — we can provide it", "We're putting one together", "No — not applicable"], required: false },
  ]},

  { id: "scope", stage: "07", title: "The site.", subtitle: "What are we actually building.", fields: [
    { key: "mustHaveSections", label: "Which sections feel essential?", type: "multiselect", options: ["Hero / key art", "About the film (synopsis, logline)", "Cast & crew", "Premiere details (date, venue, RSVP)", "Trailer / teaser embed", "Director's vision / statement", "The FOLIO connection (what's next)", "Press / in the press", "Production company info", "Contact / press enquiries", "Newsletter / mailing list signup"], required: true },
    { key: "callsToAction", label: "What's the primary thing you want visitors to do?", type: "select", options: ["RSVP / buy tickets for the premiere", "Sign up to a mailing list", "Watch the trailer", "Contact the production for press / distribution", "Learn about FOLIO", "Multiple — depends on the visitor"], required: true },
    { key: "siteLifespan", label: "How long does this site need to live?", type: "select", options: ["Just for the premiere — a few weeks", "Through the festival run — several months", "Permanently — it becomes the film's home online", "Not sure — whatever you recommend"], required: true },
    { key: "domain", label: "Do you have a domain in mind?", type: "text", placeholder: "e.g. yellowtailfilm.com, yellowtail-film.co.uk", required: false },
    { key: "timeline", label: "When do you need this live?", type: "select", options: ["As soon as possible", "At least 2 weeks before the premiere", "Within a month", "No rush — getting it right matters more"], required: true },
  ]},

  { id: "contact", stage: "08", title: "Last thing.", subtitle: "How do we reach you?", fields: [
    { key: "contactName", label: "Your name", type: "text", placeholder: "", required: true },
    { key: "contactRole", label: "Your role on the production", type: "text", placeholder: "e.g. Executive Producer, Director, Production Coordinator", required: false },
    { key: "contactEmail", label: "Email", type: "text", placeholder: "", required: true },
    { key: "contactPhone", label: "Phone (optional)", type: "text", placeholder: "", required: false },
    { key: "anythingElse", label: "Anything else we should know?", type: "textarea", placeholder: "Any context, constraints, inspirations, or things you want to flag before we start. There's no wrong answer.", required: false },
  ]},
];

export default STEPS;
