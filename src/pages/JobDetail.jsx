import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const JobDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar variant="seeker" current="jobs" user={{ initials: 'JD', name: 'John D.' }} />

      <main className="main no-side narrow">
        <div className="card card-pad">
          <div className="jd-head">
            <div className="left">
              <div className="co-logo lg">A</div>
              <div>
                <h1>Frontend Engineer</h1>
                <div className="jd-meta">
                  <span className="co-name">Aramex</span>
                  <span className="dot"></span><span>Amman, Jordan</span>
                  <span className="dot"></span><span>On-site</span>
                  <span className="dot"></span><span>Posted 2 days ago</span>
                </div>
                <div className="jd-tags">
                  <span className="chip blue">Full-time</span>
                  <span className="chip">React</span>
                  <span className="chip">TypeScript</span>
                  <span className="chip">Mid-level</span>
                  <span className="chip">$28k – $36k</span>
                </div>
              </div>
            </div>
            <Link className="btn btn-primary btn-lg" to="/seeker/applications">Apply Now <ArrowIcon /></Link>
          </div>

          <div className="jd-section">
            <h3>About the Role</h3>
            <p>We're looking for a Frontend Engineer to join Aramex's digital experiences team. You'll work alongside designers, backend engineers and product managers to ship customer-facing features used by millions of shippers every month — from tracking pages to the self-service portal.</p>
            <p>This role is on-site in Amman with flexible hours. You'll own features end-to-end and have a direct line to the people using what you build.</p>
          </div>

          <div className="jd-section">
            <h3>Key Responsibilities</h3>
            <ul>
              <li>Build and maintain customer-facing React applications using TypeScript and modern tooling</li>
              <li>Collaborate with designers to translate Figma into pixel-accurate, accessible interfaces</li>
              <li>Partner with backend engineers on API contracts and data fetching patterns</li>
              <li>Write unit and integration tests; participate in code review and design review</li>
              <li>Investigate bugs reported by support and operations teams; ship fixes quickly</li>
            </ul>
          </div>

          <div className="jd-section">
            <h3>Requirements</h3>
            <ul>
              <li>2+ years of professional React experience, ideally with TypeScript</li>
              <li>Solid understanding of HTML, CSS, modern JS, and accessibility fundamentals</li>
              <li>Comfortable working with REST APIs and asynchronous data flows</li>
              <li>Experience with at least one component library (MUI, Chakra, Radix or similar)</li>
              <li>Bachelor's degree in CS, SE or equivalent practical experience</li>
            </ul>
          </div>

          <div className="jd-section">
            <h3>Benefits</h3>
            <ul>
              <li>Competitive salary, paid in JOD with annual review</li>
              <li>Private medical insurance for you and dependents</li>
              <li>22 days annual leave + national holidays</li>
              <li>Annual learning budget for courses, books, and conferences</li>
              <li>Hybrid Friday option after the first 3 months</li>
            </ul>
          </div>

          <div className="jd-section">
            <h3>About Aramex</h3>
            <div className="about-co">
              <div className="co-logo md">A</div>
              <div className="info">
                <div><div className="k">Industry</div><div className="v">Logistics</div></div>
                <div><div className="k">Size</div><div className="v">5,000+ employees</div></div>
                <div><div className="k">Founded</div><div className="v">1982</div></div>
                <div><div className="k">HQ</div><div className="v">Amman, Jordan</div></div>
                <div><div className="k">Website</div><div className="v link">aramex.com</div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default JobDetail;
