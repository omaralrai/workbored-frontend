import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const LogoMark = () => (
  <svg width="44" height="44" viewBox="0 0 18 18" fill="none">
    <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
  </svg>
);

const SeekerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 13.5C3 10.7 5.2 9 8 9C10.8 9 13 10.7 13 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
);

const EmployerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13V5L8 2L14 5V13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M5 13V8.5H11V13" stroke="currentColor" strokeWidth="1.4" /></svg>
);

const Register = () => {
  const [role, setRole] = useState('seeker');

  return (
    <>
      <Navbar variant="public" />

      <div className="split">
        <div className="left">
          <div className="left-inner">
            <div className="eyebrow on-dark">Where Careers Begin</div>
            <h2>Create your account in under a minute.</h2>
            <p className="sub">Browse 2,400+ open roles, apply in two clicks, and let WorkBored keep score for you. One profile, every application.</p>
            <div className="brand-block">
              <div className="big-mark"><LogoMark /></div>
              <div>
                <div className="big-word">Work<span className="b">Bored</span></div>
                <div className="tag">Where Careers Begin</div>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="form-card">
            <h3>Create Account</h3>
            <p className="form-sub">Choose your role to get started.</p>

            <div className="role-toggle">
              <button type="button" className={`role-opt ${role === 'seeker' ? 'active' : ''}`} onClick={() => setRole('seeker')}>
                <span className="row-flex" style={{ justifyContent: 'center' }}><SeekerIcon /> Job Seeker</span>
              </button>
              <button type="button" className={`role-opt ${role === 'employer' ? 'active' : ''}`} onClick={() => setRole('employer')}>
                <span className="row-flex" style={{ justifyContent: 'center' }}><EmployerIcon /> Employer</span>
              </button>
            </div>

            <form>
              <div className="form-row">
                <label>Full Name</label>
                <input className="input" placeholder="John Doe" />
              </div>
              <div className="form-row">
                <label>Email Address</label>
                <input className="input" type="email" placeholder="john.doe@university.edu" />
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>Password</label>
                  <input className="input" type="password" placeholder="••••••••" />
                </div>
                <div className="form-row">
                  <label>Confirm Password</label>
                  <input className="input" type="password" placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Create Account</button>
            </form>

            <p className="form-terms">By creating an account you agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
            <p className="form-foot">Already have an account? <Link to="/signin">Sign in →</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
