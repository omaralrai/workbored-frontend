import { useState, useEffect, useRef } from 'react';
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

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2.5V11.5M2.5 7H11.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const HamburgerIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {open ? (
      <>
        <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const UserDropdown = ({ profilePath, employer }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const displayName = user?.full_name?.split(' ')[0] || 'Account';
  const initials = initialsFromName(user?.full_name);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="user-dropdown" ref={ref}>
      <div className="user-pill" onClick={() => setOpen((o) => !o)} role="button">
        <span className={`user-avatar${employer ? ' employer' : ''}`}>{initials}</span>
        {displayName} ▾
      </div>
      {open && (
        <div className="user-dropdown-menu">
          <Link
            to={profilePath}
            className="dropdown-item"
            onClick={() => setOpen(false)}
          >
            View Profile
          </Link>
          <button className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ variant = 'public', current }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const closeMobile = () => setMobileOpen(false);

  const handleMobileLogout = () => {
    closeMobile();
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
            <UserDropdown profilePath="/companies/me" employer />
            <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-nav">
            <Link to="/employer/dashboard" className="mobile-nav-link" onClick={closeMobile}>Dashboard</Link>
            <Link to="/employer/applications" className="mobile-nav-link" onClick={closeMobile}>Applications</Link>
            <Link to="/companies/me" className="mobile-nav-link" onClick={closeMobile}>Company</Link>
            <Link to="/employer/post-job" className="mobile-nav-link" onClick={closeMobile}>Post a Job</Link>
            <Link to="/companies/me" className="mobile-nav-link" onClick={closeMobile}>View Profile</Link>
            <button className="mobile-nav-link mobile-nav-link--danger" onClick={handleMobileLogout}>Sign Out</button>
          </div>
        )}
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
            <UserDropdown profilePath="/seeker/profile" />
            <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-nav">
            <Link to="/jobs" className="mobile-nav-link" onClick={closeMobile}>Find Jobs</Link>
            <Link to="/seeker/dashboard" className="mobile-nav-link" onClick={closeMobile}>Dashboard</Link>
            <Link to="/seeker/applications" className="mobile-nav-link" onClick={closeMobile}>Applications</Link>
            <Link to="/seeker/profile" className="mobile-nav-link" onClick={closeMobile}>View Profile</Link>
            <button className="mobile-nav-link mobile-nav-link--danger" onClick={handleMobileLogout}>Sign Out</button>
          </div>
        )}
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
        <div className="nav-right">
          <Link to="/signin" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-nav">
          <Link to="/jobs" className="mobile-nav-link" onClick={closeMobile}>Find Jobs</Link>
          <Link to="/signin" className="mobile-nav-link" onClick={closeMobile}>Sign In</Link>
          <Link to="/register" className="mobile-nav-link" onClick={closeMobile}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
