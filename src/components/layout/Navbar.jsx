import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

const initialsFromName = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');
};

const UserPill = ({ employer, onClick }) => {
  const { user } = useAuth();
  const displayName = user?.full_name?.split(' ')[0] || 'Account';

  return (
    <div className="user-pill" onClick={onClick} role="button">
      <span className={`user-avatar${employer ? ' employer' : ''}`}>
        {initialsFromName(user?.full_name)}
      </span>
      {displayName} ▾
    </div>
  );
};

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2.5V11.5M2.5 7H11.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Navbar = ({ variant = 'public', current }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    logout();
    navigate('/');
  };

  if (variant === 'employer') {
    return (
      <nav className="navbar">
        <div className="container navbar-inner">
          <Logo />
          <div className="nav-links">
            <Link to="/employer/dashboard" className={current === 'dashboard' ? 'current' : ''}>Dashboard</Link>
            <Link to="/employer/applications" className={current === 'applications' ? 'current' : ''}>Applications</Link>
            <Link to="/companies/me" className={current === 'company' ? 'current' : ''}>Company</Link>
          </div>
          <div className="nav-right">
            <Link className="btn-post" to="/employer/post-job"><PlusIcon /> Post a Job</Link>
            <UserPill employer onClick={handleAccountClick} />
          </div>
        </div>
      </nav>
    );
  }

  if (variant === 'seeker') {
    return (
      <nav className="navbar">
        <div className="container navbar-inner">
          <Logo />
          <div className="nav-links">
            <Link to="/jobs" className={current === 'jobs' ? 'current' : ''}>Find Jobs</Link>
            <Link to="/seeker/dashboard" className={current === 'dashboard' ? 'current' : ''}>Dashboard</Link>
            <Link to="/seeker/applications" className={current === 'applications' ? 'current' : ''}>Applications</Link>
          </div>
          <div className="nav-right">
            <UserPill onClick={handleAccountClick} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Logo />
        <div className="nav-links">
          <Link to="/jobs">Find Jobs</Link>
        </div>
        <div className="nav-spacer" />
      </div>
    </nav>
  );
};

export default Navbar;
