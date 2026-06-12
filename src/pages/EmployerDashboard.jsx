import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, getCompanyJobs, getCompanyApplications } from '../api/client';

const STATUS_META = {
  pending: { cls: 'pending', label: 'Pending' },
  under_review: { cls: 'review', label: 'Review' },
  interview: { cls: 'interview', label: 'Interview' },
  approved: { cls: 'approved', label: 'Approved' },
  rejected: { cls: 'rejected', label: 'Rejected' },
};

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    getCompanyByUser(user.id)
      .then((co) => {
        setCompany(co);
        return Promise.all([getCompanyJobs(co.id), getCompanyApplications(co.id)]);
      })
      .then(([jobsData, appsData]) => {
        setJobs(jobsData);
        setApplicants(appsData);
      })
      .catch((err) => setError(err.message));
  }, [user]);

  const activeListings = jobs.filter((j) => j.status === 'active').length;
  const totalApplicants = applicants.length;
  const interviewsSet = applicants.filter((a) => a.status === 'interview').length;
  const newThisWeek = applicants.filter((a) => {
    const days = (Date.now() - new Date(a.applied_at).getTime()) / 86400000;
    return days <= 7;
  }).length;

  return (
    <>
      <Navbar variant="employer" current="dashboard" />

      <div className="shell">
        <EmployerSidebar current="dashboard" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-sub">Overview of your active hiring at {company?.name || '…'}.</p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/employer/post-job">+ Post a Job</Link>
          </div>

          {error && <p className="muted">Couldn't load dashboard data: {error}</p>}

          <div className="stat-row s4">
            <div className="stat-card blue"><div className="num">{activeListings}</div><div className="lbl">Active Listings</div></div>
            <div className="stat-card green"><div className="num">{totalApplicants}</div><div className="lbl">Total Applicants</div></div>
            <div className="stat-card orange"><div className="num">{newThisWeek}</div><div className="lbl">New This Week</div></div>
            <div className="stat-card blue"><div className="num">{interviewsSet}</div><div className="lbl">Interviews Set</div></div>
          </div>

          <div className="dash-grid">
            <div className="card">
              <div className="card-head">
                <div>
                  <div className="title">Job Posts</div>
                  <div className="sub">Your most recent listings</div>
                </div>
                <Link className="link" to="/employer/post-job">+ Post a Job</Link>
              </div>
              {jobs.length === 0
                ? <p className="muted card-pad">No job posts yet.</p>
                : (
                  <table className="tbl">
                    <thead><tr><th>Title</th><th>Type</th><th>Applicants</th><th>Status</th><th>Posted</th></tr></thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td><div className="cell-title">{job.title}</div></td>
                          <td><span className="chip">{job.job_type}</span></td>
                          <td><strong>{job.applicant_count}</strong></td>
                          <td><span className={`badge ${job.status}`}>{job.status === 'active' ? 'Active' : job.status === 'paused' ? 'Paused' : 'Closed'}</span></td>
                          <td className="muted">{new Date(job.posted_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>

            <div className="card">
              <div className="card-head">
                <div>
                  <div className="title">Recent Applications</div>
                  <div className="sub">Latest submissions</div>
                </div>
                <Link className="link" to="/employer/applications">View all →</Link>
              </div>
              {applicants.length === 0
                ? <p className="muted card-pad">No applications yet.</p>
                : (
                  <div className="applicant-list">
                    {applicants.slice(0, 5).map((a) => {
                      const meta = STATUS_META[a.status] || STATUS_META.pending;
                      return (
                        <div className="applicant-row" key={a.id}>
                          <div className="av">{a.seeker_name?.split(' ').map((n) => n[0]).slice(0, 2).join('')}</div>
                          <div className="info">
                            <div className="name">{a.seeker_name}</div>
                            <div className="role">{a.job_title} · {new Date(a.applied_at).toLocaleDateString()}</div>
                          </div>
                          <span className={`badge ${meta.cls}`}>{meta.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployerDashboard;
