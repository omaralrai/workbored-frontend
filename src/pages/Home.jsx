import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const featuredJobs = [
  {
    initial: 'A', co: 'Aramex', title: 'Frontend Engineer',
    tags: [{ label: 'Full-time', blue: true }, { label: 'Amman, JO' }, { label: 'On-site' }],
    salary: '$28k – $36k', level: 'Mid-level', posted: 'Posted 2 days ago',
  },
  {
    initial: 'M', co: 'Mawdoo3', title: 'UX Research Intern', logoClass: 'green',
    tags: [{ label: 'Internship', blue: true }, { label: 'Remote' }, { label: 'Entry' }],
    salary: 'Stipend · $800/mo', level: '3 months', posted: 'Posted 4 days ago',
  },
  {
    initial: 'O', co: 'Optimiza', title: 'Junior Backend Developer', logoClass: 'orange',
    tags: [{ label: 'Full-time', blue: true }, { label: 'Hybrid' }, { label: 'Junior' }],
    salary: '$22k – $28k', level: 'Node.js', posted: 'Posted 1 week ago',
  },
];

const Home = () => {
  return (
    <>
      <Navbar variant="public" />

      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="eyebrow on-dark">Where Careers Begin</div>
            <h1>Find work that<br />actually <span className="accent">moves</span> you forward.</h1>
            <p className="subtitle">A focused job board for students, graduates and early-career professionals. Browse roles, apply in two clicks, and track every application — all in one place.</p>

            <div className="search" role="search" aria-label="Search jobs">
              <div className="field">
                <div className="lbl">Keyword</div>
                <div className="val">
                  <span className="icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" /><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </span>
                  Product Designer
                </div>
              </div>
              <div className="field">
                <div className="lbl">Location</div>
                <div className="val">
                  <span className="icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C4.8 1.5 3 3.3 3 5.5C3 8.5 7 12.5 7 12.5C7 12.5 11 8.5 11 5.5C11 3.3 9.2 1.5 7 1.5Z" stroke="currentColor" strokeWidth="1.3" /><circle cx="7" cy="5.5" r="1.4" stroke="currentColor" strokeWidth="1.3" /></svg>
                  </span>
                  Amman, Jordan
                </div>
              </div>
              <div className="field placeholder">
                <div className="lbl">Job Type</div>
                <div className="val">
                  All Types
                  <span className="icon" style={{ marginLeft: 'auto' }} aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </div>
              <Link className="btn-search" to="/jobs">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.6" /><path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></svg>
                Search
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat"><div className="num">2,400+</div><div className="lbl">OPEN ROLES</div></div>
              <div className="stat"><div className="num">580</div><div className="lbl">EMPLOYERS</div></div>
              <div className="stat"><div className="num">14k</div><div className="lbl">APPLICATIONS</div></div>
              <div className="stat"><div className="num">92%</div><div className="lbl">RESPONSE RATE</div></div>
            </div>
          </div>

          <div className="hero-illu" aria-label="Product preview">
            <div className="float-card fc1">
              <div className="row">
                <div className="fc-logo">A</div>
                <div>
                  <div className="fc-title">Frontend Engineer</div>
                  <div className="fc-sub">Aramex · Amman</div>
                </div>
              </div>
              <div className="fc-meta">
                <span className="chip blue">Full-time</span>
                <span className="chip">On-site</span>
                <span className="chip">Mid-level</span>
              </div>
              <div className="fc-foot">
                <span className="fc-salary">$28k – $36k</span>
                <span className="fc-apply">Apply Now →</span>
              </div>
            </div>

            <div className="float-card fc2">
              <div className="row">
                <div className="fc-logo green">M</div>
                <div>
                  <div className="fc-title">UX Research Intern</div>
                  <div className="fc-sub">Mawdoo3 · Remote</div>
                </div>
              </div>
              <div className="fc-meta">
                <span className="chip blue">Internship</span>
                <span className="chip">Remote</span>
              </div>
              <div className="fc-foot">
                <span className="fc-salary">Stipend</span>
                <span className="fc-apply">Apply Now →</span>
              </div>
            </div>

            <div className="status-card">
              <div className="head">
                <div className="t">Application Update</div>
                <span className="badge interview">Interview</span>
              </div>
              <div className="body">You've been selected for an interview! Check the dashboard for details.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="trusted" aria-label="Trusted by">
        <div className="container trusted-inner">
          <div className="lbl">Trusted by teams at</div>
          <div className="logos">
            <span className="l">◆ Aramex</span>
            <span className="l">○ Mawdoo3</span>
            <span className="l">▲ Estarta</span>
            <span className="l">◇ Optimiza</span>
            <span className="l">⬡ MenaITech</span>
            <span className="l">⬢ Hikma</span>
          </div>
        </div>
      </div>

      <section className="block">
        <div className="container">
          <div className="eyebrow">Why WorkBored</div>
          <h2 className="section-title">A job board built for the way early careers actually start.</h2>
          <p className="section-sub">No noisy newsletters, no LinkedIn anxiety, no five-page applications. WorkBored is a focused, opinionated platform for finding your next role and the role finding you.</p>

          <div className="vp-grid">
            <article className="vp-card">
              <div className="vp-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="M15 15L19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </div>
              <div>
                <h3>Search that respects your time</h3>
                <p>Filter by job type, salary band, experience level and location. Save searches, hide what you've seen, and never wade through duplicate listings again.</p>
              </div>
            </article>

            <article className="vp-card">
              <div className="vp-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M7 11L9.5 13.5L15 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <h3>Track every application live</h3>
                <p>Pending, Under Review, Interview, Approved, Rejected — every status update from the employer lands in your dashboard with plain-English context. No inbox archaeology.</p>
              </div>
            </article>

            <article className="vp-card">
              <div className="vp-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L13.5 7L19 7.8L15 11.7L16 17L11 14.5L6 17L7 11.7L3 7.8L8.5 7L11 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <h3>Profiles employers actually read</h3>
                <p>One page. Skills, resume, summary, and the work that matters. We strip away the recruiter jargon so what you've done speaks louder than how you've worded it.</p>
              </div>
            </article>

            <article className="vp-card">
              <div className="vp-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 18V8L11 4L18 8V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 18V12H14V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <h3>For employers, just the essentials</h3>
                <p>Post a role in four steps, manage applicants from a single table, and move candidates through your pipeline with one click. No analytics theatre — just the job done.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="block how">
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">From first browse to first interview in days, not weeks.</h2>

          <div className="how-grid">
            <div>
              <div className="how-tabs">
                <button className="how-tab active">For Job Seekers</button>
                <button className="how-tab">For Employers</button>
              </div>
              <div className="how-steps">
                <div className="step">
                  <div className="step-num">1</div>
                  <div>
                    <h4>Create your profile</h4>
                    <p>Add your skills, upload a CV, write a short summary. Three fields are required — the rest is up to you.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">2</div>
                  <div>
                    <h4>Browse and filter open roles</h4>
                    <p>Search by keyword, location, type and salary range. Find internships, full-time, contract and remote — all in one feed.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">3</div>
                  <div>
                    <h4>Apply in two clicks</h4>
                    <p>Your profile is your application. Add an optional cover letter and you're done — no rewriting your work history for every role.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">4</div>
                  <div>
                    <h4>Track status in real time</h4>
                    <p>Every status change from the employer appears instantly on your dashboard with plain-English context. No emails, no guesswork.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dash-preview" aria-hidden="true">
              <div className="dash-bar">
                <i></i><i></i><i></i>
                <span className="url">workbored.app/dashboard</span>
              </div>
              <div className="dash-body">
                <div className="dash-title">Welcome back, John</div>
                <div className="dash-sub">You have 12 active applications across 8 companies.</div>

                <div className="stat-row">
                  <div className="stat-card s1"><div className="n">6</div><div className="l">Pending</div></div>
                  <div className="stat-card s2"><div className="n">3</div><div className="l">Review</div></div>
                  <div className="stat-card s3"><div className="n">1</div><div className="l">Interview</div></div>
                  <div className="stat-card s4"><div className="n">0</div><div className="l">Approved</div></div>
                  <div className="stat-card s5"><div className="n">2</div><div className="l">Rejected</div></div>
                </div>

                <div className="applist">
                  <div className="arow head"><div>Company</div><div>Role</div><div>Applied</div><div>Status</div></div>
                  <div className="arow">
                    <div className="co"><div className="co-logo">A</div>Aramex</div>
                    <div>Frontend Engineer</div>
                    <div className="date">2 days ago</div>
                    <div><span className="badge interview">Interview</span></div>
                  </div>
                  <div className="arow">
                    <div className="co"><div className="co-logo green">M</div>Mawdoo3</div>
                    <div>UX Research Intern</div>
                    <div className="date">5 days ago</div>
                    <div><span className="badge review">Under Review</span></div>
                  </div>
                  <div className="arow">
                    <div className="co"><div className="co-logo red">E</div>Estarta</div>
                    <div>QA Engineer Intern</div>
                    <div className="date">1 week ago</div>
                    <div><span className="badge pending">Pending</span></div>
                  </div>
                  <div className="arow">
                    <div className="co"><div className="co-logo orange">O</div>Optimiza</div>
                    <div>Junior Backend Dev</div>
                    <div className="date">2 weeks ago</div>
                    <div><span className="badge approved">Approved</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block lifecycle">
        <div className="container">
          <div className="eyebrow">Application lifecycle</div>
          <h2 className="section-title">No more wondering where you stand.</h2>
          <p className="section-sub">Every application moves through five clear stages. Each transition is set by the employer and shows up immediately on your dashboard with plain-English context — no inbox digging, no guessing.</p>

          <div className="lc-flow">
            <div className="lc-card">
              <span className="badge pending">Pending</span>
              <h4>Submitted</h4>
              <p>Awaiting employer review — hang tight!</p>
              <span className="arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="lc-card">
              <span className="badge review">Under Review</span>
              <h4>Being read</h4>
              <p>The employer is reviewing your application.</p>
              <span className="arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="lc-card">
              <span className="badge interview">Interview</span>
              <h4>Shortlisted</h4>
              <p>You've been selected for an interview! Check for details.</p>
              <span className="arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="lc-card">
              <span className="badge approved">Approved</span>
              <h4>Offered</h4>
              <p>Congratulations! You have been approved.</p>
              <span className="arrow"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="lc-card">
              <span className="badge rejected">Rejected</span>
              <h4>Not this time</h4>
              <p>Not selected this time — keep applying!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="block featured">
        <div className="container">
          <div className="feat-head">
            <div>
              <div className="eyebrow">Featured roles</div>
              <h2 className="section-title">This week's openings.</h2>
            </div>
            <Link className="feat-link" to="/jobs">Browse all 2,400+ jobs <ArrowIcon /></Link>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job) => (
              <article className="feat-job-card" key={job.title}>
                <div className="job-top">
                  <div className={`fc-logo ${job.logoClass || ''}`}>{job.initial}</div>
                  <div>
                    <div className="job-co">{job.co}</div>
                    <div className="job-title">{job.title}</div>
                  </div>
                </div>
                <div className="job-tags">
                  {job.tags.map((tag) => (
                    <span className={`chip ${tag.blue ? 'blue' : ''}`} key={tag.label}>{tag.label}</span>
                  ))}
                </div>
                <div className="job-meta-row">
                  <span className="job-salary">{job.salary}</span>
                  <span>{job.level}</span>
                </div>
                <div className="job-foot">
                  <span className="posted">{job.posted}</span>
                  <button className="btn-apply">Apply Now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block roles">
        <div className="container">
          <div className="eyebrow">Two sides, one platform</div>
          <h2 className="section-title">Whichever side of the table you're on.</h2>

          <div className="roles-grid">
            <div className="role-card seeker">
              <div className="role-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M4 22C4 17.5 8 14.5 13 14.5C18 14.5 22 17.5 22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </div>
              <div>
                <div className="role-tag">For Job Seekers</div>
                <h3>Apply once. Track everything.</h3>
              </div>
              <p className="role-sub">Build a profile that travels with you. See every application, every status, and every next step in one focused dashboard.</p>
              <ul className="role-bullets">
                <li>Unlimited applications across full-time, internships and contracts</li>
                <li>Real-time status updates with plain-English explanations</li>
                <li>Profile-driven applications — no rewriting per role</li>
                <li>Withdraw, re-apply or follow up without leaving the app</li>
              </ul>
              <Link className="role-cta" to="/register">Create a free account →</Link>
            </div>

            <div className="role-card employer">
              <div className="role-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M3 22V8L13 4L23 8V22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 22V14H17V22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <div className="role-tag">For Employers</div>
                <h3>Post a role. Hire the right one.</h3>
              </div>
              <p className="role-sub">A four-step posting flow, an applicant table that does the thinking for you, and context-aware actions on every status — no analytics dashboards you'll never open.</p>
              <ul className="role-bullets">
                <li>Four-step structured job posting (Details → Requirements → Benefits → Preview)</li>
                <li>Applicant pipeline with one-click status changes</li>
                <li>Context-aware action buttons — only valid next steps shown</li>
                <li>Company profile that links to every open role automatically</li>
              </ul>
              <Link className="role-cta" to="/register">Post your first job →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Ready to find what's next?</h2>
            <p>Create a free account in under a minute. Browse 2,400+ open roles, apply in two clicks, and let the platform keep score for you.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn-ghost" to="/signin">Sign In</Link>
            <Link className="btn-primary" to="/register">Create Account <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
