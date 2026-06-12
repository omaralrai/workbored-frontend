import { Link } from 'react-router-dom';

const SeekerSidebar = ({ current }) => (
  <aside className="sidebar">
    <div className="side-section">Menu</div>
    <Link className={`side-item ${current === 'dashboard' ? 'active' : ''}`} to="/seeker/dashboard">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" /></svg>
      Dashboard
    </Link>
    <Link className={`side-item ${current === 'applications' ? 'active' : ''}`} to="/seeker/applications">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 6H10.5M5.5 9H10.5M5.5 11.5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      My Applications
    </Link>
    <Link className={`side-item ${current === 'profile' ? 'active' : ''}`} to="/seeker/profile">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 13.5C3 10.7 5.2 9 8 9C10.8 9 13 10.7 13 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      My Profile
    </Link>
  </aside>
);

export default SeekerSidebar;
