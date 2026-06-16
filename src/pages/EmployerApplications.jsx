import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, getCompanyApplications, updateApplication, getSeeker } from '../api/client';

const STATUS_META = {
  pending: { cls: 'pending', label: 'Pending' },
  under_review: { cls: 'review', label: 'Under Review' },
  interview: { cls: 'interview', label: 'Interview' },
  approved: { cls: 'approved', label: 'Approved' },
  rejected: { cls: 'rejected', label: 'Rejected' },
};

const NEXT_ACTIONS = {
  pending: [
    { next: 'under_review', label: 'Mark as Reviewed', cls: 'btn-secondary' },
    { next: 'rejected', label: 'Reject', cls: 'btn-danger' },
  ],
  under_review: [
    { next: 'interview', label: 'Set Interview', cls: 'btn-secondary' },
    { next: 'approved', label: 'Approve', cls: 'btn-success' },
    { next: 'rejected', label: 'Reject', cls: 'btn-danger' },
  ],
  interview: [
    { next: 'approved', label: 'Approve', cls: 'btn-success' },
    { next: 'rejected', label: 'Reject', cls: 'btn-danger' },
  ],
};

const initials = (name) => {
  if (!name) return '??';
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');
};

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 2H10L14 6V16H4V2Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 2V6H14" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ApplicantPanel = ({ seeker, onClose }) => {
  if (!seeker) return null;

  return (
    <div className="app-panel-overlay" onClick={onClose}>
      <div className="app-panel" onClick={(e) => e.stopPropagation()}>
        <button className="app-panel-close" onClick={onClose}>✕</button>

        <div className="app-panel-hero">
          <div className="app-panel-av">{initials(seeker.full_name)}</div>
          <div>
            <div className="app-panel-name">{seeker.full_name}</div>
            <div className="app-panel-jobtitle">{seeker.job_title || 'No job title set'}</div>
          </div>
        </div>

        <div className="app-panel-section">
          <div className="app-panel-section-title">Contact & Info</div>
          <div className="app-panel-info-grid">
            <div className="app-panel-info-cell">
              <div className="k">Email</div>
              <div className="v">{seeker.email || '—'}</div>
            </div>
            <div className="app-panel-info-cell">
              <div className="k">Phone</div>
              <div className="v">{seeker.phone || '—'}</div>
            </div>
            <div className="app-panel-info-cell">
              <div className="k">Location</div>
              <div className="v">{seeker.location || '—'}</div>
            </div>
            <div className="app-panel-info-cell">
              <div className="k">LinkedIn</div>
              <div className="v">{seeker.linkedin_url || '—'}</div>
            </div>
          </div>
        </div>

        {(seeker.skills?.length > 0) && (
          <div className="app-panel-section">
            <div className="app-panel-section-title">Skills</div>
            <div className="app-panel-skills">
              {seeker.skills.map((s) => (
                <span className="app-panel-skill" key={s.id}>{s.skill_name}</span>
              ))}
            </div>
          </div>
        )}

        {seeker.professional_summary && (
          <div className="app-panel-section">
            <div className="app-panel-section-title">Professional Summary</div>
            <p className="app-panel-summary">{seeker.professional_summary}</p>
          </div>
        )}

        <div className="app-panel-section">
          <div className="app-panel-section-title">Resume / CV</div>
          {seeker.resume ? (
            <div className="app-panel-resume">
              <FileIcon />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{seeker.resume.filename}</div>
                <div className="meta">{seeker.resume.file_size_kb} KB · Uploaded {new Date(seeker.resume.uploaded_at).toLocaleDateString()}</div>
              </div>
              <a
                href={`http://localhost:5000${seeker.resume.file_path}`}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}
              >
                Download
              </a>
            </div>
          ) : (
            <p className="muted" style={{ fontSize: '13px' }}>No resume uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployerApplications = () => {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [panelSeeker, setPanelSeeker] = useState(null);
  const [panelLoading, setPanelLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    getCompanyByUser(user.id)
      .then((co) => getCompanyApplications(co.id))
      .then(setApplicants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleStatusChange = async (app, status) => {
    try {
      const updated = await updateApplication(app.id, { status, employer_feedback: feedback[app.id] ?? app.employer_feedback });
      setApplicants((prev) => prev.map((a) => (a.id === app.id ? { ...a, ...updated } : a)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFeedbackBlur = async (app) => {
    const text = feedback[app.id];
    if (text === undefined || text === app.employer_feedback) return;
    try {
      const updated = await updateApplication(app.id, { status: app.status, employer_feedback: text });
      setApplicants((prev) => prev.map((a) => (a.id === app.id ? { ...a, ...updated } : a)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewApplicant = async (seekerId) => {
    setPanelLoading(true);
    setPanelSeeker(null);
    try {
      const data = await getSeeker(seekerId);
      setPanelSeeker(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setPanelLoading(false);
    }
  };

  return (
    <>
      <Navbar variant="employer" current="applications" />

      <div className="shell">
        <EmployerSidebar current="applications" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Applications</h1>
              <p className="page-sub">{applicants.length} applicants across your job posts.</p>
            </div>
          </div>

          <div className="legend">
            <span className="legend-title">Status legend:</span>
            <span className="item"><span className="badge pending">Pending</span> Awaiting review</span>
            <span className="item"><span className="badge review">Under Review</span> Being read</span>
            <span className="item"><span className="badge interview">Interview</span> Shortlisted</span>
            <span className="item"><span className="badge approved">Approved</span> Finalised</span>
            <span className="item"><span className="badge rejected">Rejected</span> Closed</span>
          </div>

          <div className="card">
            {loading && <p className="muted card-pad">Loading applicants…</p>}
            {error && <p className="muted card-pad">Couldn't load applicants: {error}</p>}
            {!loading && !error && applicants.length === 0 && <p className="muted card-pad">No applications yet.</p>}
            {!loading && !error && applicants.length > 0 && (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Applied For</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="feedback-wide-col">Feedback to Applicant</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((a) => {
                    const meta = STATUS_META[a.status] || STATUS_META.pending;
                    const actions = NEXT_ACTIONS[a.status] || [];
                    const isFinal = a.status === 'approved' || a.status === 'rejected';

                    return (
                      <tr key={a.id}>
                        <td>
                          <div className="co-cell">
                            <div className="av">{initials(a.seeker_name)}</div>
                            <div>
                              <div className="cell-title">{a.seeker_name}</div>
                              <button
                                className="view-link"
                                onClick={() => handleViewApplicant(a.seeker_id)}
                              >
                                View Application →
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>{a.job_title}</td>
                        <td className="muted">{new Date(a.applied_at).toLocaleDateString()}</td>
                        <td><span className={`badge ${meta.cls}`}>{meta.label}</span></td>
                        <td>
                          <textarea
                            className="fb-input"
                            placeholder="Add feedback for applicant…"
                            value={feedback[a.id] ?? a.employer_feedback ?? ''}
                            onChange={(e) => setFeedback((f) => ({ ...f, [a.id]: e.target.value }))}
                            onBlur={() => handleFeedbackBlur(a)}
                          />
                        </td>
                        <td className="actions-col">
                          {isFinal
                            ? <span className={a.status === 'approved' ? 'finalised' : 'closed'}>{a.status === 'approved' ? '✓ Finalised' : '✗ Closed'}</span>
                            : actions.map((act) => (
                                <button className={`btn ${act.cls} btn-sm`} key={act.next} onClick={() => handleStatusChange(a, act.next)}>{act.label}</button>
                              ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <p className="footnote">Status changes are reflected immediately on the applicant's dashboard as in-app feedback. No emails are sent.</p>
        </main>
      </div>

      {panelLoading && (
        <div className="app-panel-overlay">
          <div className="app-panel" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <p className="muted">Loading applicant…</p>
          </div>
        </div>
      )}

      {panelSeeker && !panelLoading && (
        <ApplicantPanel seeker={panelSeeker} onClose={() => setPanelSeeker(null)} />
      )}
    </>
  );
};

export default EmployerApplications;
