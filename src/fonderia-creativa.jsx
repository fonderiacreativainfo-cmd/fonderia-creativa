import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    id: "dtf",
    code: "01",
    name: "DTF",
    full: "Direct To Film",
    desc: "Trasferimento diretto su film per stampe ad alta definizione su qualsiasi tessuto. Risultati precisi, colori saturi, nessun limite di substrate.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="8" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
        <path d="M14 20h12M14 24h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "dtg",
    code: "02",
    name: "DTG",
    full: "Direct To Garment",
    desc: "Stampa digitale diretta sul capo. Ideale per run brevi, alta risoluzione, texture naturale del colore integrata nel tessuto.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 10 L16 6 L20 10 L24 6 L32 10 L30 34 L10 34 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M16 6 C16 8 14 10 12 10" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M24 6 C24 8 26 10 28 10" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M15 18 h10 M15 22 h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "ricamo",
    code: "03",
    name: "Ricamo",
    full: "Embroidery Premium",
    desc: "Ricamo professionale ad alta densità. Tridimensionalità, durabilità eccezionale, effetto premium su ogni capo e accessorio.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 8 C20 8 26 14 26 20 C26 26 20 32 20 32" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 20 C8 20 14 14 20 14 C26 14 32 20 32 20" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "serigrafia",
    code: "04",
    name: "Serigrafia",
    full: "Screen Printing",
    desc: "Tecnica classica con risultati imbattibili per grandi tirature. Colori pantone, opacità, effetti speciali e inchiostri a rilievo.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="6" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 18h28" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M14 18v12M26 18v12" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 12h20M10 15h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "tampografia",
    code: "05",
    name: "Tampografia",
    full: "Pad Printing",
    desc: "Stampa indiretta per superfici irregolari. Perfetta per gadget, oggetti promozionali e materiali corporate di alta precisione.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <ellipse cx="20" cy="12" rx="10" ry="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 12 C10 18 15 22 20 22 C25 22 30 18 30 12" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 22 L20 30" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="14" y="30" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: "merchandising",
    code: "06",
    name: "Merchandising",
    full: "Full Production",
    desc: "Sviluppo completo di linee merchandising. Dalla consulenza al prodotto finito: abbigliamento, accessori, packaging coordinato.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 12 L20 6 L32 12 L32 28 L20 34 L8 28 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M20 6 L20 34M8 12 L32 12M8 28 L32 28" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

const STEPS = [
  { n: "01", title: "Invia il Progetto", desc: "Carica i tuoi file e specifica quantità, tecnica e substrate. Nessuna domanda superflua.", detail: "File vettoriali, raster ad alta risoluzione, brief creativo." },
  { n: "02", title: "Analisi Tecnica", desc: "Il nostro team analizza ogni file e ti invia un preventivo dettagliato entro 24 ore lavorative.", detail: "Verifica colori, fattibilità tecnica, ottimizzazione produzione." },
  { n: "03", title: "Produzione", desc: "Avviamo la produzione con i macchinari più avanzati del settore. Controllo qualità su ogni pezzo.", detail: "Macchine di ultima generazione, materie prime certificate." },
  { n: "04", title: "Spedizione", desc: "Imballiamo con cura e spediamo con tracking dedicato. Consegne in tutta Italia e in Europa.", detail: "Packaging professionale, tracking real-time, assicurazione inclusa." },
];

