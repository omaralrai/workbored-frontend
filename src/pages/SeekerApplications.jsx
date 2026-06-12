import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';
import { useAuth } from '../context/AuthContext';
import { getSeekerByUser, getSeekerApplications, withdrawApplication } from '../api/client';

const STATUS_META = {
  pending: { cls: 'pending', label: 'Pending' },
  under_review: { cls: 'review', label: 'Under Review' },
  interview: { cls: 'interview', label: 'Interview' },
  approved: { cls: 'approved', label: 'Approved' },
  rejected: { cls: 'rejected', label: 'Rejected' },
};

const TAB_KEYS = ['All', 'Pending', 'Under Review', 'Interview', 'Approved', 'Rejected'];
const TAB_STATUS = { Pending: 'pending', 'Under Review': 'under_review', Interview: 'interview', Approved: 'approved', Rejected: 'rejected' };

const SeekerApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;

    getSeekerByUser(user.id)
      .then((seeker) => getSeekerApplications(seeker.id))
      .then((apps) => setApplications(apps.filter((a) => !a.is_withdrawn)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleWithdraw = async (id) => {
    try {
      await withdrawApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const counts = applications.reduce(
    (acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }),
    {}
  );

  const filtered = activeTab === 'All' ? applications : applications.filter((a) => a.status === TAB_STATUS[activeTab]);

  return (
    <>
      <Navbar variant="seeker" current="applications" />

      <div className="shell">
        <SeekerSidebar current="applications" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">My Applications</h1>
              <p className="page-sub">Track every role you've applied to and its current status.</p>
            </div>
          </div>

          <div className="tabs">
            {TAB_KEYS.map((tab) => (
              <div className={`tab ${activeTab === tab ? 'active' : ''}`} key={tab} onClick={() => setActiveTab(tab)}>
                {tab} <span className="count">{tab === 'All' ? applications.length : (counts[TAB_STATUS[tab]] || 0)}</span>
              </div>
            ))}
          </div>

          <div className="card">
            {loading && <p className="muted card-pad">Loading applications…</p>}
            {error && <p className="muted card-pad">Couldn't load applications: {error}</p>}
            {!loading && !error && filtered.length === 0 && <p className="muted card-pad">No applications in this category.</p>}
            {!loading && !error && filtered.length > 0 && (
              <table className="tbl">
                <thead>
                  <tr><th>Company</th><th>Job Title</th><th>Applied</th><th>Status</th><th className="feedback-col">Employer Feedback</th><th className="actions-col">Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((app) => {
                    const meta = STATUS_META[app.status] || STATUS_META.pending;
                    return (
                      <tr key={app.id}>
                        <td><div className="co-cell"><div className={`co-logo sm ${app.logo_color && app.logo_color !== 'blue' ? app.logo_color : ''}`}>{app.logo_initial}</div>{app.company_name}</div></td>
                        <td><div className="cell-title">{app.job_title}</div><div className="cell-sub">{app.job_type} · {app.location}</div></td>
                        <td className="muted">{new Date(app.applied_at).toLocaleDateString()}</td>
                        <td><span className={`badge ${meta.cls}`}>{meta.label}</span></td>
                        <td>{app.employer_feedback ? <div className="fb-note blue">{app.employer_feedback}</div> : <span className="muted no-fb">— No feedback yet</span>}</td>
                        <td className="actions-col">
                          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(app)}>View Job</button>
                          {app.status === 'pending' && <button className="btn btn-danger btn-sm" onClick={() => handleWithdraw(app.id)}>Withdraw</button>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="modal">
            <div className="modal-head">
              <div className="modal-head-info">
                <div className={`co-logo modal-logo ${selected.logo_color && selected.logo_color !== 'blue' ? selected.logo_color : ''}`}>{selected.logo_initial}</div>
                <div>
                  <div className="modal-title">{selected.job_title}</div>
                  <div className="modal-co">{selected.company_name}</div>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-status-row">
                <div>
                  <div className="modal-status-eyebrow">Your Application Status</div>
                  <div className="modal-status-text">{(STATUS_META[selected.status] || STATUS_META.pending).label} — applied {new Date(selected.applied_at).toLocaleDateString()}</div>
                </div>
                <span className={`badge ${(STATUS_META[selected.status] || STATUS_META.pending).cls}`}>{(STATUS_META[selected.status] || STATUS_META.pending).label}</span>
              </div>
              <div className="modal-section">
                <h4>Employer Feedback</h4>
                {selected.employer_feedback ? <div className="fb-note blue">{selected.employer_feedback}</div> : <div className="fb-note blue">No feedback yet.</div>}
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
                <Link className="btn btn-primary" to={`/jobs/${selected.job_id}`}>Open Full Page →</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeekerApplications;
