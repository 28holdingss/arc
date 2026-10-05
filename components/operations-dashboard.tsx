'use client'

import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileText,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Users,
  UserRound,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Command center', icon: LayoutDashboard },
  { label: 'Guard workforce', icon: Users },
  { label: 'Sites & deployments', icon: MapPin },
  { label: 'Attendance & shifts', icon: Clock3 },
  { label: 'Incidents', icon: AlertTriangle, count: 3 },
  { label: 'Training & compliance', icon: ClipboardCheck },
  { label: 'Client reports', icon: FileText },
]

const shifts = [
  { guard: 'Kwame Mensah', initials: 'KM', site: 'Airport Ridge', shift: '06:00 – 18:00', status: 'On site', tone: 'green' },
  { guard: 'Akosua Boateng', initials: 'AB', site: 'Meridian Plaza', shift: '07:00 – 19:00', status: 'On site', tone: 'green' },
  { guard: 'Yaw Owusu', initials: 'YO', site: 'North Industrial', shift: '18:00 – 06:00', status: 'Scheduled', tone: 'amber' },
  { guard: 'Nana Asare', initials: 'NA', site: 'Harbour View', shift: '18:00 – 06:00', status: 'Replacement needed', tone: 'red' },
]

const incidents = [
  { title: 'Perimeter breach reported', site: 'Meridian Plaza', time: '12 min ago', priority: 'High', tone: 'red' },
  { title: 'Access badge mismatch', site: 'Airport Ridge', time: '48 min ago', priority: 'Medium', tone: 'amber' },
  { title: 'Medical assistance requested', site: 'Harbour View', time: '2 hrs ago', priority: 'Low', tone: 'blue' },
]

const coverageByRange: Record<string, { current: string; path: string }> = {
  'This week': { current: '96.4%', path: 'M0 88 C55 76, 74 92, 110 72 S175 48, 220 62 S275 85, 330 64 S390 40, 440 51 S500 32, 550 45 S630 28, 700 36' },
  'Last week': { current: '94.8%', path: 'M0 102 C55 90, 74 110, 110 86 S175 70, 220 78 S275 96, 330 82 S390 58, 440 66 S500 50, 550 62 S630 44, 700 52' },
  'This month': { current: '95.7%', path: 'M0 94 C55 80, 74 98, 110 76 S175 54, 220 68 S275 90, 330 70 S390 48, 440 58 S500 40, 550 50 S630 34, 700 42' },
}