const WORKS = [
  { id: 1, label: "Brand Identity", cat: "RICAMO — CAPSULE", title: "Agenzia Creativa Milano" },
  { id: 2, label: "Event Merch", cat: "DTF — 500 UNITS", title: "Festival Nazionale 2024" },
  { id: 3, label: "Corporate Kit", cat: "SERIGRAFIA — PACKAGING", title: "Tech Startup Torino" },
  { id: 4, label: "Retail Line", cat: "DTG — LINEA AW", title: "Brand Fashion Roma" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav aria-label="Navigazione principale" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px",
      height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 4, color: "#fff", lineHeight: 1 }}>
          FONDERIA CREATIVA
        </span>
      </div>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {["Servizi", "Portfolio", "Processo", "Contatti"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2,
            color: "rgba(255,255,255,0.6)", textTransform: "uppercase", textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#E5FF00"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
          >{l}</a>
        ))}
        <a href="#contatti" style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2,
          color: "#080808", background: "#E5FF00", padding: "10px 20px",
          textDecoration: "none", textTransform: "uppercase",
        }}>Preventivo →</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section aria-label="Hero" style={{ height: "100vh", minHeight: 700, position: "relative", overflow: "hidden", background: "#080808", display: "flex", alignItems: "center" }}>
      {/* Animated grid background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Yellow accent line */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: "#E5FF00",
        transform: loaded ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}/>

      {/* Abstract industrial shapes */}
      <div style={{ position: "absolute", right: "8%", top: "15%", width: 360, height: 360, opacity: 0.06 }}>
        <svg viewBox="0 0 360 360" fill="none">
          <circle cx="180" cy="180" r="160" stroke="white" strokeWidth="1"/>
          <circle cx="180" cy="180" r="120" stroke="white" strokeWidth="0.5"/>
          <circle cx="180" cy="180" r="80" stroke="white" strokeWidth="0.5"/>
          <line x1="20" y1="180" x2="340" y2="180" stroke="white" strokeWidth="0.5"/>
          <line x1="180" y1="20" x2="180" y2="340" stroke="white" strokeWidth="0.5"/>
          <line x1="67" y1="67" x2="293" y2="293" stroke="white" strokeWidth="0.5"/>
          <line x1="293" y1="67" x2="67" y2="293" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Yellow target accent */}
      <div style={{ position: "absolute", right: "12%", top: "20%", width: 120, height: 120, opacity: 0.7,
        transform: loaded ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-45deg)",
        transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}>
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="55" stroke="#E5FF00" strokeWidth="1"/>
          <circle cx="60" cy="60" r="35" stroke="#E5FF00" strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="8" fill="#E5FF00"/>
          <line x1="0" y1="60" x2="45" y2="60" stroke="#E5FF00" strokeWidth="0.5"/>
          <line x1="75" y1="60" x2="120" y2="60" stroke="#E5FF00" strokeWidth="0.5"/>
          <line x1="60" y1="0" x2="60" y2="45" stroke="#E5FF00" strokeWidth="0.5"/>
          <line x1="60" y1="75" x2="60" y2="120" stroke="#E5FF00" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Counter indicator */}
      <div style={{ position: "absolute", right: 40, bottom: 40, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.3)" }}>
        <div style={{ color: "#E5FF00", fontSize: 20, fontWeight: 400, lineHeight: 1 }}>01</div>
        <div style={{ marginTop: 4 }}>— 04</div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 40, left: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</div>
        <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}/>
      </div>

      {/* Main content */}
      <div style={{ paddingLeft: "clamp(40px, 8%, 120px)", paddingRight: "clamp(40px, 8%, 120px)", maxWidth: 1400, width: "100%" }}>

        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 4,
          color: "#E5FF00", textTransform: "uppercase", marginBottom: 40,
          display: "flex", alignItems: "center", gap: 16,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          <div style={{ width: 32, height: 1, background: "#E5FF00" }}/>
          Studio di Stampa e Merchandising
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 7vw, 120px)",
          lineHeight: 1,
          letterSpacing: 2,
          color: "#fff",
          margin: 0,
          marginBottom: 40,
        }}>
          {["STAMPIAMO", "LE TUE IDEE", "SU QUALSIASI", "CAPO."].map((line, i) => (
            <div key={i} style={{
              display: "block", overflow: "hidden",
              opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`,
            }}>
              {i === 2 ? <span style={{ color: "#E5FF00" }}>{line.split(" ")[0]} </span> : null}
              {i === 2 ? line.split(" ").slice(1).join(" ") : line}
            </div>
          ))}
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.6,
          color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 0 48px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
          Produzione moderna per aziende, eventi e agenzie.<br/>DTF · DTG · Ricamo · Serigrafia.
        </p>

        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s",
        }}>
          <CTAButton primary href="#contatti">Richiedi Preventivo →</CTAButton>
          <CTAButton href="#portfolio">Vedi il Portfolio</CTAButton>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 48, marginTop: 80,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 1s",
        }}>
          {[["500+", "Clienti Attivi"], ["10M+", "Capi Prodotti"], ["24h", "Risposta Garantita"], ["EU", "Spedizioni Europa"]].map(([v, l]) => (
            <div key={v}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 2, color: "#E5FF00", lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAButton({ children, primary, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none",
      padding: "16px 32px",
      background: primary ? (hov ? "#fff" : "#E5FF00") : "transparent",
      color: primary ? "#080808" : (hov ? "#E5FF00" : "rgba(255,255,255,0.7)"),
      border: primary ? "none" : "1px solid rgba(255,255,255,0.2)",
      borderColor: hov && !primary ? "#E5FF00" : undefined,
      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      cursor: "pointer",
    }}
    onMouseEnter={() => setHov(true)}
    onMouseLeave={() => setHov(false)}
    >{children}</a>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="servizi" aria-labelledby="servizi-title" ref={ref} style={{ background: "#0c0c0c", padding: "120px clamp(40px,8%,120px)" }}>
      <SectionLabel label="TECNOLOGIE" number="02" inView={inView} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 24 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,96px)", lineHeight: 0.9, letterSpacing: 2, color: "#fff", margin: 0,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          LE NOSTRE<br/><span style={{ color: "#E5FF00" }}>TECNOLOGIE</span>
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 360, lineHeight: 1.7, margin: 0,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          Ogni progetto merita la tecnica giusta. Offriamo l'intero spettro della produzione moderna su tessuto e materiali.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {SERVICES.map((s, i) => (
          <div key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === s.id ? "#111" : "#0c0c0c",
              padding: "48px 40px",
              position: "relative", overflow: "hidden", cursor: "default",
              transition: "background 0.3s",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${0.05 * i}s`,
              transitionDuration: "0.8s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}>
            {/* Yellow indicator line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "#E5FF00",
              transform: hovered === s.id ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}/>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div style={{ color: hovered === s.id ? "#E5FF00" : "rgba(255,255,255,0.5)", transition: "color 0.3s" }}>
                {s.icon}
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.2)" }}>{s.code}</span>
            </div>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#E5FF00", textTransform: "uppercase", marginBottom: 8 }}>{s.full}</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 2, color: "#fff", margin: "0 0 16px", lineHeight: 1 }}>{s.name}</h3>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: 0 }}>{s.desc}</p>

            <div style={{
              marginTop: 32, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#E5FF00",
              display: "flex", alignItems: "center", gap: 8,
              opacity: hovered === s.id ? 1 : 0,
              transition: "opacity 0.3s",
            }}>
              <span>Scopri →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionLabel({ label, number, inView }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 60,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#E5FF00" }}>{number}</div>
      <div style={{ width: 40, height: 1, background: "#E5FF00" }}/>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function ProcessSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive(a => (a + 1) % STEPS.length), 3000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="processo" aria-labelledby="processo-title" ref={ref} style={{ background: "#080808", padding: "120px clamp(40px,8%,120px)" }}>
      <SectionLabel label="WORKFLOW" number="03" inView={inView} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,5vw,80px)", lineHeight: 0.9, letterSpacing: 2, color: "#fff", margin: "0 0 16px",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            COME<br/><span style={{ color: "#E5FF00" }}>FUNZIONA</span>
          </h2>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: "0 0 60px",
            opacity: inView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            Un processo lineare, trasparente e veloce. Dalla ricezione del file alla consegna, ogni fase è monitorata.
          </p>

          {STEPS.map((s, i) => (
            <div key={i}
              onClick={() => setActive(i)}
              style={{
                display: "flex", gap: 24, padding: "28px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                opacity: inView ? 1 : 0,
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
              }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, lineHeight: 1,
                color: active === i ? "#E5FF00" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s", minWidth: 40,
              }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: 600, color: active === i ? "#fff" : "rgba(255,255,255,0.5)", marginBottom: 4, transition: "color 0.3s" }}>{s.title}</div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
                  maxHeight: active === i ? "80px" : "0", overflow: "hidden",
                  transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual panel */}
        <div style={{
          position: "relative", aspectRatio: "4/5",
          background: "#111", border: "1px solid rgba(255,255,255,0.06)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 40,
        }}>
          {/* Abstract step visualization */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 300 300" style={{ width: "70%", opacity: 0.08 }}>
              <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="1" fill="none"/>
              {[0, 1, 2, 3].map(i => {
                const angle = (i * 90 - 90) * Math.PI / 180;
                const x = 150 + 120 * Math.cos(angle);
                const y = 150 + 120 * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="8" fill="white"/>;
              })}
              <circle cx="150" cy="150" r="20" stroke="white" strokeWidth="1" fill="none"/>
            </svg>
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 120, letterSpacing: -4, color: "#E5FF00", opacity: 0.15, lineHeight: 1,
              transition: "opacity 0.4s",
            }}>{STEPS[active].n}</div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#E5FF00", marginBottom: 12, textTransform: "uppercase" }}>Step {STEPS[active].n}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 2, color: "#fff", marginBottom: 12 }}>{STEPS[active].title}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{STEPS[active].detail}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(null);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" ref={ref} style={{ background: "#0c0c0c", padding: "120px clamp(40px,8%,120px)" }}>
      <SectionLabel label="PORTFOLIO" number="04" inView={inView} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,6vw,96px)", lineHeight: 0.9, letterSpacing: 2, color: "#fff", margin: 0,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          LAVORI<br/><span style={{ color: "#E5FF00" }}>SELEZIONATI</span>
        </h2>
        <a href="#contatti" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textDecoration: "none", textTransform: "uppercase" }}>
          Tutti i progetti →
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {WORKS.map((w, i) => {
          const tall = i === 0 || i === 3;
          return (
            <div key={w.id}
              onMouseEnter={() => setHov(w.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                position: "relative",
                aspectRatio: tall ? "3/4" : "4/3",
                background: "#111",
                overflow: "hidden", cursor: "pointer",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
              }}>

              {/* Abstract print pattern */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.04 }}>
                <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
                  {Array.from({ length: 8 }, (_, r) =>
                    Array.from({ length: 8 }, (_, c) => (
                      <rect key={`${r}-${c}`} x={c * 50 + 4} y={r * 50 + 4} width={42} height={42} fill="white" rx="2"/>
                    ))
                  )}
                </svg>
              </div>

              {/* Large number */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 180, color: "rgba(255,255,255,0.03)", letterSpacing: -8, lineHeight: 1 }}>{String(w.id).padStart(2, "0")}</span>
              </div>

              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                opacity: hov === w.id ? 1 : 0.6,
                transition: "opacity 0.4s",
              }}/>

              {/* Yellow top line on hover */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "#E5FF00",
                transform: hov === w.id ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}/>

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "#E5FF00", textTransform: "uppercase", marginBottom: 8 }}>{w.cat}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, color: "#fff", lineHeight: 1 }}>{w.title}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 12, letterSpacing: 2,
                  opacity: hov === w.id ? 1 : 0,
                  transform: hov === w.id ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.3s",
                }}>Vedi progetto →</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ azienda: "", referente: "", email: "", telefono: "", progetto: "", quantita: "", note: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef(null);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Load EmailJS SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init("cf3wIVB4svZ1wOTXO");
    document.head.appendChild(script);
  }, []);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.azienda || !form.referente || !form.email) return;
    setSending(true);
    setError(null);
    try {
      await window.emailjs.send("service_a422v0h", "template_lhd5mwa", {
        company: form.azienda,
        name: form.referente,
        email: form.email,
        phone: form.telefono || "—",
        project_type: form.progetto || "—",
        quantity: form.quantita || "—",
        notes: form.note || "—",
        file_name: fileName || "Nessun file allegato",
      });
      setSent(true);
    } catch (err) {
      setError("Errore nell'invio. Riprova o scrivici direttamente via email.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (k) => ({
    width: "100%", background: "transparent",
    border: "none", borderBottom: `1px solid ${focused === k ? "#E5FF00" : "rgba(255,255,255,0.12)"}`,
    padding: "16px 0", color: "#fff",
    fontFamily: "'Barlow', sans-serif", fontSize: 15,
    outline: "none", transition: "border-color 0.3s",
    boxSizing: "border-box",
  });

  const labelStyle = {
    fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginBottom: 4,
  };

  return (
    <section id="contatti" aria-labelledby="contatti-title" ref={ref} style={{ background: "#080808", padding: "120px clamp(40px,8%,120px)" }}>
      <SectionLabel label="CONTATTI" number="05" inView={inView} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
        {/* Left */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,5vw,80px)", lineHeight: 0.9, letterSpacing: 2, color: "#fff", margin: "0 0 32px" }}>
            INIZIA<br/>IL TUO<br/><span style={{ color: "#E5FF00" }}>PROGETTO</span>
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>
            Inviaci il brief del tuo progetto. Risponderemo entro 24 ore con un preventivo personalizzato e dettagliato.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              ["Produzione", "5 tecnologie di stampa disponibili"],
              ["Quantità", "Da 1 pezzo fino a grandi tirature"],
              ["Consegna", "Spedizioni in tutta Europa"],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, background: "#E5FF00", marginTop: 6, flexShrink: 0 }}/>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#fff", textTransform: "uppercase", marginBottom: 2 }}>{t}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>Email Diretto</div>
              <a href="mailto:fonderiacreativa.info@gmail.com" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#E5FF00", textDecoration: "none" }}>fonderiacreativa.info@gmail.com</a>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 12 }}>WhatsApp</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["+39 351 661 7010", "+39 340 849 7952"].map(num => (
                  <a key={num} href={`https://wa.me/${num.replace(/\s/g,"").replace("+","")}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#E5FF00" }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#E5FF00" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>
          {sent ? (
            <div style={{ padding: "60px 40px", border: "1px solid rgba(229,255,0,0.2)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, letterSpacing: 4, color: "#E5FF00", lineHeight: 1, marginBottom: 16 }}>RICEVUTO.</div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Il tuo progetto è stato ricevuto. Ti contatteremo entro 24 ore lavorative con un preventivo dettagliato.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                {[["azienda", "Nome Azienda *"], ["referente", "Referente *"]].map(([k, l]) => (
                  <div key={k}>
                    <label style={labelStyle}>{l}</label>
                    <input value={form[k]} onChange={set(k)} onFocus={() => setFocused(k)} onBlur={() => setFocused(null)} required style={inputStyle(k)}/>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                {[["email", "Email *", "email"], ["telefono", "Telefono", "tel"]].map(([k, l, t]) => (
                  <div key={k}>
                    <label style={labelStyle}>{l}</label>
                    <input type={t || "text"} value={form[k]} onChange={set(k)} onFocus={() => setFocused(k)} onBlur={() => setFocused(null)} style={inputStyle(k)}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>Tipo di Progetto</label>
                <select value={form.progetto} onChange={set("progetto")} onFocus={() => setFocused("progetto")} onBlur={() => setFocused(null)} style={{ ...inputStyle("progetto"), appearance: "none" }}>
                  <option value="" style={{ background: "#111" }}>Seleziona tecnica...</option>
                  {["DTF", "DTG", "Ricamo", "Serigrafia", "Tampografia", "Merchandising Completo", "Packaging", "Gadget"].map(o => (
                    <option key={o} value={o} style={{ background: "#111" }}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>Quantità Stimata</label>
                <select value={form.quantita} onChange={set("quantita")} onFocus={() => setFocused("quantita")} onBlur={() => setFocused(null)} style={{ ...inputStyle("quantita"), appearance: "none" }}>
                  <option value="" style={{ background: "#111" }}>Seleziona range...</option>
                  {["1–10 pezzi", "11–50 pezzi", "51–200 pezzi", "201–500 pezzi", "500–1000 pezzi", "1000+ pezzi"].map(o => (
                    <option key={o} value={o} style={{ background: "#111" }}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle}>Note Progetto</label>
                <textarea value={form.note} onChange={set("note")} onFocus={() => setFocused("note")} onBlur={() => setFocused(null)} rows={4} placeholder="Descrivi brevemente il progetto, i materiali, le scadenze..." style={{ ...inputStyle("note"), resize: "none", paddingTop: 16 }}/>
              </div>

              {/* File upload */}
              <input ref={fileRef} type="file" accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg" onChange={handleFileChange} style={{ display: "none" }}/>
              <div
                onClick={() => fileRef.current.click()}
                style={{ marginBottom: 40, border: `1px dashed ${focused === "file" ? "#E5FF00" : fileName ? "rgba(229,255,0,0.4)" : "rgba(255,255,255,0.12)"}`, padding: 24, textAlign: "center", cursor: "pointer", transition: "border-color 0.3s" }}
                onMouseEnter={() => setFocused("file")} onMouseLeave={() => setFocused(null)}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>Carica File</div>
                {fileName
                  ? <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#E5FF00" }}>✓ {fileName}</div>
                  : <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.2)" }}>AI, EPS, PDF, PNG ad alta risoluzione</div>
                }
                <div style={{ marginTop: 12, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "#E5FF00" }}>
                  {fileName ? "Cambia file →" : "Drag & Drop o Clicca →"}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div style={{ marginBottom: 20, padding: "14px 20px", border: "1px solid rgba(255,80,80,0.3)", fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,100,100,0.8)" }}>
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={sending}
                style={{
                  width: "100%", padding: "20px", background: sending ? "rgba(229,255,0,0.5)" : "#E5FF00", border: "none",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 4, color: "#080808",
                  cursor: sending ? "not-allowed" : "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={e => { if (!sending) e.target.style.background = "#fff"; }}
                onMouseLeave={e => { if (!sending) e.target.style.background = "#E5FF00"; }}
              >
                {sending ? "INVIO IN CORSO..." : "INVIA PROGETTO →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ["DTF", "DTG", "RICAMO", "SERIGRAFIA", "TAMPOGRAFIA", "MERCHANDISING", "PACKAGING", "GADGET", "EVENTI", "BRAND"];
  const repeated = [...items, ...items, ...items];
  return (
    <div style={{ background: "#E5FF00", overflow: "hidden", padding: "16px 0", display: "flex" }}>
      <div style={{ display: "flex", gap: 48, animation: "marquee 20s linear infinite", whiteSpace: "nowrap" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 4, color: "#080808", display: "flex", alignItems: "center", gap: 48 }}>
            {item} <span style={{ fontSize: 8, opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

function ClientsSection() {
  const [ref, inView] = useInView(0.1);

  // Loghi con sfondo rimosso — nessun filtro necessario
  const TRPDNM_SRC  = "data:image/avif;base64,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";
  const NXTLVL_SRC  = "data:image/png;base64,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";
  const NEXTGYM_SRC = "data:image/png;base64,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";
  const GAIGA_SRC   = "data:image/png;base64,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";
  const TERSICO_SRC = "data:image/png;base64,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";
  const JUNIOR_SRC  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAgYklEQVR42u2beVyU1f74P+fZZmF2BhhgkFVREFQwlzQVtVIzS2vIfRdsod3StmHU6ua1W95ckkxxV0hNSzSX0GwTNQVkREFlX4ZhhtnX5znfP4Iu12+3Rft1v/1e83695sXMw3mec87n+ZzP+ZzP+RyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBPiLgXEBiTGmMMbot5XHqLi4mMIYE3daN/rzO4sRQgjfzn0AQCCE2G7XyFOnTqG2tjZcUVGBAQByc3OhsLAQhYSEoFGjRuFbyhMIIe4vohWY7Gp0QUEB+RteFsIYExhjqutCZWXl+ObmxmXvvfee7LfUOXHiRGFNTc3C0tLSe7q34f+sZhUUFJAajQYjhLiZM2cG7dixw3GLAH+uHf+mFdu2bQsdP378SqVSucjtdoHfz3p9Pl+Rw+EoslgspVVVVQaO45wURQVFRkaGhYeHpQgEQffxeMwEoTBI6Ha72CtXKoempaWd+69oWEHBT/aD7PxOdP7tuk4h9C853Lx5c6rT6bR1dHQc6HzT1K/VcfHixf7t7W1rHA67z263Oaurq7O3bNmiamhoeN5isZS63W78n7A77C0Gg2H9+fPfj3Y6nec9Hk/bDz+U3IUxRrdjw9CfYXvKyy8OU6tjtDKZ7N72duMXJEklyGSyeIfDbvb7fRe8Xu8Vn49tdjgcLj6fT/H5TChN83pTFDVQJBKF2+32DrvduvaTT/a/n5OT09792bt27QobMGBAkkAgiKdpOphlWbvb7a5tbGyszMjIqO4qV1p6YVJqatrBsrKysf369TuJMSa7a+7/M2F1qfHly5fHKZXKZJfLVWE2t7VbrU63SCSiRSKRTCwWx/P5/CE8Hm9MUFBQtNPpNDQ3N7+ckJCQDwDQcLNhAGLQZIFAMJyiqN4IISXDMDQAgNfrcXAcvuF2u781Go2HkpOTTwKAp9uw5U6dOkWOGjWK/bUXhjFmEEI+q9Xyvd/va1colBNuR1C3q1EEAEBRUZHa5XJ5XC4XttlsPzsMrFaL1WgyFlVWVs4MTw8XAgAs1C4evfjtZ1+BcFB2f65arRZcW1PE+4V6/+UuYEBarZbSaDRk55Aiuww3gRB0/ia6rl24cCEVY4xLS88P6Sr/Zxh4hDFG+fn5zCOPTDnC4/F67d9/YEhwsIBVqeIinE6ngqIov0AgMIfzw28o4hWW7sN22lOz0yVRwd/LI5VkR4vJ5DI5Ht/29saCrjeteXLqpLCePe7uaGk7sP3tzecqKiqolJQUL8YYtFotodPpuJ/tA8YACBGzlmZNsdkspZ+u23uts60kQsjf1tb2rkDAmykSScLxj/YD346wqN9TWKvVIoIguEOHDgXz+YJ7XC7X99OmTavv/HdT97L3z3946KK/PZ1OU/RdDpPtG4RQHkLo/NTn5jwABNoSpBCHEzS5d/ZrWX0QQjqEEJAkU+P3sWsZoVCJEDqr1Wq5R5+dryDcbJBOp6vvspNTnpgeLQ9XjLO3W1p6S+M+0yHEzdM9uSksWjX32lmbFgBWaLVaEgA4AACGocd5PL4znb8pAPDfjrB+14yg0+k4juPIBx98sPHmzZuTJBLJsObW5vcAALSrtcoZz82bDABQjDElE0tkiCDfEYfJZweFyTbOfi37XYwx2v2P/C9qKqpG29osF3hCPkjDlblzdY/vTUtLk+7557ayExsP9rW1dhzWarWELjeXBZtjpCxa9uUc3eP5CCFCq9US4GcfEQdLP5SGyh8+BUDMeG7OEL5EONfldoNQFjQ9KSQkKDc3l0UIcenp6TRJUrEej6fsTk3Q758+EWIxxmRiYmJRc3OzVhWqelZ/TT9R96LOxBMLpszWPr42AyH/3jXbjlSfu9arra71S5rPgFwd8vz8N3MO3zv53tBjWz+vLDv93eiOFtNuQACycGXmgEeHf/VQlialurraWrhu5wEAIAAhzA8O0kjDFQmKyJA505ctXKbT6bj9eXvft7dbzwGg+NM6nZ+SCu4ViIXgdrqNFEmdT7xvuLirvU8//bSEZmgBy7LNf7qwOgXGYYypiIiI5U6n/YfYqNiPCwoKeJTH/5RQJFi8+J3nP73vvvsUXxYebjyZd+gBS0v7RxzLgiRUPj5mcPJXkx/PvKvkaIk1/411083Nxtc9TjcWK6WpYQlRp6YumT2tsxoOMEYel+eQucm43+t0O8Uh0ucnLdYkTpr/SD9ayPTHBCTPfHXRi5SQv9jn9XEkEJzH7TuTmpDamgu5CACgqamJY/0sBuDQf0VYAIA7PWy4fr3qeT6fH3rX4Lvm5r2TZ+G8XIEiKuShqNG9T03OzuxXW1vrztduyOpobH/J43ByQcHixND4yJOPvTBnFgDAjhV5K9vrDFMcZpshSC5SKCLDds1YuvAdvV5PAQB0VBqOeWyuGq/ba6L5jDw0NrJUldSjBNEkTfIZRWhcxN8ZHhPhdXswxaNDKYZQ63Q6gNwfG7ps2TILx7EWmuaF/7eEBQghluM4lJqadtrhcNRJxJI5AAB+t3ufpa0DxAppSkiCunjqC7MfBQDY/lbe3411hsmuDrtRIBGJg3uEbZv1evbfAAAV/GPrpy2V10dYjebvaCEfgqNCX2JipWmAEPYIPBwt5C0KkonVXpfHzwh5PADwsz7Wg1nW3V5vuEqSBAhEQtLSZtq//a2PXtdqtaDT6bgun4zj2Ks0TQ38rwmrExIhBC6Xa7+Az++v0WgEm1d8uK+9rlnjtjosAolQLleHFc55PfsNAIDCf2w71KxvGGlvt/xA8xmQRyhfnr/8yQMjJ45UHtp86OqlT74da2kxbWB4DDACpgcAAPQfZe+oN81y2xy1DJ+HEAA4zQ49YOAYIZ+PASNHu63aYbA0Xfv2yqtZG7PoW10jj8fzBZ/PHzZy5EiKIIhfmgmRVqslNAUaUqPRkH/oQrq4uJjKyMjwV1dXT4mPj9936tSpnhmjRl0HhLDm8enp8pjQXUK5uBfnZ8FiMO86V3A6W6/X2wcNGiRJeiB9vVgpm0HSFDjMtiut11tmH8rbcx4AYOayha9hDPadf9v0ftbGjXRedrZv9qvZBcroME17Q9sJBJhhRPwBXrvnGi1kers67MfsbfYdn368d/+tDnRmZibKeT4n+Z4h95Revnw5Y/mV5WeGi+ZRprNnf/Lg9cl6XJhZ+Kse/R0Jq2vZ8/333ycNHjy44ppef29icvKJnHHjeB8cPeoZPfXBsJi+0fmiYOk4RCCwGS0lrVWNMw/n768CAJjxatZSsVL8Jl8kJFwWu83S0vHEntVbdgAADBo0SFJSUmIFAKTRaAgb2BQCkSTCYXfw1Mk9XnBZnWXiUHl245WaFYoIZSot4NexXl9bR0PHyYP5e+s7+4a7tbUYANwIofH/qT9zXpyjcnOcRKpUxrXXtwr3bdh1EDBwgH58DnknwsrNzQWdTodSUlIgNTX1RbvbeUYhV5S1qKhV8SmJrqIt+/QXvyzZmZiexKcYeniQTBzJE/E1Mb3jSq+UlN8oP3Ph6/iUxFKSJu8XyaVSJog3pU9a36DSMxe+bGxsdGs0GlKv13N6vR5LBVJfRGpMRkiM6iW7yVrq8/nNITGqx/hBwhBLQ/tnfJlwKkEQi5wW+9arl/RtmgINqS/U4/naJ6cOemDYhGs3rqspEW+8KFrG7zO8f2r/EWlj+4++a1L/UYNm9B9118IBowc9gSlqtEguWYUQzHNY7Dv158qvQi6g06dP37awkFarJUaNGkWeAiBOb93KHT161LlSt/JlRbDik4yMjLJhD2c8JY1QaOOS48r7RPaq3r1h2/HYvvEtFJ8ayQsSBAskwlmJA5NM5Wd+KKn49tJVR13HprBeEckUj4kSSoNGJg/tNyiIYY4dPXTUnrUxi05/MJ20XbWR4gjZeprHNNvarcdFCslyRsBIAYEaAbbkL9/4kFqt2vXZtgNVAACaJA15+vRprv+YwS+RFDmlqqb6yMmS01/x+Xw5YCzGGCMCkJH1s+WY5U56Onz/5JAvhGaYAebG1jH71u8uBoB/W2Ldse+h0WiYkL4RA+Y9Nuf7r85/+2XZtcsNfIlwskAcJHZ22AD72GsscCTHYTMiyViSJoUUSTIEQZAuu/MiArASiKh32Z0WgUyULVJIKJKmwG7sqDM2tGXuW7Pj7K115qzJ4VmandN9HERwLHsFEFfae1BsvS5T59UUdBrmCiBBD6wgQT6C5NMrt2jXDfulfjz2wpwsSbBseUe7dXThu1v0OTk5vA8++MDbfSj/7oV0OgDV9/XsQYgkRvj8/mSSIsIZihHbXc5GHsU0UwTRgghU5bS46mgGOYRiKem02hzAMED6OVe7qZ1TBcv4do+PIBkqjGLoEIIgIjBAMAZOQlBkLCAURTF0Iufx8ViW/ZTluCuIhQo/i8txja2ue6T1tzBv+ZMlTrvj2d6C6BKTyUQqFIouY040Nzdjh5x9VR4WrG29Xn934brd392pgUcAgEeOHMmPG9O3mKYpFvvxOZUkuDYyOKJ58cxFe//oUNCsJ2cFE2JeDOIxQ32crzcgiKcoOpREJI/D2I4QtAJm6zgWNQJm2ymKchBAchziMAkksCwLPo8bsxi5+SLBsxiz5s2vr3tEq9VSubm5bG5uLsrNzcWZmZkEv5f8GaEoaBjLsT1YjvUAxmc9DvdBq9mlt11t6jh9+rT/d2lW14p/4Yqnz/td7qz8t/J+6Gg3b/d43fZLZWVatVo9tKSi5GzljVbX/EcmP3nxwsWjfZL7jBAHiZvi4uIKKirKX3O5PLaOjo6yuLi4KXl5f38jMXEQ7hHb4+5gWTDRv3//I1lZWUReXp7vf9VtxjKLtVVx4tzX5K6v9gHF58VJJOI+LMdGIYIMxxwnIglCSCCCx2IWEPeT18wiBJgnEPhddmdlvm59DsYYuodobon4Is0zM3oJRKIFcpViidVkOd9wuT7zWMGhmtzcXPSbQzTZ2dmUVqtl69m2CwyPGa7RaErbLMbjYqFoosViwX37Jr8fBEFD0+Pi7CRCqT179txps9s6FDLJhoaGhnqj0XieolBI7969O0gSJfTpM4RQq9WzaQKVCQS8CQ0NdZnl5RVvvvjSi8/bLLarEomweseOPUWnAOBYybH41NTUz9VqtXbdy6uHiSnpe6Iw0Re3t/BA+ODBg2EqlSq8qKiorGvjYtrzWUqemBpE0fR9BMYJTqtd6zKYNh0v/KwJ/biR8OuLS61WSwAAoU9OxoWZmey0JfMfFgTxR27OXf9cyaWSvj1UUfkqVfjA+vr6z5qamhYNGjTIcOLECQ1FeU47HBDJMIwsLS3t9erq6o+rq/WXhg4dGQYA9zocjlaE0NmUlJRvAADq6uoOOp22o0KhOLWpqemAWh35nFodNR4AoKqqKlkqk+4IDQkdcOHC2XFut6cXzefXlFeWX44Oi+aPHTtWv337dkmfPn1CDAZD29nWs165Xy41J5jbB7gG9EqMTxxbUV5xsLGxsWXChHGb2traSvh8vjpB1Wv1vHcWDwxTRzzn83p7YIxasI8tchiNO/as29P0m4N/Wq2W0CcnI11mJtsVRJvz+uPpTBAzmvVxaQAAFRcrqmMnxtInTxbFY8yyfr+fhxDijh075rt500CPGDGip9FovGKz2RbHxsZcJElyEkVRApb1OWQyidrv52wA8A0AgMlkLKdpnokg0HChUMhduVI5s3O/kK2tre0tFAgTLl++/HxhYeHm6dMfE/B4ggVCQvhUQkL8dy0tLc/l5OR8MmLEiO0tLS1TMgdN6S8USrSxsbFjTpz4zCISBmX36BFy4NFHH/VMnlxT2rt3UkpxcfG6ARx0yBSynhi4Hk6Lc+zOVZsauu9cZWZmct1nQ+KXAn2FmZnszGWL+y548+lVC1bmfEsz1AaKIMN9Ht9mrVZLzJs3z+1yua6RpFBIUcz58HDV0tPfnL5fJBLG19bWtnMcN0ymkD0UGxtbabPZ5xEEIWk3t/f0+dmoqqrrG0mSWHDx4oWnDh8+vKihoemYWBwU6nK5vlEqFZF9+sQFAwCLEMIMQ6VbrZatHo/nfL9+/UgejxfMcfjEtGnT6i/rK1YSBPHEihUr+tXV3fxw4sSJLdXVNRKCQFRNTc2wsWMfbMQY68Xi0DAAAJ+P/YJl/RlhYWFhaOBAH+2jv3C7Pc6dqzY1aLGWGKnVUgCAMn9UEvxrsyFKz0qnEoMHDhKJBfMwx0kRgc64nN7j21duuNJV6Ouvv45XKpWPGk1GzGf4GwcOHGirv1k/Apw+lzop9jxCiEW31vYzuI3WPjxC3IQUyFJeXv6MxWJpF8vFNhqR9++9XPjs3dK7ZQMHpn9ls9n/HhMT8zEAQG3tzY0AxCfnz58vlUqlo5OSkkoRQgcqK/XrMjLGfHD8+PGlwcFyWUSEOkGlUj3a2Fi/gePgUFFR0elevXqN6Nmr59OXrl2arw5WP9vU0KQtOH/4NOfyLdv2dl6xRqMhCwt/fp1I/cyGBNwz/h4ZrSKeIBnyUbfDV8g6vVVuW4ex29SIrEeONKhUoZF+8H80cOBAC8YY9Z08pDU9PW0e3sM9NVf7hBwQYMyxNCCCQIAogiS8HMfZMQI7RZEOn8fb8OiK7CsCHi2e8UpWfUpKyppubTnY+VLkTqdrb6uxlSgoKGAq6uokLIcjbtRW+WNiYjIkMsnMiIiIPXV1dZvU6qihxcXFVTKFTFjyfcnbEyeqvv3m7Nn7LRaLDRHkw+l3pd+NWVxFYChLjug9Ti6Sfdk/tb9nwfKcMlLAZAJAcVJSErotP2vktInKhKQeGiCoKQSBemAEdX6397z5ZtM7B7ce7Ogql7Uxi87LzvMtWJHzBkkRY71O9wrWz3kZhudiORYjYAmv28sQDM0DhCQICAVBQihBEBGYQJGAkQIA80mSBAxwHXG42uv3XuZYuLrjyKEquNDs/IXcCTFCqAMAoPF8pdJMuVMlEgXbI67HaYxxjKfBSvMISSNgEJz6tNAzt3CJP1IVF+kAb5QyNCQtTtXjQYKi1B6740D+io0v/cIu0n8W1q03TZg/JbpHUmyN1+Xef73MMCdxrNwztNdQsqathjM1m5DCpGBvQutcAogh+br1C3/vnD5p/iSxIDQ0nOTYORRFRxIMGYRIMhIAxBRJ+oDDZkyiRp/PVwUcZyKAMPlYn9fisFmVciVmKNJvsdpNN1pu+rGHZfom9o21uu1KEgiJQCiIAsBigiDVJBAJHMui5MSkWIagTJeulOWwHY4z+f/Ir7+jEE1WVhadl5fnm/7C/GiBQnSS9fj35S9f//J/Kj/jlYVDeDzeio/fWHtfdl42Fd4UzgIAnKvRhwIAFG0tbNFqtZReryecIn8fcbAinPW46zT3PHQ1MzOTnbVswZSQ6IgPay9Xv79v7e63OteeAmFvZRKBuVgyiP+34KjQeJfNAQghMDW1XSApygAIKUiKpHlCfhpF/2hZHB12G3D4JMbYDxhbKD6zQBqmgCZ97ZSdOzcd9VZ7ammC+AIx9CwCEcBy7K+mI/yqZj0wd0rP0Pjw/X6vf8P2FRvXz34lO5LguAiCR4YDoAin1x1ksXXwIsPUYUCjWI7l7rZdao0oLCz0arVaSqfT+acvmb8yJFb1lLnZtHbbig9f02q1RKWjZrMiPGRO282mXNTqWwkqUCgiIyolIXJFe2PbjYZyw13SpCS7v+3q6APr9xwFAIgG4GesePIjcbB0JsdxHrfdeaml7Pr0w7sO3wAAmLpk3jRZePAWik/zfG5vm6nBkFP4j+17AQAeXPhIsjJK9c8t2nX337x4U6ROUZtbmlteff675995WfMyMRAN9N1WWFmr1RK5ubl4xssLRkUmRV8jCTKKADRw/vKnzpA8ehch5L1JUswsFuOUwX0HTn0p64U3BTw+wfr8l31u7+qu0I9er8dJSUkM5liLn/WLldFhr855JStLp9NxIpn4OsmjrJZW27bCwkKWDpKNE8hECqfDxWIEFMs6ZYU6nU8eoVw1f/lTmwGArAVw57++bpa52bgCc5gnUcoGq9MSL2UumTsBAGDP37fsbq9rmeBzuI18kTBElRC1Z/Yb2WsAgPxs074K+pBvnFar5XxB7rEUSUFbW9upwsxCNh3Sud+6QP45y4kSxvdkBqeMeFoUIkM+m/O6H5DJw7mqy6+VtOoL9d5uRnYUABwHOwxAYnT5lrgX2rlzJz3w4eEHlDGqcRiA8zrcLWd37k5MGT9xWmRy7EfNVXX5HotjvTRcuYUR8/sAIOSyOvR1F68MO1F4wrLwrZydyijV9NaapqKqb0rnfn306zYAgMwl82fIVfJNfJGA73G4fdYW05O7Vm3+CABgwqyH+0Qk9TgQJBcnYg7AajAfaLtWu+DznZ/bEEJ+i8V8hMfjD1my5CXV2rVrPZ05FPiObNYvDdGIiAiyqakJK3r0kC+eOdNgMBpWr/i86JVpvXqRGRkZ7k57QxYWFnLTX5j7anBcuM7r9XI0TVNum7MaEYikBfxYhAAwhwERCPw+P8fweYTDaLlef83S7/iOHY45byx+XREVupz1s+C22Cubqxoe++zjfWUAAFOeyBwRHB2xVygTqfweH1gMprd2rPzoVQCAkRNGqhLuTi0IUojvofkMtNe0fh6tC31o6KmhcfePur+qtbV1tUqlWtKZQ+a/fc36V2CPTEpKQvpkPU6qSMK6XB0G9NO+4U8x+I6Ojm8piooQiUQx3bPquhy8qc/MHKyICf8eE4A5lsM0jyFYnx84juUwBz7A4KMYSoQB+4EFp/FGy4uFa7d/rCnQIMM6Ax09qs8qaYg8B1EEuO0us6XeOGPvmm1HOmfRxNBesZ8GyUS9OQ6D1WDa8U3uhwurATxqtVowZtGkTXJV8HRrk3neZt3a/DZj22cyqez+4uLimHvvvbc5NzcX/SdX4Y/esKAQQv6ampqZ0dHR2y9evHhvWlraiZ/ynzpFO2nB1HBxmPhDabjiPsxyBEGTtKnecE4SKhtAUhRhbjR+JQ6V3S0QCxm31QmtVY0Jn+btva7RaMjCTz5hAWOY8fL8Z8ShincZIY/0Ot2stdWUvWvVlo8BAAaPHh3Wd0zyJ0HBkuEAAHZDx5flp0syz5081w4AMPOlRVN3rPpoT3V19dT4+PjdjY2Nr6nV6jd/b57WnQoLdW5c8JYtW3bd7/eaRCJJaqezyCKEcNesqnliev/w3j0uMiIBGOpbKgkWe/kyUU+OZZ3AYYG5qX2zVKVIcxjMu/0O/vaCjRutt07lmmdnPCCPDNvBFwtkrMcPtjZz7raVeTpACNSRkYJ7syZtFYfINYAAHCbbD7Z2+5zHV8+qzEAZ/jNnTvYbMmTEeafTeVYqlY7ojGNxv8VW/WEx+K63U119dXJ8fK/9zc3N70RERCzFGNNdtgBjDDOfm6nCNPMiTySIc3bYvhUrZC97PN4yzHEuikcLOa//wrY3814GgH970w9Mf0DOiMR3H8jbcxgAYHJ2Zj9lXPgnAqkoAXMYbG0dH+dr1y9GCPkxxjDnjcUfSFTyp/giIbRcqd+0/e28RfuL9sePzxj3DQDCX3zxRfpDDz3U3Bnb+l1JuH9ItnKXwAyG1g9DQkKzb9y4kRMfH7+2K8Ryi4ZQs5YuXO00W84KQ+VTxArp4EuFX2YkZAzcKAsPFpobDW3b3940uSvpLCsri/ZHMzdZD7tl6/INrwMAjJ06NiI6pc8nomDJUAwANqOl6PM1ex9ra2uzAwDMfmOxjiKJyM3a9QuPHz+cMnx4xhGCIIN++OGHkUOHDi3rDL/87jTJP0pYXQn9YDK1F8rlisk1NTUvxsbGvosxRrm5ubROp/PNXLpoqUghXuww2eodVvuekNjw1xghL7T9Zssxv8P9oShcPtJtdTh3rd76qlarJSAXQId03KJ3njkpDQ0ebbjRuG7bio1PAwCXnp4uTHl48A6JUjaZpCmwt3Xc6Ghqf1CTvaw6s29f748585fHxcTE7wMAl15fOiYtbUjpneSTUn+EsBBCGGPMdca3M41G49aYmJjVLS1NMQihZwDAW1xcTL2/48PvfG632FTb8n5IgnoTxpzUY3cZEUKEudp4vGDD7k+7x9O0oKUAgPO7fQaMOZCoFE/O0z0RZbhaO/fw7iLzhQsXpszNXbwhSC6dQVFUOY9i6My+fb0jNSNFu9bseiMiPGKJzWYtP3fum8ljxky4fqeJt3/ooYEug48Qwq2tratDQ0NfMJvNJ/bt2zdz0aJFrQgQ4E57OmfpwnS7wxVMACJsVcZi8WAxToIkf25u7k85n51aiUpNlbGK8NCtQdKgYTTNQHtd6xGod0/Pz893IIR8EXdFBDeda2oHALh+/dr00FDV30QicZTBYNi0atULz7777g7Hn5ah/HsF1pXRXFNT8xTGGDscjuZLly7d3z2h5Jfu7X7ooHMPAJIAmDnaJ8bdlzWxN0SDrPt9VeXlUbX1tUutNmsNxhjb7fbKsrKyCbdmWP9f5af06fLyixl2u7MBY4wNBsOOI0eOJN9Otk7X97pvLyvqrl9PqampmWkwGNbbbJYrXankNpvtUlVV1eyutWmn0BH8Feg6oLR+/Xq5wWD4Z1enzGbzsZqamkUXLnyX+tZbbwUnJCTwEhKAt3TpUvnRo0cTKisrxzQ1Nb1YW3tzaZddXbNmjcRgaD3hZ/0/5dmzrB9brday1tbmN8+ePTvwZwKDfy06T38BAMB3333Xx2g0bnA4HJauDvt8PuxwODwOh93j8fzvczjt7e3H9u/f36u9vf3TziF2ur6+PqusrGzkRx99FHbLRPNLB6fufLj8WXYMup0VTE9PF+bl5fVTKpX9BAJBLMf5gxFCHEKkyev11lut1mvNzc2GtLS0VTKZ7D6n02ERCoOkZrP56+zs7PsKCwtdtzybBADuL3OW8Lcmv/3O4UG2tLSswxjjjo6Ob9977z1Zp/bQBQUFZJfx//8ajDHqdvzu5z5kQUEB2XX87urVq3OLi4tVf4WZ7b89qxK3+nEBfmXtGRBUgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgN/H/wDwZ4nvpMPXGQAAAABJRU5ErkJggg==";
  const GENNA_SRC   = "data:image/png;base64,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";

  const Logo = ({ src, alt, h = 52, invert = false }) => (
    <img
      src={src} alt={alt}
      style={{
        height: h, width: "auto", maxWidth: 200,
        objectFit: "contain",
        filter: invert ? "brightness(0) invert(1)" : "none",
      }}
    />
  );

  const clients = [
    { id: 1, el: <Logo src={TRPDNM_SRC}  alt="TRPDNM"              h={38} invert={true} /> },
    { id: 2, el: <Logo src={NXTLVL_SRC}  alt="Team NXTLVL"         h={52} /> },
    { id: 3, el: <Logo src={NEXTGYM_SRC} alt="Next Gym"             h={58} /> },
    { id: 4, el: <Logo src={GAIGA_SRC}   alt="ASD B. Gaiga"        h={44} /> },
    { id: 5, el: <Logo src={TERSICO_SRC} alt="Tersicoredanza"      h={52} /> },
    { id: 6, el: <Logo src={JUNIOR_SRC}  alt="Junior Finale"       h={58} /> },
    { id: 7, el: <Logo src={GENNA_SRC}   alt="Genna's Barbershop"  h={52} invert={true} /> },
  ];

  const repeated = [...clients, ...clients, ...clients];

  return (
    <section ref={ref} style={{ background: "#0a0a0a", padding: "80px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{
        textAlign: "center", marginBottom: 56,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        padding: "0 clamp(40px,8%,120px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.15)" }}/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            Hanno scelto Fonderia Creativa
          </span>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.15)" }}/>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }}/>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }}/>

        <div style={{ display: "flex", alignItems: "center", animation: "clientsScroll 18s linear infinite", whiteSpace: "nowrap" }}>
          {repeated.map((c, i) => (
            <div key={i}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0 60px", flexShrink: 0,
                opacity: 0.5, transition: "opacity 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.5"}
            >
              {c.el}
              <div style={{ width: 3, height: 3, background: "#E5FF00", borderRadius: "50%", marginLeft: 60, flexShrink: 0, opacity: 0.4 }}/>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes clientsScroll {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
        `}</style>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Quanto dura una stampa?",
    a: "La durata dipende dalla tecnica utilizzata. Le stampe DTF e DTG hanno un'ottima resistenza ai lavaggi — fino a 50 cicli se curate correttamente. Il ricamo è praticamente eterno. La serigrafia con inchiostri plastisol garantisce decenni di durata. Ti consigliamo sempre il metodo di lavaggio ottimale per ogni tipo di produzione.",
  },
  {
    q: "Meglio DTF o serigrafia?",
    a: "Dipende dal progetto. DTF è ideale per run brevi, grafiche full-color ad alta definizione e substrati misti — nessun limite di colori, setup rapido. La serigrafia eccelle su grandi tirature con colori piatti, effetti speciali (puff, metallici, trasparenti) e un risultato tattile ineguagliabile. Ti aiutiamo a scegliere la tecnica giusta in base a quantità, budget e resa visiva desiderata.",
  },
  {
    q: "Fate campionature?",
    a: "Sì, realizziamo campioni singoli o in piccola serie prima della produzione definitiva. Il campione ti permette di valutare resa colore, posizionamento e qualità del materiale. I costi di campionatura vengono scalati dall'ordine finale in caso di conferma. Tempi: 3–5 giorni lavorativi.",
  },
  {
    q: "Quali sono i tempi di produzione?",
    a: "I tempi standard sono 7–10 giorni lavorativi dalla conferma del file definitivo. Per produzioni urgenti offriamo un servizio express (3–5 giorni lavorativi) con supplemento priorità. Grandi volumi o tecniche miste possono richiedere tempistiche personalizzate — sempre comunicate in fase di preventivo.",
  },
  {
    q: "C'è un minimo ordine?",
    a: "No. Produciamo da 1 pezzo in su. Ovviamente il costo unitario diminuisce all'aumentare della quantità — i nostri preventivi mostrano sempre il breakdown per fasce di volume. Per tirature molto basse (1–5 pezzi) consigliamo DTF o DTG per ottimizzare i costi di setup.",
  },
  {
    q: "Posso inviare file Canva?",
    a: "Preferiamo file vettoriali (AI, EPS, PDF) o PNG ad alta risoluzione (minimo 300 DPI). I file Canva possono essere accettati ma spesso richiedono un intervento di ottimizzazione grafica da parte nostra — servizio che offriamo internamente. Ti informiamo preventivamente se il file necessita di revisione e l'eventuale costo.",
  },
  {
    q: "Aiutate anche nella scelta del capo?",
    a: "Assolutamente sì. Abbiamo accesso ai principali cataloghi di produzione — Stanley/Stella, Fruit of the Loom, Gildan, AS Colour e molti altri. Ti guidiamo nella scelta in base a budget, destinazione d'uso, posizionamento del brand e resa della stampa specifica. Il capo giusto fa la differenza nel risultato finale.",
  },
  {
    q: "Realizzate etichette e packaging?",
    a: "Sì. Offriamo un servizio completo di branding del prodotto: etichette tessute e stampate, hang tag, polybag personalizzate, scatole e packaging coordinato. Ogni dettaglio contribuisce all'identità del brand — dalla stampa sulla t-shirt all'unboxing experience.",
  },
];

