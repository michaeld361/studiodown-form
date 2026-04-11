import { useState, useEffect, useRef } from "react";

// ── CONFIG ──
const SUPABASE_URL = "https://jjoiqomqmyqlqfuzdliv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb2lxb21xbXlxbHFmdXpkbGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTAyNDgsImV4cCI6MjA5MTQ2NjI0OH0.GWzD04BdP5LzF-IKmTGx_xlM1nY15Sc_wNRQiycnt-g";

// ── CACHE HELPERS ──
const CACHE_KEY = "studiodown_discovery";
function saveCache(data, step, view) {
  try { window.localStorage.setItem(CACHE_KEY, JSON.stringify({ data, step, view, ts: Date.now() })); } catch (e) {}
}
function loadCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.ts > 7 * 24 * 60 * 60 * 1000) { clearCache(); return null; } // expire after 7 days
    return cached;
  } catch (e) { return null; }
}
function clearCache() {
  try { window.localStorage.removeItem(CACHE_KEY); } catch (e) {}
}

// ── DISCOVERY STEPS ──
const STEPS = [
  { id: "setup", stage: "01", title: "The basics.", subtitle: "Tell us about your company.", fields: [
    { key: "companyName", label: "Company name", type: "text", placeholder: "e.g. Darlings Makeup", required: true },
    { key: "whatYouDo", label: "What does your company do?", type: "textarea", placeholder: "In a sentence or two, what would you tell a friend? e.g. We're an independent makeup studio in Brussels offering bridal and editorial services.", required: true },
    { key: "audience", label: "Who are your customers?", type: "textarea", placeholder: "Who typically buys from you or uses your services? e.g. Brides-to-be in their late 20s, fashion-conscious women looking for cruelty-free products.", required: true },
    { key: "stage", label: "Where are you at?", type: "select", options: ["Pre-launch — we're still building", "Just launched — first customers", "Growing — product works, need to look the part", "Established — time for a refresh"], required: true },
    { key: "goals", label: "What does success look like?", type: "textarea", placeholder: "What do you want this project to achieve? e.g. A website that makes people want to book, a brand that looks as good as the service we offer, something we're proud to share on social.", required: true },
  ]},
  { id: "personality", stage: "02", title: "Personality.", subtitle: "If your brand walked into a room, what would people notice?", fields: [
    { key: "brandPerson", label: "Describe your brand as if it were a person", type: "textarea", placeholder: "What kind of person would they be? e.g. Friendly but stylish. The kind of person who makes you feel at ease but always looks effortlessly put together.", required: true },
    { key: "threeWords", label: "Three words that describe your brand", type: "text", placeholder: "e.g. elegant, approachable, modern", required: true },
    { key: "notThisWords", label: "Three words your brand is definitely NOT", type: "text", placeholder: "e.g. cheap, corporate, boring", required: true },
    { key: "closestTo", label: "Which feels closer to your brand?", type: "pairs", pairs: [
      ["Loud & confident", "Quiet & assured"],
      ["Warm & human", "Cool & precise"],
      ["Playful & fun", "Serious & expert"],
      ["Minimal & restrained", "Rich & detailed"],
    ]},
  ]},
  { id: "references", stage: "03", title: "References.", subtitle: "Show us what catches your eye — and who you're competing with.", fields: [
    { key: "admiredBrands", label: "2–3 websites or brands you think look great", type: "textarea", placeholder: "These don't have to be in your industry. Just anything you've seen and thought \"I wish our brand looked like that.\" Tell us what you liked about each.", required: true },
    { key: "competitors", label: "Who are your main competitors?", type: "textarea", placeholder: "Names or website addresses. We want to see who you sit alongside so we can help you stand out from them.", required: false },
    { key: "avoidBrands", label: "Anything you want to avoid?", type: "textarea", placeholder: "Is there a style, colour, or look that you really don't want? e.g. Nothing too corporate, no stock photos, no neon colours.", required: false },
  ]},
  { id: "existing", stage: "04", title: "What exists.", subtitle: "Help us understand what you're working with today.", fields: [
    { key: "existingBranding", label: "Do you have any branding already?", type: "select", options: ["Nothing — starting from scratch", "Just a logo", "Logo and some colours or fonts", "Full brand guidelines (that we're refreshing)"], required: true },
    { key: "existingUrl", label: "Current website (if you have one)", type: "text", placeholder: "https://", required: false },
    { key: "keepOrKill", label: "What do you like about your current look? What don't you like?", type: "textarea", placeholder: "e.g. The logo is fine but the website looks outdated. We like our colours but the overall feel doesn't match the quality of what we do.", required: false },
    { key: "contentReady", label: "What content do you already have?", type: "multiselect", options: ["Professional photography", "Product photos", "Written content or copy", "Video content", "Team photos", "Nothing yet — we need guidance"], required: true },
  ]},
  { id: "sensory", stage: "05", title: "Sensory.", subtitle: "These might feel unusual, but they help us understand the feeling you're after.", fields: [
    { key: "material", label: "If your brand were a material, what would it be?", type: "text", placeholder: "e.g. soft cotton, polished marble, warm wood", required: false },
    { key: "timeOfDay", label: "What time of day feels like your brand?", type: "select", options: ["Early morning — calm, full of possibility", "Mid-morning — bright and energetic", "Golden hour — warm and confident", "Late evening — intimate and focused", "Midnight — bold and dramatic"], required: false },
    { key: "season", label: "What season?", type: "select", options: ["Spring — fresh, light, new", "Summer — bold, vibrant, warm", "Autumn — rich, mature, textured", "Winter — clean, crisp, minimal"], required: false },
    { key: "anythingElse", label: "Anything else that captures the feeling?", type: "textarea", placeholder: "A song, a place, a photo, a memory — anything that captures the mood you're going for. There's no wrong answer.", required: false },
  ]},
  { id: "scope", stage: "06", title: "The build.", subtitle: "What are we actually making for you?", fields: [
    { key: "platforms", label: "What do you need?", type: "multiselect", options: ["Marketing website", "Web application", "Mobile app", "Pitch deck / investor materials", "Social media templates", "Print / packaging"], required: true },
    { key: "functionality", label: "Any specific features?", type: "multiselect", options: ["Online shop", "Booking or appointment system", "Blog or journal", "Portfolio or case studies", "Contact form", "Newsletter signup", "User accounts or login area", "None of the above — just a clean site"], required: true },
    { key: "pages", label: "Roughly how many pages?", type: "select", options: ["Just a landing page", "2–5 pages", "6–10 pages", "10+ pages", "Not sure yet"], required: true },
    { key: "timeline", label: "When do you need this?", type: "select", options: ["As soon as possible", "Within 2 weeks", "Within a month", "No rush — getting it right matters more"], required: true },
  ]},
  { id: "contact", stage: "07", title: "Last thing.", subtitle: "How do we reach you?", fields: [
    { key: "contactName", label: "Your name", type: "text", placeholder: "", required: true },
    { key: "contactEmail", label: "Email", type: "text", placeholder: "", required: true },
    { key: "contactPhone", label: "Phone (optional)", type: "text", placeholder: "", required: false },
  ]},
];

