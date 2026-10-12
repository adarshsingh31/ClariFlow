import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const SVG_ICONS = {
  home: <path d="M3 11l9-8 9 8v10H3z" />,
  flow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h4a2 2 0 012 2v7" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  spark: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  plug: (
    <>
      <path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 01-12 0zM12 17v5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6M17 4.5a3.5 3.5 0 010 7M22 21c0-3-1.5-5-4-5.8" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  hex: <path d="M12 2l9 5v10l-9 5-9-5V7z" />,
  tri: <path d="M12 3l10 18H2z" />,
  circ: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sq: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 12h16" />
    </>
  ),
}

function SvgIcon({ name, style, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`landing-svg-i ${className}`} style={style}>
      {SVG_ICONS[name] || null}
    </svg>
  )
}

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dashActive, setDashActive] = useState(false)

  // Animated stat counters
  const [statWorkflows, setStatWorkflows] = useState(0)
  const [statRate, setStatRate] = useState(0)
  const [statTasks, setStatTasks] = useState(0)
  const [statSaved, setStatSaved] = useState(0)

  const dashWrapRef = useRef(null)

  useEffect(() => {
    document.title = 'GhostFilter — Turn complex workflows into simple actions'

    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reveal elements on intersection + Trigger dashboard counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')

            if (entry.target === dashWrapRef.current) {
              setDashActive(true)
              // Animate numbers
              animateCount(24, setStatWorkflows, 1200)
              animateCount(87, setStatRate, 1200)
              animateCount(142, setStatTasks, 1200)
              animateCount(12, setStatSaved, 1200)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const revealElements = document.querySelectorAll('.landing-rv')
    revealElements.forEach((el, i) => {
      if (el.classList.contains('landing-fc')) {
        el.style.transitionDelay = `${(i % 3) * 80}ms`
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function animateCount(target, setter, duration = 1200) {
    const start = performance.now()
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setter(Math.round(target * ease))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div className="landing-root">
      {/* Header */}
      <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-wrap landing-nav">
          <Link to="/" className="landing-logo">
            <span className="landing-mark"></span>
            GhostFilter
          </Link>
          <nav className="landing-links">
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#solutions">Solutions</a>
            <a href="#pricing">Pricing</a>
            <a href="#resources">Resources</a>
          </nav>
          <div className="landing-actions">
            <Link to="/app" className="login">Log in</Link>
            <Link to="/app" className="landing-btn primary">Get Started</Link>
            <button
              className="landing-burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg className="landing-svg-i" viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`landing-mobile ${mobileOpen ? 'open' : ''}`}>
          <a href="#product" onClick={() => setMobileOpen(false)}>Product</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#solutions" onClick={() => setMobileOpen(false)}>Solutions</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#resources" onClick={() => setMobileOpen(false)}>Resources</a>
          <Link to="/app" onClick={() => setMobileOpen(false)}>Log in</Link>
          <Link to="/app" className="landing-btn primary" onClick={() => setMobileOpen(false)}>Get Started</Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="landing-hero" id="product">
          <div className="landing-hero-bg">
            <div className="landing-grid"></div>
            <div className="landing-orb landing-o1"></div>
            <div className="landing-orb landing-o2"></div>
          </div>
          <div className="landing-wrap">
            <span className="landing-badge">
              <span className="landing-dot"></span>
              AI-powered workflow automation
            </span>
            <h1>Turn complex workflows into simple actions.</h1>
            <p className="landing-lead">
              GhostFilter brings AI, automation, and intelligent workflows together so your team can move from idea to execution faster.
            </p>
            <div className="landing-cta">
              <Link to="/app" className="landing-btn primary lg">
                Get Started Free{' '}
                <svg className="landing-svg-i" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a href="#features" className="landing-btn lg">
                Explore GhostFilter
              </a>
            </div>

            {/* Interactive Dashboard Mockup */}
            <div ref={dashWrapRef} className="landing-dash-wrap landing-rv">
              <div className={`landing-dash ${dashActive ? 'in' : ''}`}>
                <aside className="landing-side">
                  <div className="landing-logo">
                    <span className="landing-mark"></span>
                    GhostFilter
                  </div>
                  <a className="on"><SvgIcon name="home" />Overview</a>
                  <a><SvgIcon name="flow" />Workflows</a>
                  <a><SvgIcon name="check" />Tasks</a>
                  <a><SvgIcon name="spark" />Assistant</a>
                  <a><SvgIcon name="chart" />Insights</a>
                  <a><SvgIcon name="plug" />Integrations</a>
                  <span className="sp"></span>
                  <a><SvgIcon name="gear" />Settings</a>
                </aside>
                <div className="landing-dash-main">
                  <div className="landing-top">
                    <div>
                      <h4>Workflow overview</h4>
                      <small>Good morning — everything is running smoothly</small>
                    </div>
                    <div className="landing-bell">
                      <SvgIcon name="bell" />
                    </div>
                  </div>
                  <div className="landing-stats">
                    <div className="landing-card landing-stat">
                      <span>Active workflows</span>
                      <em>+3</em>
                      <b>{statWorkflows}</b>
                    </div>
                    <div className="landing-card landing-stat">
                      <span>Automation rate</span>
                      <em>+5%</em>
                      <b>{statRate}%</b>
                    </div>
                    <div className="landing-card landing-stat">
                      <span>Tasks completed</span>
                      <em>+18</em>
                      <b>{statTasks}</b>
                    </div>
                    <div className="landing-card landing-stat">
                      <span>Saved this week</span>
                      <em>+2h</em>
                      <b>{statSaved}h</b>
                    </div>
                  </div>
                  <div className="landing-cols">
                    <div className="landing-card">
                      <h5>
                        Active workflows{' '}
                        <span style={{ textTransform: 'none', letterSpacing: 0 }}>
                          4 of 24
                        </span>
                      </h5>
                      <div className="landing-wf">
                        <div className="n">
                          <div>Customer onboarding</div>
                          <small>Sales → CS handoff</small>
                          <div className="landing-bar">
                            <i style={{ width: dashActive ? '82%' : '0%' }}></i>
                          </div>
                        </div>
                        <span className="landing-pill run">Running</span>
                      </div>
                      <div className="landing-wf">
                        <div className="n">
                          <div>Invoice approval</div>
                          <small>Finance · 3 steps</small>
                          <div className="landing-bar">
                            <i style={{ width: dashActive ? '55%' : '0%' }}></i>
                          </div>
                        </div>
                        <span className="landing-pill rev">In review</span>
                      </div>
                      <div className="landing-wf">
                        <div className="n">
                          <div>Support triage</div>
                          <small>AI classifies incoming tickets</small>
                          <div className="landing-bar">
                            <i style={{ width: dashActive ? '94%' : '0%' }}></i>
                          </div>
                        </div>
                        <span className="landing-pill run">Running</span>
                      </div>
                      <div className="landing-wf">
                        <div className="n">
                          <div>Weekly reporting</div>
                          <small>Scheduled · Mon 9:00</small>
                          <div className="landing-bar">
                            <i style={{ width: dashActive ? '12%' : '0%' }}></i>
                          </div>
                        </div>
                        <span className="landing-pill q">Queued</span>
                      </div>
                    </div>
                    <div className="landing-card landing-ai">
                      <h5>
                        AI assistant{' '}
                        <SvgIcon
                          name="spark"
                          style={{ color: 'var(--lp-accent)', width: 14, height: 14 }}
                        />
                      </h5>
                      <div className="landing-msg me">Which workflows are slowing us down?</div>
                      <div className="landing-msg">
                        Invoice approval waits ~6h on one step. I can auto-route amounts under $500 and save about 4h weekly.
                      </div>
                      <div className="landing-think">
                        <s>
                          <i></i>
                          <i></i>
                          <i></i>
                        </s>
                        Drafting the automation
                      </div>
                    </div>
                  </div>
                  <div className="landing-cols2">
                    <div className="landing-card">
                      <h5>Tasks completed · 7 days</h5>
                      <svg className="landing-ch" viewBox="0 0 400 96" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#7f8cff" stopOpacity="0.28" />
                            <stop offset="1" stopColor="#7f8cff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 78 C40 70 60 52 100 56 S160 30 200 38 S270 62 310 30 S370 14 400 10 V96 H0Z"
                          fill="url(#g)"
                        />
                        <path
                          className="l"
                          d="M0 78 C40 70 60 52 100 56 S160 30 200 38 S270 62 310 30 S370 14 400 10"
                        />
                      </svg>
                    </div>
                    <div className="landing-card">
                      <h5>Recent activity</h5>
                      <div className="landing-act">
                        <i></i>Support triage routed 12 tickets<small>2m</small>
                      </div>
                      <div className="landing-act">
                        <i></i>Onboarding flow completed for Acme<small>14m</small>
                      </div>
                      <div className="landing-act">
                        <i></i>Report generated automatically<small>1h</small>
                      </div>
                      <div className="landing-toast">
                        <SvgIcon name="check" />
                        Invoice #2041 approved by AI rule
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Trust Section */}
        <section className="landing-trust" id="solutions">
          <div className="landing-wrap">
            <p>Built for teams that move fast.</p>
            <div className="landing-logos">
              <span><SvgIcon name="hex" />Northwind</span>
              <span><SvgIcon name="tri" />Vertex Labs</span>
              <span><SvgIcon name="circ" />Orbital</span>
              <span><SvgIcon name="sq" />Lumen</span>
              <span><SvgIcon name="hex" />Kepler</span>
              <span><SvgIcon name="tri" />Parallel</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="landing-f" id="features">
          <div className="landing-wrap">
            <h2 className="landing-rv">Everything your workflow needs.</h2>
            <p className="landing-sub landing-rv">
              One platform to design, automate, and monitor the work your team does every day.
            </p>
            <div className="landing-fg">
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="spark" /></div>
                <h3>AI Automation</h3>
                <p>Automate repetitive work with intelligent AI-powered workflows.</p>
              </div>
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="flow" /></div>
                <h3>Smart Workflows</h3>
                <p>Build powerful workflows without unnecessary complexity.</p>
              </div>
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="chart" /></div>
                <h3>Real-time Intelligence</h3>
                <p>Understand what is happening across your work as it happens, with live insights and clear signals.</p>
              </div>
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="plug" /></div>
                <h3>Seamless Integrations</h3>
                <p>Connect the tools your team already uses and let data flow between them automatically.</p>
              </div>
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="users" /></div>
                <h3>Team Collaboration</h3>
                <p>Share workflows, assign tasks, and keep everyone aligned in one place.</p>
              </div>
              <div className="landing-fc landing-rv" onPointerMove={handleCardMouseMove}>
                <div className="landing-ic"><SvgIcon name="lock" /></div>
                <h3>Secure by Design</h3>
                <p>Role-based access, audit logs, and encryption so your team can rely on every run.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action Section */}
        <section id="pricing">
          <div className="landing-wrap">
            <div className="landing-cta2 landing-rv">
              <h2>Move from idea to execution faster.</h2>
              <p>Start free. Build your first workflow in minutes.</p>
              <Link to="/app" className="landing-btn primary lg">
                Get Started Free <SvgIcon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer" id="resources">
        <div className="landing-wrap">
          <span>© 2026 GhostFilter. All rights reserved.</span>
          <nav>
            <a href="#">Docs</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Status</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
