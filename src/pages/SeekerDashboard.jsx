import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';
import { useAuth } from '../context/AuthContext';
import { getSeekerByUser, getSeekerApplications } from '../api/client';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#178B58" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const STATUS_META = {
  pending: { cls: 'pending', label: 'Pending', meaning: 'Awaiting employer review — hang tight!' },
  under_review: { cls: 'review', label: 'Under Review', meaning: 'The employer is reviewing your application.' },
  interview: { cls: 'interview', label: 'Interview', meaning: "You've been selected for an interview! Check for details." },
  approved: { cls: 'approved', label: 'Approved', meaning: 'Congratulations! You have been approved.' },
  rejected: { cls: 'rejected', label: 'Rejected', meaning: 'Not selected this time — keep applying!' },
};

const SeekerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    getSeekerByUser(user.id)
      .then((seeker) => getSeekerApplications(seeker.id))
      .then((apps) => setApplications(apps.filter((a) => !a.is_withdrawn)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const counts = applications.reduce(
    (acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }),
    {}
  );

  return (
    <>
      <Navbar variant="seeker" current="dashboard" />

      <div className="shell">
        <SeekerSidebar current="dashboard" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Welcome back, {user?.full_name?.split(' ')[0]}</h1>
              <p className="page-sub">You have {applications.length} active applications.</p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/jobs">Browse Jobs <ArrowIcon /></Link>
          </div>

          <div className="banner green">
            <div className="banner-icon"><CheckIcon /></div>
            <div><strong>You'll receive in-app updates</strong> every time an employer updates your status — no email needed.</div>
          </div>

          <div className="stat-row s5">
            <div className="stat-card grey"><div className="num">{counts.pending || 0}</div><div className="lbl">Pending</div></div>
            <div className="stat-card orange"><div className="num">{counts.under_review || 0}</div><div className="lbl">Under Review</div></div>
            <div className="stat-card blue"><div className="num">{counts.interview || 0}</div><div className="lbl">Interview</div></div>
            <div className="stat-card green"><div className="num">{counts.approved || 0}</div><div className="lbl">Approved</div></div>
            <div className="stat-card red"><div className="num">{counts.rejected || 0}</div><div className="lbl">Rejected</div></div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="title">Recent Applications</div>
                <div className="sub">Latest activity from employers</div>
              </div>
              <Link className="link" to="/seeker/applications">View all →</Link>
            </div>
            {loading && <p className="muted card-pad">Loading applications…</p>}
            {error && <p className="muted card-pad">Couldn't load applications: {error}</p>}
            {!loading && !error && applications.length === 0 && <p className="muted card-pad">No applications yet — go browse jobs!</p>}
            {!loading && !error && applications.length > 0 && (
              <table className="tbl">
                <thead>
                  <tr><th>Job Title</th><th>Company</th><th>Applied</th><th>Status</th><th className="meaning-col">What this means</th><th className="feedback-col">Employer Feedback</th></tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map((app) => {
                    const meta = STATUS_META[app.status] || STATUS_META.pending;
                    return (
                      <tr key={app.id}>
                        <td><div className="cell-title">{app.job_title}</div></td>
                        <td><div className="co-cell"><div className={`co-logo sm ${app.logo_color && app.logo_color !== 'blue' ? app.logo_color : ''}`}>{app.logo_initial}</div>{app.company_name}</div></td>
                        <td className="muted">{new Date(app.applied_at).toLocaleDateString()}</td>
                        <td><span className={`badge ${meta.cls}`}>{meta.label}</span></td>
                        <td>{meta.meaning}</td>
                        <td>{app.employer_feedback ? <div className="fb-note blue">{app.employer_feedback}</div> : <span className="muted no-fb">— No feedback yet</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default SeekerDashboard;