// ── BLOB ──
function LivingBlob({ dimmed }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let time = 0;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const noise = (x, y, t) =>
      Math.sin(x * 1.2 + t) * Math.cos(y * 0.8 - t * 0.6) * 0.5 +
      Math.sin(x * 2.4 - t * 0.8 + y) * 0.25 +
      Math.cos(y * 1.8 + t * 1.1 + x * 0.5) * 0.25 +
      Math.sin(x * 0.5 + y * 0.7 + t * 0.4) * 0.3;

    const draw = () => {
      time += 0.006;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const baseRadius = Math.max(Math.min(w, h) * 0.35, 260);

      const layers = [
        { scale: 1.15, opacity: 0.03, speed: 0.5, hue: 260, sat: 8 },
        { scale: 1.0, opacity: 0.07, speed: 1, hue: 220, sat: 15 },
        { scale: 0.85, opacity: 0.05, speed: 1.3, hue: 240, sat: 10 },
        { scale: 0.65, opacity: 0.04, speed: 0.7, hue: 200, sat: 20 },
      ];

      for (const layer of layers) {
        const r = baseRadius * layer.scale;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const angle = (i / 120) * Math.PI * 2;
          const nx = Math.cos(angle);
          const ny = Math.sin(angle);
          const distort =
            noise(nx * 2, ny * 2, time * layer.speed) * 0.4 +
            noise(nx * 4, ny * 4, time * layer.speed * 0.6) * 0.15 +
            noise(nx * 1, ny * 1, time * layer.speed * 1.4) * 0.2;
          const x = cx + Math.cos(angle) * r * (1 + distort);
          const y = cy + Math.sin(angle) * r * (1 + distort);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.6);
        const c = `hsla(${layer.hue}, ${layer.sat}%, 85%,`;
        grad.addColorStop(0, `${c} ${layer.opacity * 2.5})`);
        grad.addColorStop(0.4, `${c} ${layer.opacity * 1.5})`);
        grad.addColorStop(0.7, `${c} ${layer.opacity * 0.6})`);
        grad.addColorStop(1, `${c} 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.3);
      coreGrad.addColorStop(0, "rgba(255,255,255,0.03)");
      coreGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1,
      opacity: dimmed ? 0 : 1, transition: "opacity 0.8s ease",
    }} />
  );
}

// ── FORM COMPONENTS ──
function PairSelector({ pairs, value = {}, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {pairs.map(([left, right], i) => (
        <div key={i} style={{ display: "flex", gap: 0, width: "100%" }}>
          {[["left", left, "8px 0 0 8px", "none"], ["right", right, "0 8px 8px 0", undefined]].map(([side, label, radius, br]) => (
            <button key={side} onClick={() => onChange({ ...value, [i]: side })} style={{
              flex: 1, padding: "14px 16px",
              background: value[i] === side ? "#fff" : "transparent",
              color: value[i] === side ? "#000" : "#666",
              border: "1px solid #333", borderRight: br, borderRadius: radius,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 14,
              transition: "all 0.2s ease", letterSpacing: "0.01em",
            }}>{label}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

function MultiSelect({ options, value = [], onChange }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map((o) => (
        <button key={o} onClick={() => toggle(o)} style={{
          padding: "10px 20px", background: value.includes(o) ? "#fff" : "transparent",
          color: value.includes(o) ? "#000" : "#666", border: "1px solid #333",
          borderRadius: 100, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
          fontSize: 14, transition: "all 0.2s ease", letterSpacing: "0.01em",
        }}>{o}</button>
      ))}
    </div>
  );
}

function Field({ field, value, onChange }) {
  const base = {
    width: "100%", padding: "14px 0", background: "transparent",
    border: "none", borderBottom: "1px solid #333", color: "#fff",
    fontFamily: "'Outfit', sans-serif", fontSize: 16, outline: "none",
    transition: "border-color 0.2s ease", letterSpacing: "0.01em", boxSizing: "border-box",
  };
  const focus = (e) => (e.target.style.borderBottomColor = "#fff");
  const blur = (e) => (e.target.style.borderBottomColor = "#333");

  return (
    <div style={{ marginBottom: 36 }}>
      <label style={{
        display: "block", color: "#999", fontSize: 13,
        fontFamily: "'Outfit', sans-serif", marginBottom: 8,
        letterSpacing: "0.05em", textTransform: "uppercase",
      }}>
        {field.label}
        {!field.required && <span style={{ color: "#444", marginLeft: 8, textTransform: "none", fontSize: 12 }}>optional</span>}
      </label>
      {field.type === "text" && <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} style={base} onFocus={focus} onBlur={blur} />}
      {field.type === "textarea" && <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={4} style={{ ...base, resize: "vertical", minHeight: 100, lineHeight: 1.6 }} onFocus={focus} onBlur={blur} />}
      {field.type === "select" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {field.options.map((o) => (
            <button key={o} onClick={() => onChange(o)} style={{
              padding: "14px 20px", background: value === o ? "#fff" : "transparent",
              color: value === o ? "#000" : "#888", border: "1px solid",
              borderColor: value === o ? "#fff" : "#333", borderRadius: 8,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 14,
              textAlign: "left", transition: "all 0.2s ease", letterSpacing: "0.01em",
            }}>{o}</button>
          ))}
        </div>
      )}
      {field.type === "multiselect" && <MultiSelect options={field.options} value={value || []} onChange={onChange} />}
      {field.type === "pairs" && <PairSelector pairs={field.pairs} value={value || {}} onChange={onChange} />}
    </div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 2, flex: 1, background: i <= current ? "#fff" : "#222",
          borderRadius: 1, transition: "background 0.4s ease",
        }} />
      ))}
    </div>
  );
}

// ── MAIN APP ──
export default function StudioDown() {
  const [view, setView] = useState("home"); // "home" | "intro" | "form" | "done"
  const [phase, setPhase] = useState(0);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [entering, setEntering] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Load cached progress on mount
  useEffect(() => {
    const cached = loadCache();
    if (cached && cached.view === "form") {
      setData(cached.data || {});
      setStep(cached.step || 0);
      setView("form");
    }
  }, []);

  // Save progress on every change
  useEffect(() => {
    if (view === "form") saveCache(data, step, view);
  }, [data, step, view]);

  // Home animation phases
  useEffect(() => {
    if (view !== "home") return;
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [view]);

  // Form step transitions
  const formContentRef = useRef(null);
  useEffect(() => {
    if (view !== "form") return;
    setEntering(false);
    const t = setTimeout(() => {
      if (formContentRef.current) formContentRef.current.scrollTo({ top: 0, behavior: "instant" });
      setEntering(true);
    }, 200);
    return () => clearTimeout(t);
  }, [step, view]);

  const beginDiscovery = () => {
    setTransitioning(true);
    setTimeout(() => { setView("form"); setStep(0); setTransitioning(false); }, 600);
  };

  const currentStep = STEPS[step];

  const canProceed = () => {
    if (!currentStep) return false;
    return currentStep.fields.filter((f) => f.required).every((f) => {
      const v = data[f.key];
      if (Array.isArray(v)) return v.length > 0;
      return v && v !== "";
    });
  };

  const handleNext = async () => {
    if (step === STEPS.length - 1) {
      setSubmitting(true);
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/discoveries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ data, submitted_at: new Date().toISOString() }),
        });
      } catch (err) { console.error("Submit error:", err); }
      clearCache();
      console.log("Discovery submission:", JSON.stringify(data, null, 2));
      setTimeout(() => { setSubmitting(false); setView("done"); }, 1200);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else goHome();
  };

  const goHome = () => {
    setTransitioning(true);
    setPhase(0);
    setTimeout(() => {
      setView("home"); setStep(0); setData({}); clearCache(); setTransitioning(false);
    }, 400);
  };

  return (
    <div style={{
      minHeight: "100vh", height: "100vh", background: "#000", color: "#fff",
      fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; overscroll-behavior: none; }
        html { overflow: hidden; }
        body { overflow: hidden; }
        ::placeholder { color: #555; }
      `}</style>

      <LivingBlob dimmed={view === "form"} />

      {/* ── HOME ── */}
      {view === "home" && (
        <div style={{
          position: "relative", zIndex: 2, minHeight: "100vh",
          display: "flex", flexDirection: "column",
          opacity: transitioning ? 0 : 1, transition: "opacity 0.5s ease",
        }}>
          {/* Top left name */}
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, padding: "28px 36px", zIndex: 10,
          }}>
            <div style={{
              fontSize: 15, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "lowercase",
              opacity: phase >= 1 ? 1 : 0, filter: phase >= 1 ? "blur(0px)" : "blur(8px)",
              transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>studiodown</div>
          </div>

          {/* Centered content */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: "0 32px",
          }}>
            <div style={{ maxWidth: 500 }}>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 300, lineHeight: 1.2,
                marginBottom: 16, letterSpacing: "-0.02em", whiteSpace: "pre-line",
                opacity: phase >= 1 ? 1 : 0, filter: phase >= 1 ? "blur(0px)" : "blur(8px)",
                transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>{"Tell us about\nyour brand."}</h1>
              <p style={{
                fontSize: 15, color: "#888", lineHeight: 1.7, marginBottom: 48,
                letterSpacing: "0.01em", maxWidth: 400,
                opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 1s ease 0.1s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}>A few questions to understand your vision, your audience, and the feeling you're after.</p>
              <button onClick={beginDiscovery} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 36px", background: "#fff", color: "#000",
                border: "1px solid #fff", borderRadius: 100,
                fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
                opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
              }}>
                Begin Discovery
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, padding: "28px 36px",
            display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2,
            opacity: phase >= 2 ? 1 : 0, transition: "opacity 1.5s ease",
          }}>
            <span style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: "0.15em", textTransform: "uppercase" }}>London</span>
            <a href="mailto:hello@studiodown.com" style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>hello@studiodown.com</a>
          </div>
        </div>
      )}

      {/* ── FORM ── */}
      {view === "form" && currentStep && (
        <div style={{
          position: "relative", zIndex: 2, height: "100vh",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 10,
            background: "linear-gradient(to bottom, #000 60%, transparent)",
          }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.12em", color: "#fff", cursor: "pointer" }} onClick={goHome}>studiodown</div>
            <div style={{ fontSize: 12, color: "#555", letterSpacing: "0.1em" }}>{currentStep.stage} / 07</div>
          </div>

          {/* Progress */}
          <div style={{ position: "fixed", top: 68, left: 32, right: 32, zIndex: 10 }}>
            <ProgressBar current={step} total={STEPS.length} />
          </div>

          {/* Content */}
          <div ref={formContentRef} style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start",
            padding: "120px 32px 260px", maxWidth: 560, margin: "0 auto", width: "100%", boxSizing: "border-box",
            overflowY: "auto", overscrollBehavior: "none",
          }}>
            <h1 style={{
              fontSize: 34, fontWeight: 600, lineHeight: 1.2, margin: "0 0 16px 0",
              letterSpacing: "-0.02em", color: "#fff",
              opacity: entering ? 1 : 0, transform: entering ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>{currentStep.title}</h1>
            <p style={{
              fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 48px 0",
              maxWidth: 440, letterSpacing: "0.01em",
              opacity: entering ? 1 : 0, transform: entering ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.12s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.12s",
            }}>{currentStep.subtitle}</p>
            <div style={{
              opacity: entering ? 1 : 0, transform: entering ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.24s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.24s",
            }}>
              {currentStep.fields.map((f) => <Field key={f.key} field={f} value={data[f.key]} onChange={(v) => setData((d) => ({ ...d, [f.key]: v }))} />)}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, padding: "24px 32px 32px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "linear-gradient(to top, #000 60%, transparent)", zIndex: 10,
          }}>
            <button onClick={handleBack} style={{
              padding: "12px 16px", background: "none", border: "1px solid #333", borderRadius: 100,
              color: "#999", fontFamily: "'Outfit', sans-serif", fontSize: 13, cursor: "pointer",
              letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: 8,
              transition: "border-color 0.3s ease, color 0.3s ease",
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#666"; e.currentTarget.style.color = "#fff"; }}
               onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#999"; }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <button onClick={handleNext} disabled={!canProceed() || submitting} style={{
              padding: "14px 40px",
              background: canProceed() && !submitting ? "#fff" : "#222",
              color: canProceed() && !submitting ? "#000" : "#555",
              border: "none", borderRadius: 100, fontFamily: "'Outfit', sans-serif",
              fontSize: 14, fontWeight: 500, letterSpacing: "0.05em", minWidth: 140,
              cursor: canProceed() && !submitting ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}>{submitting ? "Sending..." : step === STEPS.length - 1 ? "Submit" : "Continue"}</button>
          </div>
        </div>
      )}

      {/* ── DONE ── */}
      {view === "done" && (
        <div style={{
          position: "relative", zIndex: 2, height: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "0 32px",
        }}>
          <div style={{ maxWidth: 480 }}>
            <h1 style={{ fontSize: 42, fontWeight: 300, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>Got it.</h1>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, letterSpacing: "0.01em", whiteSpace: "pre-line" }}>
              {"This gives us everything we need to start exploring ideas for your brand.\n\nWe'll be in touch."}
            </p>
          </div>
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, padding: "24px 32px 32px", textAlign: "center",
          }}>
            <a href="mailto:hello@studiodown.com" style={{ color: "#888", fontSize: 13, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.1em", textDecoration: "none" }}>hello@studiodown.com</a>
          </div>
        </div>
      )}
    </div>
  );
}
