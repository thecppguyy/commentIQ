const ArrowUpRight = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 15 15 5M6 5h9v9" />
  </svg>
);

const Sparkle = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2 1.9 7.1L21 12l-7.1 1.9L12 21l-1.9-7.1L3 12l7.1-2.9L12 2Z" />
    <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
  </svg>
);

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 34 34">
        <path d="M17 3.5c-7.45 0-13.5 6.05-13.5 13.5S9.55 30.5 17 30.5c4.12 0 7.8-1.85 10.28-4.76a9.4 9.4 0 0 1-4.2.99c-5.22 0-9.45-4.23-9.45-9.45s4.23-9.45 9.45-9.45c1.52 0 2.95.36 4.22 1A13.46 13.46 0 0 0 17 3.5Z" />
        <circle cx="27.25" cy="17" r="3.25" />
      </svg>
    </span>
  );
}

function DashboardPreview() {
  return (
    <div className="preview-shell" id="preview" aria-label="Sample CommentIQ dashboard preview">
      <div className="preview-window-bar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>commentiq.app / overview</span>
        <span className="preview-live"><i /> Sample workspace</span>
      </div>
      <div className="preview-app">
        <aside className="preview-sidebar">
          <div className="preview-logo"><BrandMark /><span>comment<span>IQ</span></span></div>
          <div className="preview-nav-label">WORKSPACE</div>
          <div className="preview-nav-item active"><span className="nav-glyph">▦</span> Overview</div>
          <div className="preview-nav-item"><span className="nav-glyph">◷</span> Comments</div>
          <div className="preview-nav-item"><span className="nav-glyph">✳</span> Insights</div>
          <div className="preview-nav-label sources-label">YOUR DATA</div>
          <div className="preview-dataset"><span className="dataset-icon">▤</span><span>Spring product reviews</span><i /></div>
          <div className="preview-dataset muted"><span className="dataset-icon">▤</span><span>Support feedback</span></div>
          <div className="preview-sidebar-bottom"><span className="avatar">S</span><span>Studio North<small>Free workspace</small></span><span className="more">···</span></div>
        </aside>
        <div className="preview-main">
          <div className="preview-topline"><div><span className="eyebrow">MONDAY, MAY 20, 2025</span><h3>Your feedback at a glance</h3></div><button className="preview-filter">Last 30 days <span>⌄</span></button></div>
          <div className="preview-stats">
            <div className="preview-stat"><span>Total comments</span><strong>2,458</strong><small className="stat-up">↗ 12.8% <em>vs. last month</em></small><span className="stat-icon lime">▤</span></div>
            <div className="preview-stat"><span>Positive sentiment</span><strong>68.4%</strong><small className="stat-up">↗ 4.2% <em>vs. last month</em></small><span className="stat-icon green">↗</span></div>
            <div className="preview-stat"><span>Needs attention</span><strong>184</strong><small className="stat-note">Across 6 products</small><span className="stat-icon peach">!</span></div>
          </div>
          <div className="preview-panels">
            <div className="chart-panel">
              <div className="panel-heading"><div><strong>Sentiment over time</strong><span>Customer mood across your feedback</span></div><span className="panel-menu">···</span></div>
              <div className="chart-legend"><span><i className="legend-positive" /> Positive</span><span><i className="legend-neutral" /> Neutral</span><span><i className="legend-negative" /> Negative</span></div>
              <div className="chart-area">
                <div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                <div className="chart-plot">
                  <div className="chart-grid"><i /><i /><i /><i /><i /></div>
                  <svg viewBox="0 0 580 150" preserveAspectRatio="none" className="line-chart" role="img" aria-label="Illustrative sentiment chart showing positive feedback rising over time">
                    <path className="line-positive" d="M0 75 C35 68 38 62 72 67 S115 55 145 60 S185 45 216 51 S255 42 289 48 S330 30 362 39 S404 34 434 38 S477 20 507 29 S550 12 580 18" />
                    <path className="line-neutral" d="M0 105 C28 102 48 110 72 104 S120 99 145 102 S190 88 216 94 S265 101 289 96 S335 104 362 97 S407 90 434 94 S483 106 507 98 S551 102 580 96" />
                    <path className="line-negative" d="M0 128 C28 125 47 131 72 127 S120 130 145 124 S190 133 216 126 S264 121 289 127 S334 132 362 125 S406 131 434 126 S478 122 507 128 S551 124 580 122" />
                  </svg>
                  <div className="chart-x-labels"><span>May 1</span><span>May 7</span><span>May 14</span><span>May 21</span><span>May 30</span></div>
                </div>
              </div>
            </div>
            <div className="topics-panel">
              <div className="panel-heading"><div><strong>What customers mention</strong><span>Frequent themes</span></div><span className="panel-menu">···</span></div>
              <div className="topic-row"><span className="topic-dot dot-lime" /><span>Easy to use</span><strong>42%</strong><div className="topic-bar"><i style={{ width: "78%" }} /></div></div>
              <div className="topic-row"><span className="topic-dot dot-blue" /><span>Product quality</span><strong>31%</strong><div className="topic-bar"><i style={{ width: "58%" }} /></div></div>
              <div className="topic-row"><span className="topic-dot dot-orange" /><span>Shipping times</span><strong>18%</strong><div className="topic-bar"><i style={{ width: "36%" }} /></div></div>
              <div className="topic-row"><span className="topic-dot dot-purple" /><span>Customer support</span><strong>12%</strong><div className="topic-bar"><i style={{ width: "24%" }} /></div></div>
              <a className="panel-link" href="#features">Explore feedback <ArrowUpRight /></a>
            </div>
          </div>
          <div className="preview-insight"><span className="insight-spark"><Sparkle /></span><div><strong>A pattern worth a closer look</strong><p>Customers love the product quality. Recent comments mention longer shipping times, especially for international orders.</p></div><span className="insight-label">AI INSIGHT</span></div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { number: "01", title: "Bring feedback together", description: "Start with a CSV. Bring reviews, product comments, and customer notes into one clear workspace.", className: "feature-lime", icon: "↗" },
  { number: "02", title: "Understand the feeling", description: "See positive, neutral, and negative feedback at a glance, with uncertain results called out.", className: "feature-peach", icon: "◒" },
  { number: "03", title: "Know what to improve", description: "Find recurring themes and customer concerns, grounded in the feedback people actually shared.", className: "feature-blue", icon: "✳" },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    recommended: false,
    description: "Get users",
    audience: "For students, individual creators, and anyone trying CommentIQ.",
    features: ["500 comments analyzed per month", "Basic sentiment analysis", "Language detection", "Basic analytics dashboard", "CSV upload and export"],
  },
  {
    name: "Starter",
    price: "₹499",
    description: "A little more clarity, every month.",
    audience: "For creators, small businesses, and individual marketers.",
    recommended: true,
    features: ["3,000 comments analyzed per month", "Sentiment and spam analysis", "Keyword and topic insights", "AI-generated summaries", "Report exports", "Longer dataset history"],
  },
  {
    name: "Growth",
    price: "₹1,499",
    recommended: false,
    description: "See the bigger picture across your products.",
    audience: "For growing e-commerce businesses and marketing agencies.",
    features: ["15,000 comments analyzed per month", "Everything in Starter", "Product-wise comparisons", "Sentiment trends and advanced filters", "More AI-generated insights", "Priority processing"],
  },
  {
    name: "Business",
    price: "₹4,999",
    recommended: false,
    description: "More room for teams and feedback at scale.",
    audience: "For agencies and businesses with substantial feedback volumes.",
    features: ["75,000 comments analyzed per month", "Everything in Growth", "Multiple team members", "Advanced reporting", "Higher processing limits", "Priority support"],
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement"><span className="announcement-pill">EARLY ACCESS</span> Your customers are telling you what matters. <a href="#features">See how CommentIQ helps <span>→</span></a></div>
      <header className="site-header page-container">
        <a className="brand" href="#top" aria-label="CommentIQ home"><BrandMark /><span>comment<span>IQ</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="#preview">Product preview</a></nav>
        <div className="header-actions"><a className="login-link" href="#get-started">Log in</a><a className="button button-dark header-cta" href="#get-started">Get started <ArrowUpRight /></a></div>
      </header>

      <section className="hero page-container" id="top">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-spark"><Sparkle /></span> CUSTOMER FEEDBACK, MADE CLEAR</div>
          <h1>Every comment has a <span>signal.</span></h1>
          <p className="hero-description">Turn thousands of customer reviews into a clear picture of what people love, what needs work, and where to go next.</p>
          <div className="hero-actions"><a className="button button-dark button-large" href="#get-started">Get started for free <ArrowUpRight /></a><a className="text-link" href="#how-it-works"><span className="play-button">▶</span> See how it works</a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><p><strong>Less scrolling. More understanding.</strong><br />Built for teams who listen to customers.</p></div>
        </div>
        <div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="floating-note note-top"><span className="note-emoji">✦</span><span><strong>Positive trend</strong><small>Product feedback is up</small></span><b>↗</b></div><div className="floating-note note-bottom"><span className="note-alert">!</span><span><strong>Recurring theme</strong><small>Shipping needs a closer look</small></span></div><DashboardPreview /></div>
      </section>

      <section className="trust-strip page-container" aria-label="CommentIQ capabilities"><span>FROM RAW COMMENTS TO CLEAR SIGNALS</span><div><i>✳</i> Sentiment at a glance</div><div><i>⌕</i> Themes that repeat</div><div><i>↗</i> Next steps you can trust</div></section>

      <section className="features-section" id="features"><div className="page-container"><div className="section-heading"><div><span className="section-kicker">LESS GUESSING, MORE KNOWING</span><h2>Make customer feedback<br />your clearest signal.</h2></div><p>CommentIQ helps you move from a mountain of comments to the handful of insights your team can act on.</p></div><div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className={`feature-icon ${feature.className}`}>{feature.icon}</div><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.description}</p><a href="#get-started" aria-label={`Learn more: ${feature.title}`}><ArrowUpRight /></a></article>)}</div></div></section>

      <section className="how-section page-container" id="how-it-works"><div className="how-copy"><span className="section-kicker">A SIMPLE PLACE TO START</span><h2>From comments to clarity in three steps.</h2><p>No complicated setup. Bring the feedback you already have, and let CommentIQ help you make sense of it.</p><a href="#get-started" className="text-link how-link">See what your feedback is saying <ArrowUpRight /></a></div><div className="steps-list"><article><span className="step-number">1</span><div><h3>Bring your comments</h3><p>Upload a CSV of reviews and feedback. Your data stays organized in its own dataset.</p></div><span className="step-graphic upload-graphic">↑</span></article><article><span className="step-number">2</span><div><h3>Let patterns emerge</h3><p>See sentiment, language, and recurring topics without reading every comment.</p></div><span className="step-graphic pattern-graphic">✳</span></article><article><span className="step-number">3</span><div><h3>Choose your next move</h3><p>Explore the comments behind each trend and bring the clearest signals to your team.</p></div><span className="step-graphic move-graphic">↗</span></article></div></section>

      <section className="pricing-section" id="pricing"><div className="page-container"><div className="pricing-heading"><span className="section-kicker">SIMPLE PLANS, ROOM TO GROW</span><h2>Start small. Find your signal.</h2><p>Choose the monthly feedback volume that fits your team today.</p></div><div className="pricing-grid">{plans.map((plan) => <article className={`pricing-card${plan.recommended ? " recommended" : ""}`} key={plan.name}>{plan.recommended && <div className="recommended-ribbon">RECOMMENDED</div>}<div className="pricing-card-top"><div><h3>{plan.name}</h3><p>{plan.description}</p></div><div className="plan-price"><strong>{plan.price}</strong><span>/ month</span></div></div><a className={`plan-button${plan.recommended ? " plan-button-primary" : ""}`} href="#get-started">{plan.name === "Free" ? "Get started" : `Choose ${plan.name}`} <ArrowUpRight /></a><div className="plan-divider" /><span className="included-label">WHAT’S INCLUDED</span><ul>{plan.features.map((item) => <li key={item}><span className="checkmark">✓</span>{item}</li>)}</ul><p className="plan-audience">{plan.audience}</p></article>)}</div><p className="pricing-footnote">All plans are billed monthly in INR. Comment counts reset each month.</p></div></section>

      <section className="final-cta page-container" id="get-started"><div className="cta-spark"><Sparkle /></div><span className="section-kicker">YOUR CUSTOMERS ARE ALREADY TALKING</span><h2>Make sure you hear what matters.</h2><p>Start turning customer feedback into a better next decision.</p><a className="button button-dark button-large" href="mailto:hello@commentiq.app?subject=CommentIQ%20early%20access">Get early access <ArrowUpRight /></a><small>Thoughtful feedback intelligence, starting with your CSVs.</small></section>

      <footer className="site-footer page-container"><a className="brand footer-brand" href="#top"><BrandMark /><span>comment<span>IQ</span></span></a><span>Make feedback useful.</span><span>© 2025 CommentIQ</span></footer>
    </main>
  );
}