function FAQSection() {
  const [ref, inView] = useInView(0.1);
  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="faq" aria-labelledby="faq-title" ref={ref} style={{ background: "#080808", padding: "120px clamp(40px,8%,120px)" }}>
      <SectionLabel label="FAQ" number="06" inView={inView} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>

        {/* Left: sticky title */}
        <div style={{
          position: "sticky", top: 100,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px,5vw,80px)",
            lineHeight: 0.9, letterSpacing: 2, color: "#fff", margin: "0 0 24px",
          }}>
            DOMANDE<br/><span style={{ color: "#E5FF00" }}>FREQUENTI</span>
          </h2>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 15, lineHeight: 1.7,
            color: "rgba(255,255,255,0.4)", maxWidth: 320, margin: "0 0 48px",
          }}>
            Tutto quello che c'è da sapere prima di iniziare una produzione.
          </p>
          {/* Decorative element */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                height: 1,
                width: `${80 - i * 20}px`,
                background: i === 1 ? "#E5FF00" : "rgba(255,255,255,0.1)",
              }}/>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 12 }}>Hai altre domande?</div>
            <a href="#contatti" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2,
              color: "#E5FF00", textDecoration: "none", textTransform: "uppercase",
            }}>
              Scrivici direttamente →
            </a>
          </div>
        </div>

        {/* Right: accordion */}
        <div>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const isHov = hovered === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderTop: `1px solid ${isOpen ? "rgba(229,255,0,0.25)" : isHov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${0.05 * i}s`,
                  transitionDuration: "0.7s",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Question row */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "28px 0",
                  gap: 24,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2,
                      color: isOpen ? "#E5FF00" : "rgba(255,255,255,0.2)",
                      transition: "color 0.3s", minWidth: 24,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontFamily: "'Barlow', sans-serif", fontSize: 17, fontWeight: 500, lineHeight: 1.3,
                      color: isOpen ? "#fff" : isHov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)",
                      transition: "color 0.3s",
                    }}>
                      {faq.q}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div style={{
                    width: 28, height: 28, flexShrink: 0, position: "relative",
                    border: `1px solid ${isOpen ? "#E5FF00" : "rgba(255,255,255,0.15)"}`,
                    transition: "border-color 0.3s",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 10, height: 1,
                      background: isOpen ? "#E5FF00" : "rgba(255,255,255,0.5)",
                      transition: "background 0.3s",
                    }}/>
                    <div style={{
                      width: 1, height: 10, position: "absolute",
                      background: isOpen ? "transparent" : "rgba(255,255,255,0.5)",
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                    }}/>
                  </div>
                </div>

                {/* Answer — animated height */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "300px" : "0px",
                  transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <div style={{
                    paddingLeft: 44, paddingBottom: 28, paddingRight: 40,
                  }}>
                    {/* Yellow accent line */}
                    <div style={{ width: 24, height: 1, background: "#E5FF00", marginBottom: 16 }}/>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.8,
                      color: "rgba(255,255,255,0.45)", margin: 0,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}/>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer style={{ background: "#050505", padding: "60px clamp(40px,8%,120px) 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 4, color: "#fff" }}>FONDERIA CREATIVA</span>
          </div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.3)", maxWidth: 280 }}>
            Studio professionale di stampa e produzione merchandising. Tecnologie avanzate per brand, agenzie ed eventi.
          </p>
        </div>
        {[
          ["Tecnologie", ["DTF", "DTG", "Ricamo", "Serigrafia", "Tampografia"]],
          ["Servizi", ["Merchandising", "Packaging", "Gadget", "Produzione eventi", "Custom"]],
          ["Contatti", ["fonderiacreativa.info@gmail.com", "WA: +39 351 661 7010", "WA: +39 340 849 7952", "Lun–Ven 9–18"]],
        ].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: "#E5FF00", textTransform: "uppercase", marginBottom: 20 }}>{title}</div>
            {items.map(i => (
              <div key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 10, lineHeight: 1.4 }}>{i}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>© 2024 FONDERIA CREATIVA — TUTTI I DIRITTI RISERVATI</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.2)" }}>P.IVA 12345678901</div>
      </div>
    </footer>
  );
}

export default function FonderiaCreativa() {
  useEffect(() => {
    // SEO: set document title and meta description dynamically
    document.title = "Fonderia Creativa — Stampa DTF, Ricamo e Merchandising | Modena, Emilia Romagna";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Studio di stampa e produzione merchandising a Modena, Emilia Romagna. DTF, DTG, Ricamo personalizzato, Serigrafia. Preventivo gratuito in 24 ore.");
    // Custom cursor
    const cursor = document.createElement("div");
    cursor.id = "fc-cursor";
    cursor.style.cssText = `position:fixed;width:8px;height:8px;background:#E5FF00;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.1s;mix-blend-mode:difference;`;
    document.body.appendChild(cursor);
    const moveCursor = e => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", position: "relative" }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; cursor: none; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.15); font-family: 'Barlow', sans-serif; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080808; } ::-webkit-scrollbar-thumb { background: #E5FF00; }
        a { cursor: none; }
        select option { background: #111; color: #fff; }
      `}</style>
      <NavBar />
      <Hero />
      <MarqueeStrip />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <MarqueeStrip />
      <ClientsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
