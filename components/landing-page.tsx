'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  MapPin,
  Menu,
  Radio,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from 'lucide-react'

const capabilities = [
  { icon: Users, title: 'Guard workforce', text: 'Centralize staff records, certifications, availability, and deployment readiness in one directory.' },
  { icon: MapPin, title: 'Sites & deployments', text: 'Assign teams to client sites and keep every post covered before a shift starts.' },
  { icon: ClipboardCheck, title: 'Compliance control', text: 'Track training, expiry dates, leave, overtime, and replacement requests without chasing spreadsheets.' },
]

const steps = [
  { n: '01', title: 'See the operation', text: 'Coverage, incidents, and attendance land in one command view so supervisors start the day informed.' },
  { n: '02', title: 'Fill the gaps', text: 'Spot uncovered posts, expiring certs, and replacement needs before they become client issues.' },
  { n: '03', title: 'Report with proof', text: 'Turn live operations into client-ready summaries without rebuilding the same weekly pack.' },
]

const sites = ['Airport Ridge', 'Meridian Plaza', 'North Industrial', 'Harbour View']

const roles = [
  { icon: UserRound, title: 'Operations managers', text: 'Watch coverage, attendance, and incidents across every client in one workspace instead of waiting on end-of-shift calls.' },
  { icon: ShieldCheck, title: 'Site supervisors', text: 'Confirm who is on post, log replacements, and escalate issues before a client walks the perimeter.' },
  { icon: FileText, title: 'Client leads', text: 'Send weekly summaries that already include coverage, incidents, and training status — no extra pack to assemble.' },
]

const modules = [
  { icon: AlertTriangle, title: 'Incident desk', text: 'Capture reports, assign owners, and keep high-priority events visible until they close.' },
  { icon: Clock3, title: 'Attendance & shifts', text: 'See clock-ins, leave, overtime, and uncovered windows as they happen.' },
  { icon: CalendarDays, title: 'Rosters', text: 'Publish day and night deployments so every post has a named guard.' },
  { icon: ClipboardCheck, title: 'Training records', text: 'Flag expiring first aid, induction, and site-specific certifications early.' },
  { icon: FileText, title: 'Client reports', text: 'Generate coverage and incident packs without rebuilding the same weekly template.' },
  { icon: BarChart3, title: 'Performance', text: 'Track coverage rate, response time, and compliance against the targets you set.' },
]

const shiftBeats = [
  { time: '05:40', title: 'Dawn handover', text: 'Night team clocks out. Open posts and overnight incidents are already on the command view.' },
  { time: '06:15', title: 'Coverage check', text: 'Airport Ridge is fully staffed. Meridian Plaza is two posts short — a replacement is requested.' },
  { time: '12:08', title: 'Incident logged', text: 'A perimeter breach at Meridian Plaza is assigned to a supervisor with a live timestamp.' },
  { time: '18:00', title: 'Night roster live', text: 'Harbour View still needs cover. The team sees it before the night window starts.' },
]

const coverageRows = [
  { site: 'Airport Ridge', posts: '24/24', next: '06:00–18:00', status: 'Covered', tone: 'green' },
  { site: 'Meridian Plaza', posts: '18/20', next: '07:00–19:00', status: 'At risk', tone: 'amber' },
  { site: 'North Industrial', posts: '12/12', next: '18:00–06:00', status: 'Covered', tone: 'green' },
  { site: 'Harbour View', posts: '8/10', next: '18:00–06:00', status: 'Replacement', tone: 'red' },
]

const quotes = [
  { quote: 'I used to start every morning on WhatsApp. Now I open the command center and I already know which site is short.', name: 'Sarah Addo', role: 'Site supervisor, Meridian Plaza' },
  { quote: 'Client reports used to take Friday afternoon. The coverage and incident numbers are already in the platform.', name: 'Joseph Mensah', role: 'Operations manager, Accra' },
]

