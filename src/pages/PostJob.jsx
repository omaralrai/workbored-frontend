import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';

const steps = ['Job Details', 'Requirements', 'Benefits', 'Preview & Publish'];

const PostJob = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <Navbar variant="employer" current="jobs" user={{ initials: 'A', name: 'Aramex' }} />

      <div className="shell">
        <EmployerSidebar current="jobs" />

        <main className="main no-side narrow">
          <div className="page-head">
            <div>
              <h1 className="page-title">Post a New Job</h1>
              <p className="page-sub">Step {step + 1} of 4 — {step === 0 ? 'start with the basics. You can edit any field before publishing.' : step === 1 ? 'list the requirements for this role.' : step === 2 ? 'tell candidates what you offer.' : 'review everything before publishing.'}</p>
            </div>
            <Link className="btn btn-ghost" to="/employer/dashboard">Cancel</Link>
          </div>

          <div className="steps">
            {steps.map((label, i) => (
              <Fragment key={label}>
                <div className={`step-item ${i === step ? 'active' : ''}`}>
                  <div className="step-circle">{i + 1}</div>
                  <div className="step-lbl">{label}</div>
                </div>
                {i < steps.length - 1 && <div className="step-line"></div>}
              </Fragment>
            ))}
          </div>

          <div className="card card-pad">
            {step === 0 && (
              <>
                <div className="form-row">
                  <label>Job Title</label>
                  <input className="input" defaultValue="Frontend Engineer" />
                  <span className="hint">Be specific. "Senior React Engineer" gets more applicants than "Engineer III".</span>
                </div>

                <div className="form-grid-3">
                  <div className="form-row"><label>Job Type</label><input className="input" defaultValue="Full-time ▾" /></div>
                  <div className="form-row"><label>Experience Level</label><input className="input" defaultValue="Mid-level ▾" /></div>
                  <div className="form-row"><label>Department</label><input className="input" defaultValue="Engineering" /></div>
                </div>

                <div className="form-grid-2">
                  <div className="form-row"><label>Location</label><input className="input" defaultValue="Amman, Jordan" /></div>
                  <div className="form-row"><label>Work Mode</label><input className="input" defaultValue="On-site ▾" /></div>
                </div>

                <div className="form-grid-2">
                  <div className="form-row"><label>Min Salary (USD)</label><input className="input" defaultValue="$28,000" /></div>
                  <div className="form-row"><label>Max Salary (USD)</label><input className="input" defaultValue="$36,000" /></div>
                </div>

                <div className="form-row">
                  <label>Job Description</label>
                  <textarea className="textarea" rows="6" defaultValue="We're looking for a Frontend Engineer to join Aramex's digital experiences team. You'll work alongside designers, backend engineers and product managers to ship customer-facing features used by millions of shippers every month — from tracking pages to the self-service portal." />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-row">
                  <label>Key Responsibilities</label>
                  <textarea className="textarea" rows="6" defaultValue={"Build and maintain customer-facing React applications using TypeScript and modern tooling\nCollaborate with designers to translate Figma into pixel-accurate, accessible interfaces\nPartner with backend engineers on API contracts and data fetching patterns"} />
                  <span className="hint">One responsibility per line.</span>
                </div>
                <div className="form-row">
                  <label>Requirements</label>
                  <textarea className="textarea" rows="6" defaultValue={"2+ years of professional React experience, ideally with TypeScript\nSolid understanding of HTML, CSS, modern JS, and accessibility fundamentals\nComfortable working with REST APIs and asynchronous data flows"} />
                  <span className="hint">One requirement per line.</span>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="form-row">
                <label>Benefits</label>
                <textarea className="textarea" rows="8" defaultValue={"Competitive salary, paid in JOD with annual review\nPrivate medical insurance for you and dependents\n22 days annual leave + national holidays\nAnnual learning budget for courses, books, and conferences\nHybrid Friday option after the first 3 months"} />
                <span className="hint">One benefit per line.</span>
              </div>
            )}

            {step === 3 && (
              <div className="jd-section">
                <h3>Frontend Engineer</h3>
                <p className="muted">Full-time · Mid-level · Engineering · Amman, Jordan · On-site · $28,000 – $36,000</p>
                <div className="jd-tags">
                  <span className="chip blue">Full-time</span>
                  <span className="chip">Mid-level</span>
                  <span className="chip">Engineering</span>
                  <span className="chip">On-site</span>
                </div>
                <p>This listing will go live immediately for all job seekers once published.</p>
              </div>
            )}

            <hr className="div" />

            <div className="step-actions">
              <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>← Previous</button>
              {step < steps.length - 1
                ? <button className="btn btn-primary btn-lg" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next: {steps[step + 1]} →</button>
                : <Link className="btn btn-primary btn-lg" to="/employer/dashboard">Publish Job</Link>}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PostJob;