function StatusPill({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={`status-pill ${tone}`}>{children}</span>
}

const pageContent: Record<string, { eyebrow: string; title: string; description: string; action: string; columns: string[]; rows: string[][] }> = {
  'Guard workforce': { eyebrow: 'Workforce directory', title: 'Guard workforce', description: 'Manage personnel records, roles, availability and deployment readiness.', action: 'Add guard', columns: ['Guard', 'Role', 'Primary site', 'Status', 'Compliance'], rows: [['Kwame Mensah', 'Senior guard', 'Airport Ridge', 'Active', 'Current'], ['Akosua Boateng', 'Guard', 'Meridian Plaza', 'Active', 'Current'], ['Yaw Owusu', 'Guard', 'North Industrial', 'Available', 'Expiring soon'], ['Nana Asare', 'Relief guard', 'Harbour View', 'On leave', 'Current']] },
  'Sites & deployments': { eyebrow: 'Deployment control', title: 'Sites & deployments', description: 'Coordinate client coverage, post assignments and shift handovers.', action: 'New deployment', columns: ['Client site', 'Coverage', 'Next shift', 'Supervisor', 'Status'], rows: [['Airport Ridge', '24 / 24 posts', '06:00 – 18:00', 'K. Mensah', 'Covered'], ['Meridian Plaza', '18 / 20 posts', '07:00 – 19:00', 'A. Boateng', 'At risk'], ['North Industrial', '12 / 12 posts', '18:00 – 06:00', 'Y. Owusu', 'Covered'], ['Harbour View', '8 / 10 posts', '18:00 – 06:00', 'N. Asare', 'Replacement']] },
  'Attendance & shifts': { eyebrow: 'Time & attendance', title: 'Attendance & shifts', description: 'Track clock-ins, shift completion, leave requests and overtime.', action: 'Record attendance', columns: ['Guard', 'Shift', 'Clock-in', 'Clock-out', 'Status'], rows: [['Kwame Mensah', 'Airport Ridge · Day', '05:52', '18:04', 'Complete'], ['Akosua Boateng', 'Meridian Plaza · Day', '06:54', '—', 'On shift'], ['Yaw Owusu', 'North Industrial · Night', '—', '—', 'Scheduled'], ['Nana Asare', 'Harbour View · Night', '—', '—', 'Leave']] },
  'Incidents': { eyebrow: 'Risk & escalation', title: 'Incident management', description: 'Review reports, assign owners and keep supervisors informed.', action: 'Log incident', columns: ['Incident', 'Site', 'Reported', 'Priority', 'Owner'], rows: [['Perimeter breach reported', 'Meridian Plaza', '12 min ago', 'High', 'S. Addo'], ['Access badge mismatch', 'Airport Ridge', '48 min ago', 'Medium', 'J. Mensah'], ['Medical assistance requested', 'Harbour View', '2 hrs ago', 'Low', 'K. Ofori'], ['Patrol checkpoint missed', 'North Industrial', 'Yesterday', 'Medium', 'S. Addo']] },
  'Training & compliance': { eyebrow: 'Readiness & standards', title: 'Training & compliance', description: 'Keep certifications, inductions and refresher training up to date.', action: 'Add training record', columns: ['Guard', 'Certification', 'Expiry', 'Progress', 'Status'], rows: [['Kwame Mensah', 'First aid level 2', '18 Nov 2024', '100%', 'Compliant'], ['Akosua Boateng', 'Site induction', '24 Oct 2024', '100%', 'Expiring soon'], ['Yaw Owusu', 'Fire safety', '04 Dec 2024', '80%', 'In progress'], ['Nana Asare', 'Crowd control', '12 Oct 2024', '100%', 'Overdue']] },
  'Client reports': { eyebrow: 'Client service', title: 'Client reports', description: 'Create clear operational summaries for every client site.', action: 'Generate report', columns: ['Report', 'Client', 'Period', 'Prepared by', 'Status'], rows: [['Weekly security summary', 'Meridian Plaza', '07–13 Oct', 'Joseph Mensah', 'Ready'], ['Coverage & attendance', 'Airport Ridge', '07–13 Oct', 'Joseph Mensah', 'Ready'], ['Incident register', 'Harbour View', '01–14 Oct', 'Sarah Addo', 'Draft'], ['Monthly performance review', 'North Industrial', 'September', 'Joseph Mensah', 'Scheduled']] },
  'Performance': { eyebrow: 'Management intelligence', title: 'Performance', description: 'Measure coverage quality, response times and workforce performance.', action: 'Export performance', columns: ['Metric', 'Area', 'Current', 'Target', 'Status'], rows: [['Coverage rate', 'All sites', '96.4%', '95%', 'On track'], ['Attendance rate', 'Workforce', '98.1%', '97%', 'On track'], ['Incident response', 'All sites', '8 min', '10 min', 'On track'], ['Training compliance', 'Workforce', '87%', '95%', 'Needs review']] },
  'Schedules': { eyebrow: 'Planning & rosters', title: 'Schedules', description: 'Plan upcoming shifts and keep every client post covered.', action: 'Create schedule', columns: ['Date', 'Site', 'Shift window', 'Guards', 'Status'], rows: [['14 Oct 2024', 'Airport Ridge', '06:00 – 18:00', '24 / 24', 'Published'], ['14 Oct 2024', 'Meridian Plaza', '07:00 – 19:00', '18 / 20', 'Needs cover'], ['15 Oct 2024', 'North Industrial', '18:00 – 06:00', '12 / 12', 'Published'], ['15 Oct 2024', 'Harbour View', '18:00 – 06:00', '8 / 10', 'Draft']] },
}

function pillTone(cell: string) {
  const value = cell.toLowerCase()
  if (value.includes('risk') || value.includes('overdue') || value.includes('replacement') || value === 'high') return 'red'
  if (value.includes('soon') || value.includes('draft') || value.includes('leave') || value.includes('review') || value === 'medium' || value.includes('progress') || value.includes('cover')) return 'amber'
  if (value === 'low') return 'blue'
  return 'green'
}

function OperationsSection({
  section,
  query,
  onNavigate,
}: {
  section: typeof pageContent[string]
  query: string
  onNavigate: (label: string) => void
}) {
  const rows = section.rows.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{section.eyebrow} <span className="live-dot" /> Live data</div>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
        <button className="primary-button" type="button"><FileText /> {section.action} <ArrowUpRight /></button>
      </div>
      <section className="metric-grid">
        <div className="metric-card accent-blue"><div className="metric-top"><span>Total records</span><div className="metric-icon"><Users /></div></div><strong>{section.rows.length.toString().padStart(2, '0')}</strong><div className="metric-bottom"><span className="trend positive">+12.4%</span><span>vs last period</span></div></div>
        <div className="metric-card accent-green"><div className="metric-top"><span>On track</span><div className="metric-icon"><ShieldCheck /></div></div><strong>96<span className="metric-unit">%</span></strong><div className="metric-bottom"><span className="trend positive">+2.1%</span><span>current rate</span></div></div>
        <div className="metric-card accent-amber"><div className="metric-top"><span>Needs attention</span><div className="metric-icon"><AlertTriangle /></div></div><strong>07</strong><div className="metric-bottom"><span className="trend warning">3 priority</span><span>needs review</span></div></div>
        <div className="metric-card accent-violet"><div className="metric-top"><span>Updated today</span><div className="metric-icon"><Clock3 /></div></div><strong>24</strong><div className="metric-bottom"><span className="trend positive">Live</span><span>across operations</span></div></div>
      </section>
      <section className="panel shifts-panel">
        <div className="panel-header">
          <div>
            <h2>Operational records</h2>
            <p>{rows.length} {rows.length === 1 ? 'match' : 'matches'} across Arc Consult Ghana</p>
          </div>
          <button className="outline-button" type="button"><Search /> Filter records</button>
        </div>
        <div className="table-wrap">
          {rows.length === 0 ? (
            <p className="empty-state">No records match “{query}”.</p>
          ) : (
            <table>
              <thead>
                <tr>{section.columns.map((column) => <th key={column}>{column}</th>)}<th><span className="sr-only">Actions</span></th></tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${cell}`}>
                        {index === 0 ? <strong>{cell}</strong> : index === row.length - 1 ? <StatusPill tone={pillTone(cell)}>{cell}</StatusPill> : cell}
                      </td>
                    ))}
                    <td><button className="row-menu" aria-label={`More actions for ${row[0]}`}><MoreHorizontal /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <div className="bottom-grid">
        <div className="panel progress-panel">
          <div className="panel-header"><div><h2>Workflow health</h2><p>Operational completion across this area</p></div></div>
          <div className="progress-stat"><strong>87%</strong><span>records up to date</span></div>
          <div className="progress-track"><div /></div>
          <div className="progress-items">
            <span><i className="progress-good" /> 160 current</span>
            <span><i className="progress-pending" /> 18 due soon</span>
            <span><i className="progress-bad" /> 6 overdue</span>
          </div>
        </div>
        <div className="panel quick-panel">
          <div className="panel-header"><div><h2>Quick actions</h2><p>Jump to common tasks</p></div></div>
          <div className="quick-actions">
            <button type="button" onClick={() => onNavigate('Client reports')}><FileText /><span>Export records</span><ArrowUpRight /></button>
            <button type="button" onClick={() => onNavigate('Schedules')}><CalendarDays /><span>View schedule</span><ArrowUpRight /></button>
            <button type="button" onClick={() => onNavigate('Incidents')}><Bell /><span>Notify supervisor</span><ArrowUpRight /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function OperationsDashboard() {
  const [activeNav, setActiveNav] = useState('Command center')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [range, setRange] = useState('This week')
  const [query, setQuery] = useState('')

  const coverage = coverageByRange[range] ?? coverageByRange['This week']
  const filteredShifts = useMemo(
    () => shifts.filter((shift) => `${shift.guard} ${shift.site} ${shift.status}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )
  const filteredIncidents = useMemo(
    () => incidents.filter((incident) => `${incident.title} ${incident.site}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const goTo = (label: string) => {
    setActiveNav(label)
    setMobileOpen(false)
  }

  return (
    <div className="app-shell">
      {mobileOpen && <button className="nav-overlay" aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <Link href="/" className="brand-link" aria-label="Back to Arc Consult home">
            <div className="brand-mark"><ShieldCheck /></div>
            <div>
              <div className="brand-name">ARC<span>CONSULT</span></div>
              <div className="brand-subtitle">Security operations</div>
            </div>
          </Link>
          <button className="close-menu" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X /></button>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-icon">A</div>
          <div><strong>Arc Consult Ghana</strong><span>Operations workspace</span></div>
          <ChevronDown />
        </div>
        <div className="nav-section-label">Operations</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => goTo(label)}>
              <Icon /><span>{label}</span>{count ? <b>{count}</b> : null}
            </button>
          ))}
        </nav>
        <div className="nav-section-label secondary-label">Administration</div>
        <nav className="nav-list">
          <button className={`nav-item ${activeNav === 'Performance' ? 'active' : ''}`} onClick={() => goTo('Performance')}><BarChart3 /><span>Performance</span></button>
          <button className={`nav-item ${activeNav === 'Schedules' ? 'active' : ''}`} onClick={() => goTo('Schedules')}><CalendarDays /><span>Schedules</span></button>
        </nav>
        <div className="sidebar-footer">
          <div className="system-status"><div className="online-dot" /> All systems operational</div>
          <div className="user-profile">
            <div className="avatar small">JM</div>
            <div><strong>Joseph Mensah</strong><span>Operations manager</span></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button>
          <div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <div className="search-box">
              <Search />
              <input aria-label="Search" placeholder="Search workforce, sites..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => goTo('Incidents')}>
              <Bell /><i />
            </button>
            <div className="avatar">JM</div>
          </div>
        </header>

        <div className="page-content">
          {activeNav !== 'Command center' && pageContent[activeNav] ? (
            <OperationsSection section={pageContent[activeNav]} query={query} onNavigate={goTo} />
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">Monday, 5 October 2026 <span className="live-dot" /> Live overview</div>
                  <h1>Good morning, Joseph</h1>
                  <p>Here&apos;s the operational pulse across your security workforce.</p>
                </div>
                <button className="primary-button" type="button" onClick={() => goTo('Client reports')}><FileText /> Generate client report <ArrowUpRight /></button>
              </div>

              <section className="metric-grid" aria-label="Key workforce metrics">
                <button className="metric-card accent-blue" type="button" onClick={() => goTo('Guard workforce')}>
                  <div className="metric-top"><span>Active guards</span><div className="metric-icon"><Users /></div></div>
                  <strong>184</strong>
                  <div className="metric-bottom"><span className="trend positive">+8.2%</span><span>vs last month</span></div>
                </button>
                <button className="metric-card accent-green" type="button" onClick={() => goTo('Sites & deployments')}>
                  <div className="metric-top"><span>Coverage today</span><div className="metric-icon"><ShieldCheck /></div></div>
                  <strong>96.4<span className="metric-unit">%</span></strong>
                  <div className="metric-bottom"><span className="trend positive">+1.8%</span><span>above target</span></div>
                </button>
                <button className="metric-card accent-amber" type="button" onClick={() => goTo('Incidents')}>
                  <div className="metric-top"><span>Open incidents</span><div className="metric-icon"><AlertTriangle /></div></div>
                  <strong>07</strong>
                  <div className="metric-bottom"><span className="trend warning">3 high priority</span><span>needs attention</span></div>
                </button>
                <button className="metric-card accent-violet" type="button" onClick={() => goTo('Attendance & shifts')}>
                  <div className="metric-top"><span>Attendance rate</span><div className="metric-icon"><Clock3 /></div></div>
                  <strong>98.1<span className="metric-unit">%</span></strong>
                  <div className="metric-bottom"><span className="trend positive">+0.6%</span><span>this pay period</span></div>
                </button>
              </section>

              <section className="content-grid">
                <div className="panel coverage-panel">
                  <div className="panel-header">
                    <div>
                      <h2>Coverage overview</h2>
                      <p>Deployment coverage by day</p>
                    </div>
                    <div className="select-wrap">
                      <select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Coverage date range">
                        <option>This week</option>
                        <option>Last week</option>
                        <option>This month</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="chart-wrap">
                    <div className="chart-y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
                    <div className="chart">
                      <div className="grid-line l1" /><div className="grid-line l2" /><div className="grid-line l3" /><div className="grid-line l4" />
                      <svg viewBox="0 0 700 200" preserveAspectRatio="none" aria-label="Coverage trend chart" role="img">
                        <defs>
                          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#56d2b0" stopOpacity=".25" />
                            <stop offset="100%" stopColor="#56d2b0" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={`${coverage.path} L700 200 L0 200 Z`} fill="url(#area)" />
                        <path d={coverage.path} fill="none" stroke="#56d2b0" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                      </svg>
                      <div className="chart-x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <span><i className="legend-dot coverage" /> Coverage rate</span>
                    <span><i className="legend-dot target" /> Target 95%</span>
                    <strong>{coverage.current} <small>{range.toLowerCase()}</small></strong>
                  </div>
                </div>

                <div className="panel activity-panel">
                  <div className="panel-header">
                    <div>
                      <h2>Incident activity</h2>
                      <p>Requires supervisor attention</p>
                    </div>
                    <button className="text-button" type="button" onClick={() => goTo('Incidents')}>View all <ArrowUpRight /></button>
                  </div>
                  <div className="incident-list">
                    {filteredIncidents.length === 0 ? (
                      <p className="empty-state">No incidents match the search.</p>
                    ) : filteredIncidents.map((incident) => (
                      <button className="incident-row" key={incident.title} type="button" onClick={() => goTo('Incidents')}>
                        <div className={`incident-icon ${incident.tone}`}><AlertTriangle /></div>
                        <div className="incident-detail">
                          <strong>{incident.title}</strong>
                          <span>{incident.site} <i /> {incident.time}</span>
                        </div>
                        <StatusPill tone={incident.tone}>{incident.priority}</StatusPill>
                      </button>
                    ))}
                  </div>
                  <div className="panel-footer"><CheckCircle2 /> <span>4 incidents resolved in the last 24 hours</span></div>
                </div>
              </section>

              <section className="panel shifts-panel">
                <div className="panel-header">
                  <div>
                    <h2>Today&apos;s deployment schedule</h2>
                    <p>Live shift status across all client sites</p>
                  </div>
                  <button className="outline-button" type="button" onClick={() => goTo('Schedules')}><CalendarDays /> Full schedule</button>
                </div>
                <div className="table-wrap">
                  {filteredShifts.length === 0 ? (
                    <p className="empty-state">No shifts match “{query}”.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Guard</th>
                          <th>Client site</th>
                          <th>Shift window</th>
                          <th>Status</th>
                          <th><span className="sr-only">Actions</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredShifts.map((shift) => (
                          <tr key={shift.guard}>
                            <td>
                              <div className="guard-cell">
                                <div className="avatar guard-avatar">{shift.initials}</div>
                                <strong>{shift.guard}</strong>
                              </div>
                            </td>
                            <td><span className="site-cell"><MapPin />{shift.site}</span></td>
                            <td><span className="shift-cell"><Clock3 />{shift.shift}</span></td>
                            <td><StatusPill tone={shift.tone}>{shift.status}</StatusPill></td>
                            <td><button className="row-menu" aria-label={`More actions for ${shift.guard}`}><MoreHorizontal /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>

              <div className="bottom-grid">
                <div className="panel progress-panel">
                  <div className="panel-header">
                    <div><h2>Training compliance</h2><p>Required certifications</p></div>
                    <button className="text-button" type="button" onClick={() => goTo('Training & compliance')}>Manage <ArrowUpRight /></button>
                  </div>
                  <div className="progress-stat"><strong>87%</strong><span>of workforce compliant</span></div>
                  <div className="progress-track"><div /></div>
                  <div className="progress-items">
                    <span><i className="progress-good" /> 160 compliant</span>
                    <span><i className="progress-pending" /> 18 expiring soon</span>
                    <span><i className="progress-bad" /> 6 overdue</span>
                  </div>
                </div>
                <div className="panel quick-panel">
                  <div className="panel-header"><div><h2>Quick actions</h2><p>Common operations</p></div></div>
                  <div className="quick-actions">
                    <button type="button" onClick={() => goTo('Guard workforce')}><UserRound /><span>Add guard</span><ArrowUpRight /></button>
                    <button type="button" onClick={() => goTo('Sites & deployments')}><CalendarDays /><span>Assign deployment</span><ArrowUpRight /></button>
                    <button type="button" onClick={() => goTo('Incidents')}><AlertTriangle /><span>Log incident</span><ArrowUpRight /></button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export { navItems }