const faqs = [
  { q: 'Who is this built for?', a: 'Arc Consult Security teams running multi-site guard deployments in Ghana — operations managers, supervisors, and client leads who need one operating picture.' },
  { q: 'Does it replace the roster spreadsheet?', a: 'It is designed to. Workforce, sites, attendance, incidents, and weekly client packs live in the same workspace so the sheet is no longer the source of truth.' },
  { q: 'Can supervisors use it on a phone?', a: 'Yes. The command center collapses to a mobile layout with a slide-out operations menu for checks on site.' },
  { q: 'What data is shown today?', a: 'The current build is an operations preview with live-style sample data across four Accra client sites, so teams can walk the full workflow before connecting production records.' },
]

const navLinks = [
  { href: '#platform', label: 'Platform' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#coverage', label: 'Coverage' },
  { href: '#contact', label: 'Contact' },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const onContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link href="/" className="landing-brand">
          <span className="landing-brand-mark"><ShieldCheck /></span>
          <span>ARC<span>CONSULT</span><small>SECURITY OPERATIONS</small></span>
        </Link>
        <div className="landing-links">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <Link href="/dashboard" className="landing-nav-cta">Open dashboard <ArrowRight /></Link>
        <button className="landing-menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
      </nav>

      {menuOpen && (
        <div className="landing-drawer" role="dialog" aria-label="Mobile menu">
          <div className="landing-drawer-head">
            <span>Menu</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <Link href="/dashboard" className="landing-primary" onClick={() => setMenuOpen(false)}>Open dashboard <ArrowRight /></Link>
        </div>
      )}

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="landing-kicker"><span className="live-dot" /> Security workforce operations</div>
          <h1>Make every deployment <em>count.</em></h1>
          <p className="landing-lede">A clear command center for the people, sites, and decisions behind security coverage across Ghana.</p>
          <div className="landing-actions">
            <Link href="/dashboard" className="landing-primary">Explore the platform <ArrowRight /></Link>
            <a href="#capabilities" className="landing-secondary">See how it works</a>
          </div>
          <div className="landing-proof">
            <span><CheckCircle2 /> 96.4% coverage today</span>
            <span><CheckCircle2 /> 184 active guards</span>
            <span><CheckCircle2 /> Live incident oversight</span>
          </div>
        </div>

        <div className="landing-visual" id="platform" aria-label="Operations command center preview">
          <div className="visual-glow" />
          <div className="visual-window">
            <div className="visual-bar">
              <span /><span /><span />
              <b>ARC / COMMAND CENTER</b>
            </div>
            <div className="visual-body">
              <div className="visual-side" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <div className="visual-main">
                <small>Monday, 5 October 2026</small>
                <h3>Good morning, Joseph</h3>
                <div className="visual-metrics">
                  <strong>184<small>Active guards</small></strong>
                  <strong>96.4%<small>Coverage today</small></strong>
                  <strong>07<small>Open incidents</small></strong>
                </div>
                <div className="visual-chart" aria-hidden="true">
                  <div className="chart-line" />
                  <div className="chart-line faint" />
                  <svg viewBox="0 0 320 80" preserveAspectRatio="none"><path d="M0 48 C40 40, 70 52, 100 34 S160 18, 200 28 S260 12, 320 16" fill="none" stroke="#56d2b0" strokeWidth="3" /></svg>
                </div>
                <div className="visual-row">
                  <span>Today&apos;s deployment schedule</span>
                  <b><Radio /> LIVE</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats" aria-label="Operational snapshot">
        <div><strong>4</strong><span>Active client sites</span></div>
        <div><strong>24/7</strong><span>Shift coverage window</span></div>
        <div><strong>8 min</strong><span>Average incident response</span></div>
        <div><strong>87%</strong><span>Training compliance</span></div>
      </section>

      <section className="landing-roles" id="roles">
        <div className="section-intro center">
          <div className="landing-kicker">Who it serves</div>
          <h2>The people who keep<br />the posts <em>covered.</em></h2>
          <p>Each role sees the same operation, with the tools they need at the start of a shift.</p>
        </div>
        <div className="role-grid">
          {roles.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <div className="capability-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-steps">
        <div className="section-intro">
          <div className="landing-kicker">How teams use it</div>
          <h2>From morning brief<br />to <em>client report.</em></h2>
          <p>Built for supervisors who cannot wait on a spreadsheet to tell them who is on post.</p>
        </div>
        <ol className="steps-grid">
          {steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-capabilities" id="capabilities">
        <div className="section-intro">
          <div className="landing-kicker">One operating picture</div>
          <h2>Built for the pace of<br /><em>real operations.</em></h2>
          <p>Arc Consult Security teams get the context to act faster, protect clients better, and keep standards high.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article className="capability-card" key={title}>
              <div className="capability-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowRight />
            </article>
          ))}
        </div>
      </section>

      <section className="landing-modules">
        <div className="section-intro center">
          <div className="landing-kicker">The operating stack</div>
          <h2>Everything a shift<br />needs to <em>stay tight.</em></h2>
          <p>Workforce, sites, incidents, and reports sit together so nothing depends on a side chat.</p>
        </div>
        <div className="module-grid">
          {modules.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <div className="capability-icon"><Icon /></div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-shift">
        <div className="section-intro">
          <div className="landing-kicker">A typical day</div>
          <h2>The operation does not<br />wait for a <em>status meeting.</em></h2>
          <p>From dawn handover to night roster, the command center keeps the next decision in view.</p>
        </div>
        <ol className="shift-timeline">
          {shiftBeats.map((beat) => (
            <li key={beat.time}>
              <time>{beat.time}</time>
              <div>
                <h3>{beat.title}</h3>
                <p>{beat.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-coverage" id="coverage">
        <div className="coverage-copy">
          <div className="landing-kicker">Live coverage</div>
          <h2>Know which site is<br /><em>short</em> before the shift starts.</h2>
          <p>Posts, next windows, and replacement status for every client site — the same picture supervisors open in the dashboard.</p>
          <ul>
            {sites.map((site) => <li key={site}><MapPin />{site}</li>)}
          </ul>
        </div>
        <div className="coverage-board" aria-label="Site coverage board">
          <div className="coverage-board-head">
            <span>Site coverage</span>
            <b><Radio /> Live</b>
          </div>
          <table>
            <thead>
              <tr><th>Client site</th><th>Posts</th><th>Next shift</th><th>Status</th></tr>
            </thead>
            <tbody>
              {coverageRows.map((row) => (
                <tr key={row.site}>
                  <td><strong>{row.site}</strong></td>
                  <td>{row.posts}</td>
                  <td>{row.next}</td>
                  <td><span className={`status-pill ${row.tone}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="landing-quotes">
        <div className="section-intro center">
          <div className="landing-kicker">From the floor</div>
          <h2>Supervisors want the picture,<br />not another <em>spreadsheet.</em></h2>
        </div>
        <div className="quote-grid">
          {quotes.map((item) => (
            <blockquote key={item.name}>
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="landing-faq" id="faq">
        <div className="section-intro">
          <div className="landing-kicker">Questions</div>
          <h2>What teams ask<br />before they <em>switch.</em></h2>
          <p>A short briefing on who the platform is for and what this preview includes.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="landing-cta landing-contact" id="contact">
        <div>
          <div className="landing-kicker">Ready when you are</div>
          <h2>Put your operation<br />in the <em>clear.</em></h2>
          <p>Walk the command center with sample Accra sites, or leave a note for the operations team.</p>
          <Link href="/dashboard" className="landing-primary">Enter command center <ArrowRight /></Link>
        </div>
        {sent ? (
          <p className="contact-thanks">Message received. The operations team will follow up.</p>
        ) : (
          <form className="contact-form" onSubmit={onContact}>
            <label>Name<input name="name" required autoComplete="name" /></label>
            <label>Organisation<input name="org" required autoComplete="organization" /></label>
            <label>How can we help?<textarea name="message" rows={4} required /></label>
            <button type="submit" className="landing-primary">Send note <ArrowRight /></button>
          </form>
        )}
      </section>

      <footer className="landing-footer">
        <span>© 2026 Arc Consult Security Ghana</span>
        <span>Workforce operations, made visible.</span>
      </footer>
    </main>
  )
}
