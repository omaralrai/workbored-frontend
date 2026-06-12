import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, createJob } from '../api/client';

const steps = ['Job Details', 'Requirements', 'Benefits', 'Preview & Publish'];

const INITIAL_FORM = {
  title: '',
  job_type: 'full-time',
  experience_level: 'mid-level',
  department: '',
  location: '',
  work_mode: 'on-site',
  salary_min: '',
  salary_max: '',
  description: '',
  responsibilities: '',
  requirements: '',
  benefits: '',
};

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePublish = async () => {
    setSubmitting(true);
    setError('');
    try {
      const company = await getCompanyByUser(user.id);
      const salaryDisplay = form.salary_min && form.salary_max
        ? `$${Number(form.salary_min).toLocaleString()} – $${Number(form.salary_max).toLocaleString()} / year`
        : '';

      await createJob({
        company_id: company.id,
        title: form.title,
        job_type: form.job_type,
        experience_level: form.experience_level,
        department: form.department,
        location: form.location,
        work_mode: form.work_mode,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        salary_display: salaryDisplay,
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        benefits: form.benefits,
        tags: '',
      });

      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar variant="employer" current="jobs" />

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
            {error && <p className="form-error">{error}</p>}

            {step === 0 && (
              <>
                <div className="form-row">
                  <label>Job Title</label>
                  <input className="input" value={form.title} onChange={update('title')} placeholder="Frontend Engineer" />
                  <span className="hint">Be specific. "Senior React Engineer" gets more applicants than "Engineer III".</span>
                </div>

                <div className="form-grid-3">
                  <div className="form-row">
                    <label>Job Type</label>
                    <select className="input" value={form.job_type} onChange={update('job_type')}>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Experience Level</label>
                    <select className="input" value={form.experience_level} onChange={update('experience_level')}>
                      <option value="entry">Entry</option>
                      <option value="mid-level">Mid-level</option>
                      <option value="senior">Senior</option>
                      <option value="lead">Lead</option>
                    </select>
                  </div>
                  <div className="form-row"><label>Department</label><input className="input" value={form.department} onChange={update('department')} placeholder="Engineering" /></div>
                </div>

                <div className="form-grid-2">
                  <div className="form-row"><label>Location</label><input className="input" value={form.location} onChange={update('location')} placeholder="Amman, Jordan" /></div>
                  <div className="form-row">
                    <label>Work Mode</label>
                    <select className="input" value={form.work_mode} onChange={update('work_mode')}>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-row"><label>Min Salary (USD)</label><input className="input" type="number" value={form.salary_min} onChange={update('salary_min')} placeholder="28000" /></div>
                  <div className="form-row"><label>Max Salary (USD)</label><input className="input" type="number" value={form.salary_max} onChange={update('salary_max')} placeholder="36000" /></div>
                </div>

                <div className="form-row">
                  <label>Job Description</label>
                  <textarea className="textarea" rows="6" value={form.description} onChange={update('description')} placeholder="Describe the role…" />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-row">
                  <label>Key Responsibilities</label>
                  <textarea className="textarea" rows="6" value={form.responsibilities} onChange={update('responsibilities')} placeholder={"One responsibility per line"} />
                  <span className="hint">One responsibility per line.</span>
                </div>
                <div className="form-row">
                  <label>Requirements</label>
                  <textarea className="textarea" rows="6" value={form.requirements} onChange={update('requirements')} placeholder={"One requirement per line"} />
                  <span className="hint">One requirement per line.</span>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="form-row">
                <label>Benefits</label>
                <textarea className="textarea" rows="8" value={form.benefits} onChange={update('benefits')} placeholder={"One benefit per line"} />
                <span className="hint">One benefit per line.</span>
              </div>
            )}

            {step === 3 && (
              <div className="jd-section">
                <h3>{form.title || 'Untitled Role'}</h3>
                <p className="muted">{form.job_type} · {form.experience_level} · {form.department} · {form.location} · {form.work_mode} · {form.salary_min && form.salary_max ? `$${form.salary_min} – $${form.salary_max}` : 'Salary not set'}</p>
                <div className="jd-tags">
                  <span className="chip blue">{form.job_type}</span>
                  <span className="chip">{form.experience_level}</span>
                  <span className="chip">{form.department}</span>
                  <span className="chip">{form.work_mode}</span>
                </div>
                <p>This listing will go live immediately for all job seekers once published.</p>
              </div>
            )}

            <hr className="div" />

            <div className="step-actions">
              <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>← Previous</button>
              {step < steps.length - 1
                ? <button className="btn btn-primary btn-lg" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next: {steps[step + 1]} →</button>
                : <button className="btn btn-primary btn-lg" onClick={handlePublish} disabled={submitting}>{submitting ? 'Publishing…' : 'Publish Job'}</button>}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PostJob;
