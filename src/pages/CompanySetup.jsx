import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, updateCompany, createJob } from '../api/client';

const LogoMark = () => (
  <svg width="44" height="44" viewBox="0 0 18 18" fill="none">
    <path d="M2 3 L4.6 13 L7.2 6.8 L9.8 13 L12.4 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
  </svg>
);

const INITIAL_COMPANY = {
  name: '',
  industry: '',
  company_size: '',
  founded_year: '',
  website: '',
  headquarters: '',
  about: '',
};

const INITIAL_ROLE = {
  title: '',
  description: '',
  responsibilities: '',
  requirements: '',
};

const CompanySetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(INITIAL_COMPANY);
  const [role, setRole] = useState(INITIAL_ROLE);
  const [addRole, setAddRole] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateCompanyField = (key) => (e) => setCompany((c) => ({ ...c, [key]: e.target.value }));
  const updateRoleField = (key) => (e) => setRole((r) => ({ ...r, [key]: e.target.value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const co = await getCompanyByUser(user.id);
      await updateCompany(co.id, {
        name: company.name,
        logo_initial: company.name ? company.name[0].toUpperCase() : 'C',
        logo_color: 'blue',
        industry: company.industry,
        company_size: company.company_size,
        founded_year: company.founded_year ? Number(company.founded_year) : null,
        website: company.website,
        headquarters: company.headquarters,
        about: company.about,
      });

      if (addRole && role.title) {
        await createJob({
          company_id: co.id,
          title: role.title,
          job_type: 'full-time',
          experience_level: 'entry',
          department: '',
          location: company.headquarters,
          work_mode: 'on-site',
          salary_min: null,
          salary_max: null,
          salary_display: '',
          description: role.description,
          responsibilities: role.responsibilities,
          requirements: role.requirements,
          benefits: '',
          tags: '',
        });
      }

      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar variant="employer" />

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

            {error && <p className="form-error">{error}</p>}

            <div className="form-row"><label>Company Name</label><input className="input" value={company.name} onChange={updateCompanyField('name')} placeholder="Aramex" /></div>
            <div className="form-grid-2">
              <div className="form-row"><label>Industry</label><input className="input" value={company.industry} onChange={updateCompanyField('industry')} placeholder="Logistics" /></div>
              <div className="form-row"><label>Company Size</label><input className="input" value={company.company_size} onChange={updateCompanyField('company_size')} placeholder="5,001-10,000" /></div>
            </div>
            <div className="form-grid-2">
              <div className="form-row"><label>Founded Year</label><input className="input" type="number" value={company.founded_year} onChange={updateCompanyField('founded_year')} placeholder="1982" /></div>
              <div className="form-row"><label>Website</label><input className="input" value={company.website} onChange={updateCompanyField('website')} placeholder="aramex.com" /></div>
            </div>
            <div className="form-row"><label>Headquarters</label><input className="input" value={company.headquarters} onChange={updateCompanyField('headquarters')} placeholder="Amman, Jordan" /></div>
            <div className="form-row">
              <label>About the Company</label>
              <textarea className="textarea" rows="4" value={company.about} onChange={updateCompanyField('about')} placeholder="Tell candidates about your company…" />
            </div>

            <hr className="div" />

            <div className="role-section-head">
              <h3>First Open Role</h3>
              <span className="chip blue">Optional</span>
            </div>

            <div className="role-block">
              <div className="role-block-head">
                <div className="role-block-title">Role 1</div>
                <button className="btn btn-ghost btn-sm" onClick={() => setAddRole(false)} type="button">Remove</button>
              </div>
              {addRole ? (
                <>
                  <div className="form-row"><label>Role Title</label><input className="input" value={role.title} onChange={updateRoleField('title')} placeholder="Frontend Engineer" /></div>
                  <div className="form-row"><label>About the Role</label><textarea className="textarea" rows="2" value={role.description} onChange={updateRoleField('description')} /></div>
                  <div className="form-row"><label>Key Responsibilities</label><textarea className="textarea" rows="2" value={role.responsibilities} onChange={updateRoleField('responsibilities')} /></div>
                  <div className="form-row"><label>Requirements</label><textarea className="textarea" rows="2" value={role.requirements} onChange={updateRoleField('requirements')} /></div>
                </>
              ) : (
                <p className="muted">No role will be created. <button className="btn btn-ghost btn-sm" onClick={() => setAddRole(true)} type="button">Add one</button></p>
              )}
            </div>

            <button className="btn btn-primary btn-block btn-lg setup-submit" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Saving…' : 'Save & Go to Dashboard →'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
