import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="foot">
    <div className="foot-grid">
      <div className="foot-brand">
        <Link className="logo" to="/">
          <span className="logo-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </svg>
          </span>
          <span><span className="work">Work</span><span className="board">Bored</span></span>
        </Link>
        <p className="tag">Where careers begin. A focused job board for students, graduates, and the teams hiring them.</p>
        <div className="foot-contact">
          <div className="row">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M2 3.5L7 7.5L12 3.5" stroke="currentColor" strokeWidth="1.2" /></svg>
            hello@workbored.app
          </div>
          <div className="row">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2H5L6 5L4.5 6C5 8 6 9 8 9.5L9 8L12 9V11C12 11.5 11.5 12 11 12C7 12 2 7 2 3C2 2.5 2.5 2 3 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            +962 6 555 0143
          </div>
          <div className="row">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C4.8 1.5 3 3.3 3 5.5C3 8.5 7 12.5 7 12.5C7 12.5 11 8.5 11 5.5C11 3.3 9.2 1.5 7 1.5Z" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="5.5" r="1.4" stroke="currentColor" strokeWidth="1.2" /></svg>
            Al Hussein Technical University, Amman
          </div>
        </div>
        <a className="li-badge" href="#">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 2H12V12H2V2ZM4 5.5H5.5V10H4V5.5ZM4.75 4.75C5.2 4.75 5.5 4.4 5.5 4C5.5 3.6 5.2 3.25 4.75 3.25C4.3 3.25 4 3.6 4 4C4 4.4 4.3 4.75 4.75 4.75ZM6.5 5.5H8V6.2C8.2 5.8 8.7 5.4 9.4 5.4C10.5 5.4 10.7 6.1 10.7 7.1V10H9.2V7.4C9.2 6.9 9.1 6.5 8.6 6.5C8.1 6.5 8 6.9 8 7.4V10H6.5V5.5Z" /></svg>
          Follow us on LinkedIn
        </a>
      </div>

      <div className="foot-col">
        <h5>For Job Seekers</h5>
        <ul>
          <li><Link to="/jobs">Browse Jobs</Link></li>
          <li><Link to="/companies/me">Browse Companies</Link></li>
          <li><a href="#">Career Resources</a></li>
          <li><a href="#">Resume Tips</a></li>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      </div>

      <div className="foot-col">
        <h5>For Employers</h5>
        <ul>
          <li><Link to="/employer/post-job">Post a Job</Link></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Hiring Guide</a></li>
          <li><a href="#">Company Profiles</a></li>
          <li><Link to="/signin">Employer Sign In</Link></li>
        </ul>
      </div>

      <div className="foot-col">
        <h5>Company</h5>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>

    <div className="foot-bottom">
      <span>© 2026 WorkBored. Built at Al Hussein Technical University.</span>
      <span>Where Careers Begin.</span>
    </div>
  </footer>
);

export default Footer;
