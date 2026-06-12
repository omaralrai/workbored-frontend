import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const LogoMark = () => (
  <svg width="44" height="44" viewBox="0 0 18 18" fill="none">
    <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
  </svg>
);

const CompanySetup = () => {
  return (
    <>
      <Navbar variant="employer" user={{ initials: 'A', name: 'Aramex' }} />

      <div className="split">
        <div className="left">
          <div className="left-inner">
            <div className="setup-step-label">Step 2 of 2</div>
            <h2>Tell us about your company.</h2>
            <p className="sub">This is what job seekers see on every listing you post. You can update it anytime from your dashboard.</p>

            <div className="setup-progress">
              <div className="sp-step done">
                <div className="sp-circle">✓</div>
                <div><div className="t">Account Created</div><div className="s">Your employer account is ready.</div></div>
              </div>
              <div className="sp-step active">
                <div className="sp-circle">2</div>
                <div><div className="t">Set Up Your Company</div><div className="s">Add company details and your first open role.</div></div>
              </div>
            </div>

            <div className="brand-block setup-brand">
              <div className="big-mark"><LogoMark /></div>
              <div>
                <div className="big-word">Work<span className="b">Bored</span></div>
                <div className="tag">Where Careers Begin</div>
              </div>
            </div>
          </div>
        </div>

        <div className="right setup-right">
          <div className="form-card setup-card">
            <h3>Company Details</h3>
            <p className="form-sub">Help candidates understand who you are.</p>

            <div className="form-row"><label>Company Name</label><input className="input" defaultValue="Aramex" /></div>
            <div className="form-grid-2">
              <div className="form-row"><label>Industry</label><input className="input" defaultValue="Logistics ▾" /></div>
              <div className="form-row"><label>Company Size</label><input className="input" defaultValue="5,001–10,000 ▾" /></div>
            </div>
            <div className="form-grid-2">
              <div className="form-row"><label>Founded Year</label><input className="input" defaultValue="1982" /></div>
              <div className="form-row"><label>Website</label><input className="input" defaultValue="aramex.com" /></div>
            </div>
            <div className="form-row"><label>Headquarters</label><input className="input" defaultValue="Amman, Jordan" /></div>
            <div className="form-row">
              <label>About the Company</label>
              <textarea className="textarea" rows="4" defaultValue="Aramex is a global provider of comprehensive logistics and transportation solutions, operating in 65+ countries." />
            </div>

            <hr className="div" />

            <div className="role-section-head">
              <h3>First Open Role</h3>
              <span className="chip blue">Optional</span>
            </div>

            <div className="role-block">
              <div className="role-block-head">
                <div className="role-block-title">Role 1</div>
                <button className="btn btn-ghost btn-sm">Remove</button>
              </div>
              <div className="form-row"><label>Role Title</label><input className="input" defaultValue="Frontend Engineer" /></div>
              <div className="form-row"><label>About the Role</label><textarea className="textarea" rows="2" defaultValue="Join our digital experiences team building customer-facing React applications." /></div>
              <div className="form-row"><label>Key Responsibilities</label><textarea className="textarea" rows="2" defaultValue="Ship customer-facing features, collaborate with design, write tests." /></div>
              <div className="form-row"><label>Requirements</label><textarea className="textarea" rows="2" defaultValue="2+ years React, TypeScript, modern JS fundamentals." /></div>
            </div>

            <button className="btn btn-secondary btn-block add-role-btn">+ Add Another Role</button>

            <Link className="btn btn-primary btn-block btn-lg setup-submit" to="/employer/dashboard">Save & Go to Dashboard →</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
