import { useState, useEffect, useRef } from "react";

function Icon({ name, size = 20, color = "currentColor", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      focusable={false}
      style={{ color, display: "block", flexShrink: 0, ...style }}
    >
      <use href={`icons.svg#tap-i-${name}`} />
    </svg>
  );
}

const TIER_BANDS = [
  { title: "Emerging", subtitle: "Negative to $0", min: -Infinity, max: 0, href: "tier-emerging.html", icon: "sprout", color: "#c0392b" },
  { title: "Rooted", subtitle: "$1 to $49K", min: 1, max: 49999, href: "tier-rooted.html", icon: "leaf", color: "#27ae60" },
  { title: "Progressing", subtitle: "$50K to $199K", min: 50000, max: 199999, href: "tier-progressing.html", icon: "rocket", color: "#2980b9" },
  { title: "Aligned", subtitle: "$200K to $499K", min: 200000, max: 499999, href: "tier-aligned.html", icon: "target", color: "#8B7234" },
  { title: "Affluent", subtitle: "$500K+", min: 500000, max: Infinity, href: "tier-affluent.html", icon: "gem", color: "#6B5B8A" },
];

function NetWorthCalculator({ sectionColor }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [assets, setAssets] = useState({
    checking: "",
    savings: "",
    investments: "",
    retirement: "",
    property: "",
    otherAssets: "",
  });
  const [liabilities, setLiabilities] = useState({
    creditCards: "",
    studentLoans: "",
    autoLoans: "",
    mortgage: "",
    otherDebts: "",
  });

  const fmt = (n) =>
    n < 0
      ? "-$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })
      : "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const num = (v) => {
    const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const totalAssets = Object.values(assets).reduce((s, v) => s + num(v), 0);
  const totalLiabilities = Object.values(liabilities).reduce((s, v) => s + num(v), 0);
  const netWorth = totalAssets - totalLiabilities;

  const calculate = () => {
    const tier = TIER_BANDS.find((t) => netWorth >= t.min && netWorth <= t.max) || TIER_BANDS[0];
    setResult({ netWorth, totalAssets, totalLiabilities, tier });
  };

  const assetFields = [
    { key: "checking", label: "Checking accounts" },
    { key: "savings", label: "Savings & emergency fund" },
    { key: "investments", label: "Taxable investments" },
    { key: "retirement", label: "Retirement accounts (401k, IRA)" },
    { key: "property", label: "Property value (if owned)" },
    { key: "otherAssets", label: "Other assets" },
  ];
  const liabFields = [
    { key: "creditCards", label: "Credit card balances" },
    { key: "studentLoans", label: "Student loans" },
    { key: "autoLoans", label: "Auto loans" },
    { key: "mortgage", label: "Mortgage balance" },
    { key: "otherDebts", label: "Other debts" },
  ];

  const inputStyle = {
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    border: "1.5px solid #E8E4DE",
    borderRadius: 10,
    padding: "10px 14px 10px 28px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#444",
    display: "block",
    marginBottom: 4,
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "#fff",
          border: "2px dashed " + sectionColor,
          borderRadius: 16,
          padding: "24px",
          width: "100%",
          boxSizing: "border-box",
          transition: "all 0.3s ease",
          gridColumn: "1 / -1",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#F7F3EA";
          e.currentTarget.style.borderStyle = "solid";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.borderStyle = "dashed";
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "#F7F3EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name="crosshair" size={24} color={sectionColor} />
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 4px 0",
            }}
          >
            What is my tier?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#888",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Calculate your net worth and find out where you stand.
          </p>
        </div>
        <Icon name="bar-chart" size={20} color={sectionColor} />
      </button>
    );
  }

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        background: "#fff",
        border: `2px solid ${sectionColor}`,
        borderRadius: 16,
        padding: "32px 28px",
        boxSizing: "border-box",
        animation: "fadeSlideIn 0.35s ease",
      }}
    >
      <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#F7F3EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="crosshair" size={22} color={sectionColor} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              What is my tier?
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0 }}>
              Net worth = what you own minus what you owe
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setOpen(false); setResult(null); }}
          style={{
            all: "unset",
            cursor: "pointer",
            fontSize: 22,
            color: "#999",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          aria-label="Close calculator"
        >
          ×
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
        <div>
          <h4
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#27ae60",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="trending" size={16} color="#27ae60" /> What you own
          </h4>
          {assetFields.map((f) => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={labelStyle}>{f.label}</label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={assets[f.key]}
                  onChange={(e) => setAssets({ ...assets, [f.key]: e.target.value })}
                  onFocus={(e) => (e.target.style.borderColor = sectionColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E4DE")}
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#27ae60",
              padding: "12px 0",
              borderTop: "2px solid #E8E4DE",
              marginTop: 8,
            }}
          >
            Total assets: {fmt(totalAssets)}
          </div>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#c0392b",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="credit-card" size={16} color="#c0392b" /> What you owe
          </h4>
          {liabFields.map((f) => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={labelStyle}>{f.label}</label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={liabilities[f.key]}
                  onChange={(e) => setLiabilities({ ...liabilities, [f.key]: e.target.value })}
                  onFocus={(e) => (e.target.style.borderColor = sectionColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E4DE")}
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#c0392b",
              padding: "12px 0",
              borderTop: "2px solid #E8E4DE",
              marginTop: 8,
            }}
          >
            Total owed: {fmt(totalLiabilities)}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={calculate}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          width: "100%",
          maxWidth: 400,
          margin: "28px auto 0",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          background: `linear-gradient(135deg, ${sectionColor}, #D4BA6A)`,
          padding: "14px 0",
          borderRadius: 12,
          textAlign: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 4px 16px ${sectionColor}33`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 8px 24px ${sectionColor}44`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 16px ${sectionColor}33`;
        }}
      >
        Find my tier
      </button>

      {result ? (
        <div style={{ marginTop: 32, animation: "fadeSlideIn 0.4s ease" }}>
          <div
            style={{
              textAlign: "center",
              padding: "28px 20px",
              borderRadius: 14,
              background: result.netWorth >= 0 ? "#f0faf3" : "#fef5f5",
              border: `2px solid ${result.tier.color}44`,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#888",
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Your net worth
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 6vw, 48px)",
                fontWeight: 700,
                color: result.netWorth >= 0 ? "#27ae60" : "#c0392b",
                margin: "0 0 8px 0",
                lineHeight: 1.1,
              }}
            >
              {fmt(result.netWorth)}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 13, color: "#888" }}>
              <span>Assets: {fmt(result.totalAssets)}</span>
              <span>Owed: {fmt(result.totalLiabilities)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: 14,
              border: `2px solid ${result.tier.color}`,
              background: `${result.tier.color}08`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${result.tier.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={result.tier.icon} size={24} color={result.tier.color} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#888",
                    margin: "0 0 2px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Your tier
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: result.tier.color,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {result.tier.title}
                </p>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#555",
                margin: "0 0 4px 0",
                lineHeight: 1.5,
              }}
            >
              {result.tier.subtitle} net worth band
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0 0 0" }}>
              {TIER_BANDS.map((t) => (
                <div
                  key={t.title}
                  style={{
                    flex: 1,
                    minWidth: 80,
                    padding: "10px 8px",
                    borderRadius: 10,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    background: t.title === result.tier.title ? `${t.color}22` : "#f5f5f5",
                    border: t.title === result.tier.title ? `2px solid ${t.color}` : "2px solid transparent",
                    color: t.title === result.tier.title ? t.color : "#999",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Icon name={t.icon} size={16} color={t.title === result.tier.title ? t.color : "#ccc"} style={{ margin: "0 auto 4px" }} />
                  {t.title}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = result.tier.href)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                background: result.tier.color,
                padding: "14px 0",
                borderRadius: 12,
                marginTop: 20,
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: `0 4px 12px ${result.tier.color}33`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon name={result.tier.icon} size={18} color="#fff" />
              Explore the {result.tier.title} tier guide
              <span style={{ fontSize: 18 }}>→</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const SECTIONS = [
  {
    id: "students",
    label: "Students",
    sectionIcon: "sprout",
    tagline: "Build the foundation before the real world hits.",
    color: "#5A7C65",
    colorLight: "#EEF3EF",
    colorAccent: "#A8C5B0",
    tiles: [
      {
        title: "Few things to know (if you are choosing wealth)",
        desc: "Core setup, credit, net worth, your first car and apartment, all in one guide.",
        tileIcon: "lightbulb",
        href: "few-things.html",
      },
      {
        title: "Internships That Count",
        desc: "Find roles, stand out in applications, and turn experience into momentum.",
        tileIcon: "briefcase",
        href: "internships.html",
      },
    ],
  },
  {
    id: "young-professionals",
    label: "Young Professionals",
    navShortLabel: "Young pros",
    sectionIcon: "rocket",
    tagline: "Where are you on the wealth path?",
    intro:
      "Five tiers from Emerging to Affluent, organized by net worth band. Each tier has tailored guidance for housing, transportation, and lifestyle spending. Find your tier and start building.",
    color: "#8B7234",
    colorLight: "#F7F3EA",
    colorAccent: "#D4BA6A",
    hasTierCalculator: true,
    tiles: [
      {
        title: "Emerging",
        subtitle: "Negative to $0",
        desc: "You are building foundations: how money works, credit awareness, sustainable spending, and where you live.",
        focusLine: "Your focus: stability, clarity, and establishing patterns.",
        quote: "Being in Emerging does not mean you are behind. You are building.",
        tileIcon: "sprout",
        href: "tier-emerging.html",
        subtopics: ["Housing", "Transportation", "Lifestyle & Food"],
      },
      {
        title: "Rooted",
        subtitle: "$1 to $49K",
        desc: "You are gaining traction: sustainable momentum, compound returns, strategic debt payoff, and financial flexibility.",
        focusLine: "Your focus: gaining traction, establishing systems.",
        quote: "This is where discipline turns into results. Keep going.",
        tileIcon: "leaf",
        href: "tier-rooted.html",
        subtopics: ["Housing", "Transportation", "Lifestyle & Food"],
      },
      {
        title: "Progressing",
        subtitle: "$50K to $199K",
        desc: "You are building real momentum: scaling income without scaling stress, lifestyle creep, and strategic risk.",
        focusLine: "Your focus: scaling intentionally without lifestyle creep.",
        quote: "Avoid the trap of making good money but not building wealth.",
        tileIcon: "rocket",
        href: "tier-progressing.html",
        subtopics: ["Housing", "Transportation", "Lifestyle & Food"],
      },
      {
        title: "Aligned",
        subtitle: "$200K to $499K",
        desc: "You are optimizing: tax efficiency, diversification, and a life that matches your values.",
        focusLine: "Your focus: optimization, values alignment, life design.",
        quote: "You are not just building wealth; you are designing your life.",
        tileIcon: "target",
        href: "tier-aligned.html",
        subtopics: ["Housing", "Transportation", "Lifestyle & Food"],
      },
      {
        title: "Affluent",
        subtitle: "$500K+",
        desc: "You are creating legacy: generational wealth, philanthropy, estate design, and stewardship.",
        focusLine: "Your focus: stewardship, legacy, overflow with intention.",
        quote: "You have the resources. Now it is about impact and meaning.",
        tileIcon: "gem",
        href: "tier-affluent.html",
        subtopics: ["Housing", "Transportation", "Lifestyle & Food"],
      },
    ],
  },
  {
    id: "tap-tools",
    label: "TAP Tools",
    navShortLabel: "Tools",
    sectionIcon: "wrench",
    tagline: "Run the numbers before you decide.",
    intro:
      "Interactive calculators that help you model real financial decisions. No guesswork, just your numbers.",
    color: "#2D6A4F",
    colorLight: "#E9F5EF",
    colorAccent: "#74C69D",
    tiles: [
      {
        title: "Rent vs. Buy",
        desc: "Compare the true cost of renting versus buying over 5, 10, and 20 years.",
        tileIcon: "home",
        href: "tool-rent-vs-buy.html",
        cta: "Open calculator",
      },
      {
        title: "Debt vs. Investing",
        desc: "Should your next dollar pay down debt or go into the market?",
        tileIcon: "scale",
        href: "tool-debt-vs-investing.html",
        cta: "Open calculator",
      },
      {
        title: "Lifestyle Creep Check",
        desc: "Your income went up. Did your savings? Find out where the money went.",
        tileIcon: "coffee",
        href: "tool-lifestyle-creep.html",
        cta: "Check my creep",
      },
      {
        title: "Budget Allocator",
        desc: "Slide to allocate your income across categories, drag to set priorities, and get smart rebalance suggestions.",
        tileIcon: "bar-chart",
        href: "tool-budget-allocator.html",
        cta: "Build my budget",
      },
      {
        title: "Vehicle Affordability",
        desc: "Can you really afford that car? Enter the numbers and see if it fits your budget or stretches you thin.",
        tileIcon: "car",
        href: "tool-vehicle-affordability.html",
        cta: "Check affordability",
      },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    sectionIcon: "compass",
    tagline: "Strategic reads for your next move.",
    intro:
      "In-depth guides on career decisions, car buying, and decoding your benefits package.",
    color: "#5A6C8A",
    colorLight: "#EEF1F6",
    colorAccent: "#A3B4D0",
    tiles: [
      {
        title: "Benefits Breakdown",
        desc: "Decode your offer beyond the salary: health plans, 401k match, HSA, equity, and more.",
        tileIcon: "clipboard",
      },
      {
        title: "Car Buying Smart",
        desc: "New vs used, financing traps, negotiation tactics, and total cost of ownership.",
        tileIcon: "car",
      },
      {
        title: "Career Moves That Pay",
        desc: "When to stay, when to jump, and how to negotiate the leap.",
        tileIcon: "briefcase",
      },
    ],
  },
  {
    id: "parents",
    label: "Parents",
    sectionIcon: "target",
    tagline: "Protect your family's future with clarity.",
    color: "#6B5B8A",
    colorLight: "#F2EFF6",
    colorAccent: "#B8A9D4",
    tiles: [
      {
        title: "Talk Money by Age",
        desc: "Conversation starters for every stage.",
        tileIcon: "message",
      },
      {
        title: "529 & College Savings",
        desc: "Plan before the tuition bill lands.",
        tileIcon: "backpack",
      },
      {
        title: "Family Budget Workshop",
        desc: "One household, one plan.",
        tileIcon: "bar-chart",
      },
      {
        title: "Wills & Estate Basics",
        desc: "The conversation nobody wants to have.",
        tileIcon: "scroll-text",
      },
      {
        title: "Co-Parenting & Finances",
        desc: "Shared kids, shared clarity.",
        tileIcon: "handshake",
      },
      {
        title: "Spending With Purpose",
        desc: "Joy without justification spirals.",
        tileIcon: "party",
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
            <Icon name={section.sectionIcon} size={18} color="#fff" />
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
              marginBottom: section.intro ? 20 : 0,
            }}
          />
          {section.intro ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "#555",
                maxWidth: 720,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {section.intro}
            </p>
          ) : null}
        </div>

        {/* Tiles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {section.hasTierCalculator ? (
            <NetWorthCalculator sectionColor={section.color} />
          ) : null}
          {section.tiles.map((tile, i) => (
            <TileCard
              key={tile.title + (tile.subtitle || "")}
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
  const clickable = Boolean(tile.href);
  const comingSoon = Boolean(tile.comingSoon);

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    background: hovered && clickable ? "#fff" : "#FFFFFF",
    border: `1.5px solid ${hovered && clickable ? section.color : "#E8E4DE"}`,
    borderRadius: 16,
    padding: "28px 24px",
    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
    transform: visible ? (hovered && clickable ? "translateY(-4px)" : "translateY(0)") : "translateY(24px)",
    opacity: visible ? 1 : 0,
    transitionDelay: `${delay}s`,
    boxShadow:
      hovered && clickable
        ? `0 12px 32px ${section.color}18, 0 2px 8px rgba(0,0,0,0.06)`
        : "0 1px 3px rgba(0,0,0,0.04)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    cursor: clickable ? "pointer" : "default",
    textAlign: "left",
    width: "100%",
  };

  const inner = (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: section.color,
          transform: hovered && clickable ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
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
            flexShrink: 0,
            transition: "background 0.3s ease",
            ...(hovered && clickable ? { background: `${section.colorAccent}33` } : {}),
          }}
        >
          <Icon name={tile.tileIcon} size={22} color={section.color} />
        </div>
        <div style={{ minWidth: 0 }}>
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
          {tile.subtitle ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: section.color,
                margin: "4px 0 0 0",
                lineHeight: 1.35,
              }}
            >
              {tile.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#6B6B6B",
          margin: "0 0 12px 0",
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {tile.desc}
      </p>

      {tile.focusLine ? (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#444",
            margin: "0 0 10px 0",
            lineHeight: 1.5,
          }}
        >
          {tile.focusLine}
        </p>
      ) : null}

      {tile.quote ? (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontStyle: "italic",
            color: "#888",
            margin: "0 0 12px 0",
            lineHeight: 1.55,
            borderLeft: `3px solid ${section.colorAccent}`,
            paddingLeft: 12,
          }}
        >
          {tile.quote}
        </p>
      ) : null}

      {tile.subtopics ? (
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            margin: "0 0 16px 0",
          }}
        >
          {tile.subtopics.map((topic) => {
            const iconMap = { Housing: "home", Transportation: "car", "Lifestyle & Food": "utensils" };
            return (
              <span
                key={topic}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: section.color,
                  background: section.colorLight,
                  padding: "4px 10px",
                  borderRadius: 100,
                }}
              >
                <Icon name={iconMap[topic] || "star"} size={12} color={section.color} />
                {topic}
              </span>
            );
          })}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: hovered && clickable ? 10 : 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: comingSoon || !clickable ? "#999" : section.color,
          transition: "gap 0.3s ease",
          marginTop: "auto",
        }}
      >
        {tile.cta || (comingSoon ? "Tier guides coming soon" : "Explore this tier")}
        {clickable ? (
          <span
            style={{
              transition: "transform 0.3s ease",
              display: "inline-block",
              ...(hovered ? { transform: "translateX(2px)" } : {}),
            }}
          >
            →
          </span>
        ) : null}
      </div>
    </>
  );

  if (clickable) {
    return (
      <button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          window.location.href = tile.href;
        }}
        style={{ all: "unset", ...cardStyle }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={`${tile.title}${tile.subtitle ? ", " + tile.subtitle : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle}
    >
      {inner}
    </div>
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

        <nav style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
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
              <span style={{ display: "inline-flex", alignItems: "center", marginRight: 6 }}>
                <Icon name={s.sectionIcon} size={15} color={active === s.id ? s.color : "#888"} />
              </span>
              {s.navShortLabel || s.label}
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
      {/* Hero — fills viewport until user scrolls or picks a section */}
      <header
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, #FDFCFA 0%, #F5F1EB 100%)",
          padding: "60px 24px 40px",
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
              <Icon name={s.sectionIcon} size={18} color="currentColor" />
              {s.navShortLabel || s.label}
            </button>
          ))}
        </div>

        {/* Scroll hint pinned to bottom of hero */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: "heroFloat 2s ease-in-out infinite",
          }}
        >
          <style>{`@keyframes heroFloat { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }`}</style>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#bbb",
              letterSpacing: "0.04em",
            }}
          >
            Scroll to explore
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bbb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
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
