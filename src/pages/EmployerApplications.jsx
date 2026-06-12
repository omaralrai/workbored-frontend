import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, getCompanyApplications, updateApplication } from '../api/client';

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

const EmployerApplications = () => {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
                  <tr><th>Applicant</th><th>Applied For</th><th>Date</th><th>Status</th><th className="feedback-wide-col">Feedback to Applicant</th><th className="actions-col">Actions</th></tr>
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
                            <div className="av">{a.seeker_name?.split(' ').map((n) => n[0]).slice(0, 2).join('')}</div>
                            <div><div className="cell-title">{a.seeker_name}</div></div>
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
    </>
  );
};

export default EmployerApplications;
