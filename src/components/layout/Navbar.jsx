import { Link } from 'react-router-dom';

const LogoMark = () => (
  <span className="logo-mark" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
    </svg>
  </span>
);

const Logo = () => (
  <Link className="logo" to="/">
    <LogoMark />
    <span><span className="work">Work</span><span className="board">Bored</span></span>
  </Link>
);

const UserPill = ({ user, employer }) => (
  <div className="user-pill">
    <span className={`user-avatar${employer ? ' employer' : ''}`}>
      {user?.initials || '??'}
    </span>
    {user?.name || 'Account'} ▾
  </div>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2.5V11.5M2.5 7H11.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Navbar = ({ variant = 'public', current, user }) => {
  if (variant === 'employer') {
    return (
      <nav className="navbar">
        <Logo />
        <div className="nav-links">
          <Link to="/employer/dashboard" className={current === 'dashboard' ? 'current' : ''}>Dashboard</Link>
          <Link to="/employer/jobs" className={current === 'jobs' ? 'current' : ''}>My Jobs</Link>
          <Link to="/employer/applications" className={current === 'applications' ? 'current' : ''}>Applications</Link>
          <Link to="/companies/me" className={current === 'company' ? 'current' : ''}>Company</Link>
        </div>
        <div className="nav-right">
          <Link className="btn-post" to="/employer/post-job"><PlusIcon /> Post a Job</Link>
          <UserPill user={user} employer />
        </div>
      </nav>
    );
  }

  if (variant === 'seeker') {
    return (
      <nav className="navbar">
        <Logo />
        <div className="nav-links">
          <Link to="/jobs" className={current === 'jobs' ? 'current' : ''}>Find Jobs</Link>
          <Link to="/seeker/dashboard" className={current === 'dashboard' ? 'current' : ''}>Dashboard</Link>
          <Link to="/seeker/applications" className={current === 'applications' ? 'current' : ''}>Applications</Link>
          <Link to="/companies/me" className={current === 'companies' ? 'current' : ''}>Companies</Link>
        </div>
        <div className="nav-right">
          <UserPill user={user} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        <Link to="/jobs">Find Jobs</Link>
        <Link to="/companies/me">Companies</Link>
      </div>
      <div className="nav-spacer" />
    </nav>
  );
};

export default Navbar;
