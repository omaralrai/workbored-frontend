import { Link } from 'react-router-dom';

const EmployerSidebar = ({ current }) => (
  <aside className="sidebar">
    <div className="side-section">Workspace</div>
    <Link className={`side-item ${current === 'dashboard' ? 'active' : ''}`} to="/employer/dashboard">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /></svg>
      Dashboard
    </Link>
    <Link className={`side-item ${current === 'jobs' ? 'active' : ''}`} to="/employer/jobs">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="4" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 4V2.5H10.5V4" stroke="currentColor" strokeWidth="1.4" /></svg>
      My Job Posts
    </Link>
    <Link className={`side-item ${current === 'applications' ? 'active' : ''}`} to="/employer/applications">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M2 13C2 10.8 3.8 9 6 9C8.2 9 10 10.8 10 13" stroke="currentColor" strokeWidth="1.4" /><circle cx="11.5" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
      Applications
    </Link>
    <Link className={`side-item ${current === 'company' ? 'active' : ''}`} to="/companies/me">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13V5L8 2L14 5V13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M5 13V8.5H11V13" stroke="currentColor" strokeWidth="1.4" /></svg>
      Company Profile
    </Link>
  </aside>
);

export default EmployerSidebar;
