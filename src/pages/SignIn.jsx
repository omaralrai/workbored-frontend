import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const LogoMark = () => (
  <svg width="44" height="44" viewBox="0 0 18 18" fill="none">
    <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
  </svg>
);

const SignIn = () => {
  return (
    <>
      <Navbar variant="public" />

      <div className="split">
        <div className="left">
          <div className="left-inner">
            <div className="eyebrow on-dark">Welcome Back</div>
            <h2>Pick up exactly where you left off.</h2>
            <p className="sub">Sign in to track your applications, message employers, and keep your profile in sync. Every status update appears the moment your employer sets it.</p>
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
            <h3>Sign In</h3>
            <p className="form-sub">Welcome back. Enter your details to continue.</p>

            <form>
              <div className="form-row">
                <label>Email Address</label>
                <input className="input" type="email" placeholder="john.doe@university.edu" />
              </div>
              <div className="form-row">
                <div className="row-flex" style={{ justifyContent: 'space-between' }}>
                  <label>Password</label>
                  <a href="#" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
                </div>
                <input className="input" type="password" placeholder="••••••••••" />
              </div>

              <label className="check-row">
                <span className="box"></span>
                Keep me signed in
              </label>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
            </form>

            <p className="form-foot">No account yet? <Link to="/register">Create one free →</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
