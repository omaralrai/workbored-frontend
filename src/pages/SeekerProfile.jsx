import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';
import { useAuth } from '../context/AuthContext';
import { getSeekerByUser, updateSeeker, addSeekerSkill, removeSeekerSkill } from '../api/client';

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 2H10L14 6V16H4V2Z" stroke="currentColor" strokeWidth="1.4" /><path d="M10 2V6H14" stroke="currentColor" strokeWidth="1.4" /></svg>
);

const FIELDS = [
  { key: 'job_title', label: 'Job Title' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'linkedin_url', label: 'LinkedIn' },
];

const SeekerProfile = () => {
  const { user } = useAuth();
  const [seeker, setSeeker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    getSeekerByUser(user.id)
      .then((data) => {
        setSeeker(data);
        setForm({
          job_title: data.job_title || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedin_url: data.linkedin_url || '',
        });
        setSummary(data.professional_summary || '');
      })
      .catch((err) => setError(err.message));
  }, [user]);

  const completion = () => {
    if (!seeker) return 0;
    const fields = [seeker.job_title, seeker.phone, seeker.location, seeker.linkedin_url, seeker.professional_summary, seeker.resume];
    const filled = fields.filter(Boolean).length + (seeker.skills?.length ? 1 : 0);
    return Math.round((filled / (fields.length + 1)) * 100);
  };

  const handleSaveInfo = async () => {
    try {
      const updated = await updateSeeker(seeker.id, {
        job_title: form.job_title,
        phone: form.phone,
        location: form.location,
        linkedin_url: form.linkedin_url,
        professional_summary: summary,
      });
      setSeeker((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveSummary = async () => {
    try {
      const updated = await updateSeeker(seeker.id, {
        job_title: seeker.job_title,
        phone: seeker.phone,
        location: seeker.location,
        linkedin_url: seeker.linkedin_url,
        professional_summary: summary,
      });
      setSeeker((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const skill = await addSeekerSkill(seeker.id, newSkill.trim());
      setSeeker((prev) => ({ ...prev, skills: [...(prev.skills || []), skill] }));
      setNewSkill('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveSkill = async (skillId) => {
    try {
      await removeSeekerSkill(seeker.id, skillId);
      setSeeker((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== skillId) }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="muted card-pad">Couldn't load profile: {error}</p>;
  if (!seeker) return <p className="muted card-pad">Loading profile…</p>;

  return (
    <>
      <Navbar variant="seeker" current="profile" />

      <div className="shell">
        <SeekerSidebar current="profile" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">My Profile</h1>
              <p className="page-sub">Keep your profile up to date — it's what employers see.</p>
            </div>
          </div>

          <div className="card card-pad profile-completion">
            <div className="completion-head">
              <div className="completion-label">Profile Completion</div>
              <div className="completion-pct">{completion()}%</div>
            </div>
            <div className="progress"><div className="b" style={{ width: `${completion()}%` }}></div></div>
            <div className="completion-hint">Fill in every field below to reach 100%.</div>
          </div>

          <div className="profile-grid">
            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Personal Information</div>
                {editing
                  ? <button className="btn btn-primary btn-sm" onClick={handleSaveInfo}>Save</button>
                  : <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>Edit</button>}
              </div>
              <div className="info-grid">
                <div className="info-cell"><div className="k">Full Name</div><div className="v">{user.full_name}</div></div>
                <div className="info-cell"><div className="k">Email</div><div className="v">{user.email}</div></div>
                {FIELDS.map(({ key, label }) => (
                  <div className="info-cell" key={key}>
                    <div className="k">{label}</div>
                    {editing
                      ? <input className="input" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                      : <div className={`v ${!seeker[key] ? 'muted' : ''}`}>{seeker[key] || `— add ${label.toLowerCase()}`}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Skills</div>
              </div>
              <div className="skill-add-row">
                <input className="input" placeholder="Add a skill…" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} />
                <button className="btn btn-secondary btn-sm" onClick={handleAddSkill}>+ Add</button>
              </div>
              <div>
                {(seeker.skills || []).map((skill) => (
                  <span className="skill-pill" key={skill.id}>
                    {skill.skill_name}
                    <button className="skill-remove" onClick={() => handleRemoveSkill(skill.id)}>×</button>
                  </span>
                ))}
                {(!seeker.skills || seeker.skills.length === 0) && <p className="muted">No skills added yet.</p>}
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Resume / CV</div>
              </div>
              {seeker.resume ? (
                <div className="file-row">
                  <div className="file-icon"><FileIcon /></div>
                  <div className="body">
                    <div className="name">{seeker.resume.filename}</div>
                    <div className="meta">{seeker.resume.file_size_kb} KB · Updated {new Date(seeker.resume.uploaded_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ) : (
                <p className="muted">No resume uploaded yet.</p>
              )}
            </div>

            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title summary-title">Professional Summary</div>
                <button className="btn btn-ghost btn-sm" onClick={handleSaveSummary}>Save</button>
              </div>
              <textarea className="textarea" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SeekerProfile;
