import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "students",
    label: "Students",
    emoji: "🌱",
    tagline: "Build the foundation before the real world hits.",
    color: "#5A7C65",
    colorLight: "#EEF3EF",
    colorAccent: "#A8C5B0",
    tiles: [
      {
        title: "Few things to know (if you are choosing wealth)",
        desc: "Core setup, credit, net worth, your first car and apartment, all in one guide.",
        icon: "💡",
        href: "few-things.html",
      },
      {
        title: "Internships That Count",
        desc: "Find roles, stand out in applications, and turn experience into momentum.",
        icon: "💼",
        href: "internships.html",
      },
    ],
  },
  {
    id: "young-professionals",
    label: "Young Professionals",
    emoji: "🚀",
    tagline: "You're earning real money, now make it work for you.",
    color: "#8B7234",
    colorLight: "#F7F3EA",
    colorAccent: "#D4BA6A",
    tiles: [
      {
        title: "Benefits Breakdown",
        desc: "Decode your offer beyond the salary.",
        icon: "📋",
      },
      {
        title: "Rent vs. Buy",
        desc: "Real math, not opinions.",
        icon: "🏠",
      },
      {
        title: "Debt vs. Investing",
        desc: "Where should your next dollar go?",
        icon: "⚖️",
      },
      {
        title: "Car Buying Smart",
        desc: "Mobility without wrecking your wealth.",
        icon: "🚗",
      },
      {
        title: "Lifestyle Creep Check",
        desc: "Small habits, big consequences.",
        icon: "☕",
      },
      {
        title: "Career Moves That Pay",
        desc: "Strategic leaps over comfortable traps.",
        icon: "💼",
      },
    ],
  },
  {
    id: "parents",
    label: "Parents",
    emoji: "🎯",
    tagline: "Protect your family's future with clarity.",
    color: "#6B5B8A",
    colorLight: "#F2EFF6",
    colorAccent: "#B8A9D4",
    tiles: [
      {
        title: "Talk Money by Age",
        desc: "Conversation starters for every stage.",
        icon: "💬",
      },
      {
        title: "529 & College Savings",
        desc: "Plan before the tuition bill lands.",
        icon: "🎒",
      },
      {
        title: "Family Budget Workshop",
        desc: "One household, one plan.",
        icon: "📊",
      },
      {
        title: "Wills & Estate Basics",
        desc: "The conversation nobody wants to have.",
        icon: "📜",
      },
      {
        title: "Co-Parenting & Finances",
        desc: "Shared kids, shared clarity.",
        icon: "🤝",
      },
      {
        title: "Spending With Purpose",
        desc: "Joy without justification spirals.",
        icon: "🎉",
      },
    ],
  },
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

function SectionBlock({ section, index }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 0",
        background: isEven ? "#FDFCFA" : section.colorLight,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: isEven ? 0 : "auto",
          left: isEven ? "auto" : 0,
          width: 200,
          height: 200,
          background: `radial-gradient(circle at ${isEven ? "top right" : "top left"}, ${section.colorAccent}22, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: section.color,
              color: "#fff",
              padding: "8px 20px",
              borderRadius: 100,
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 16 }}>{section.emoji}</span>
            {section.label}
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 8px 0",
              lineHeight: 1.2,
            }}
          >
            {section.tagline}
          </h2>
          <div
            style={{
              width: 48,
              height: 3,
              background: section.color,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Tiles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {section.tiles.map((tile, i) => (
            <TileCard
              key={tile.title}
              tile={tile}
              section={section}
              delay={i * 0.08}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TileCard({ tile, section, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (tile.href) window.location.href = tile.href;
      }}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: hovered ? "#fff" : "#FFFFFF",
        border: `1.5px solid ${hovered ? section.color : "#E8E4DE"}`,
        borderRadius: 16,
        padding: "28px 24px",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
        boxShadow: hovered
          ? `0 12px 32px ${section.color}18, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 3px rgba(0,0,0,0.04)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: section.color,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: section.colorLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
            transition: "background 0.3s ease",
            ...(hovered ? { background: `${section.colorAccent}33` } : {}),
          }}
        >
          {tile.icon}
        </div>
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#1A1A1A",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {tile.title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#6B6B6B",
          margin: "0 0 16px 0",
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {tile.desc}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: section.color,
          transition: "gap 0.3s ease",
          ...(hovered ? { gap: 10 } : {}),
        }}
      >
        Start Guide
        <span
          style={{
            transition: "transform 0.3s ease",
            display: "inline-block",
            ...(hovered ? { transform: "translateX(2px)" } : {}),
          }}
        >
          →
        </span>
      </div>
    </button>
  );
}

function NavPill({ sections, active, onSelect }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(253, 252, 250, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid #E8E4DE",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #5A7C65, #8B7234)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TAP
          </span>
          <span style={{ color: "#999", fontWeight: 400, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            Interactive Guides
          </span>
        </div>

        <nav style={{ display: "flex", gap: 4 }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: active === s.id ? 700 : 500,
                color: active === s.id ? s.color : "#888",
                padding: "8px 16px",
                borderRadius: 100,
                background: active === s.id ? `${s.colorLight}` : "transparent",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ marginRight: 5 }}>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function TAPGuidesHome() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 300 && rect.bottom > 200) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "#FDFCFA", minHeight: "100vh" }}>
      {/* Hero */}
      <header
        style={{
          position: "relative",
          padding: "100px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, #FDFCFA 0%, #F5F1EB 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "10%",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "radial-gradient(circle, #A8C5B015, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: "15%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(circle, #D4BA6A12, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8B7234",
            background: "#8B723412",
            padding: "6px 18px",
            borderRadius: 100,
            marginBottom: 24,
          }}
        >
          The Affluence Project
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: "0 auto 20px",
            maxWidth: 700,
            lineHeight: 1.15,
          }}
        >
          Your Money.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #5A7C65, #8B7234)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Guide.
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "#777",
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          Interactive tools built for where you actually are — not where a textbook thinks you should be.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: s.color,
                background: s.colorLight,
                border: `1.5px solid ${s.colorAccent}55`,
                padding: "12px 28px",
                borderRadius: 100,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = s.color;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = s.colorLight;
                e.currentTarget.style.color = s.color;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* Sticky nav */}
      <NavPill sections={SECTIONS} active={activeSection} onSelect={scrollTo} />

      {/* Sections */}
      {SECTIONS.map((section, i) => (
        <div key={section.id} id={section.id}>
          <SectionBlock section={section} index={i} />
        </div>
      ))}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "60px 24px",
          background: "#1A1A1A",
          color: "#999",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          The Affluence Project
        </div>
        <p style={{ margin: "0 0 4px 0" }}>
          Creating generational wealth through mentorship, networking & advocacy.
        </p>
        <p style={{ margin: 0, fontSize: 12, color: "#666" }}>
          © {new Date().getFullYear()} The Affluence Project. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
