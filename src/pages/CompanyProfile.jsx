import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompany, getCompanyByUser, getCompanyJobs, updateCompany } from '../api/client';

const EDIT_FIELDS = [
  { key: 'industry', label: 'Industry', placeholder: 'e.g. Logistics' },
  { key: 'company_size', label: 'Company Size', placeholder: 'e.g. 5,001–10,000' },
  { key: 'founded_year', label: 'Founded Year', placeholder: 'e.g. 1982', type: 'number' },
  { key: 'website', label: 'Website', placeholder: 'e.g. aramex.com' },
  { key: 'headquarters', label: 'Headquarters', placeholder: 'e.g. Amman, Jordan' },
];

const CompanyProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = id === 'me' && user
      ? getCompanyByUser(user.id)
      : getCompany(id);

    load
      .then((co) => {
        setCompany(co);
        setForm({
          name: co.name || '',
          industry: co.industry || '',
          company_size: co.company_size || '',
          founded_year: co.founded_year || '',
          website: co.website || '',
          headquarters: co.headquarters || '',
          about: co.about || '',
        });
        return getCompanyJobs(co.id);
      })
      .then(setRoles)
      .catch((err) => setError(err.message));
  }, [id, user]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const updated = await updateCompany(company.id, {
        name: form.name,
        logo_initial: form.name ? form.name[0].toUpperCase() : company.logo_initial,
        logo_color: company.logo_color || 'blue',
        industry: form.industry,
        company_size: form.company_size,
        founded_year: form.founded_year ? Number(form.founded_year) : null,
        website: form.website,
        headquarters: form.headquarters,
        about: form.about,
      });
      setCompany((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error && !company) return <p className="muted card-pad">Couldn't load company: {error}</p>;
  if (!company) return <p className="muted card-pad">Loading company…</p>;

  const details = [
    { k: 'Industry', v: company.industry || '—' },
    { k: 'Company Size', v: company.company_size || '—' },
    { k: 'Founded', v: company.founded_year || '—' },
    { k: 'Website', v: company.website || '—', link: !!company.website },
    { k: 'Headquarters', v: company.headquarters || '—' },
    { k: 'Open Roles', v: `${roles.filter((r) => r.status === 'active').length} active` },
  ];

  const isOwner = user?.role === 'employer';

  return (
    <>
      <Navbar variant={isOwner ? 'employer' : 'seeker'} current="company" />

      <div className="shell">
        {isOwner && <EmployerSidebar current="company" />}

        <main className={isOwner ? 'main' : 'main no-side'}>
          <div className="page-head">
            <div>
              <h1 className="page-title">Company Profile</h1>
              <p className="page-sub">This is what job seekers see when they view your company.</p>
            </div>
            {isOwner && (
              editing
                ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                  </div>
                )
                : <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>

          {error && <p className="muted">{error}</p>}

          <div className="card card-pad co-header">
            <div className={`co-logo xl ${company.logo_color && company.logo_color !== 'blue' ? company.logo_color : ''}`}>{company.logo_initial}</div>
            <div className="co-header-body">
              {editing
                ? <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Company Name" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }} />
                : <div className="co-header-name">{company.name}</div>}
              <div className="co-meta">
                <span><strong>{company.industry || 'Industry n/a'}</strong></span>
                <span>•</span>
                <span>{company.company_size || 'Size n/a'}</span>
                <span>•</span>
                <span>{company.founded_year ? `Founded ${company.founded_year}` : 'Founded n/a'}</span>
                <span>•</span>
                <span className="link">{company.website || '—'}</span>
                <span>•</span>
                <span>{company.headquarters || '—'}</span>
              </div>
            </div>
          </div>

          <div className="profile-row">
            <div className="card card-pad">
              <div className="card-title">Company Details</div>
              {editing ? (
                <div className="info-grid">
                  {EDIT_FIELDS.map(({ key, label, placeholder, type }) => (
                    <div className="info-cell" key={key}>
                      <div className="k">{label}</div>
                      <input
                        className="input"
                        type={type || 'text'}
                        value={form[key]}
                        placeholder={placeholder}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="detail-grid">
                  {details.map((d) => (
                    <div className="detail-cell" key={d.k}>
                      <div className="k">{d.k}</div>
                      <div className={`v ${d.link ? 'link' : ''}`}>{d.v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card card-pad">
              <div className="card-title">About</div>
              {editing
                ? <textarea className="textarea" rows="6" value={form.about} onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))} placeholder="Tell candidates about your company…" />
                : <p className="about-text">{company.about || 'No company description yet.'}</p>}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="title">Open Roles</div>
                <div className="sub">{roles.filter((r) => r.status === 'active').length} active listings</div>
              </div>
            </div>
            {roles.length === 0
              ? <p className="muted card-pad">No roles posted yet.</p>
              : (
                <table className="tbl">
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id}>
                        <td><div className="cell-title">{role.title}</div><div className="cell-sub">{role.job_type} · {role.location} · {role.experience_level}</div></td>
                        <td className="muted">{role.salary_display}</td>
                        <td><span className={`badge ${role.status}`}>{role.status === 'active' ? 'Active' : role.status === 'paused' ? 'Paused' : 'Closed'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CompanyProfile;
