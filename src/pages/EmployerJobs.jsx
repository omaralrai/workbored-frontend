import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';
import { useAuth } from '../context/AuthContext';
import { getCompanyByUser, getCompanyJobs, updateJobStatus, deleteJob } from '../api/client';

const EmployerJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getCompanyByUser(user.id)
      .then((co) => getCompanyJobs(co.id))
      .then(setJobs)
      .catch((err) => setError(err.message));
  }, [user]);

  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatus(jobId, status);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this job post? This cannot be undone.')) return;
    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err) {
      setError(err.message);
    }
  };

  const active = jobs.filter((j) => j.status === 'active').length;

  return (
    <>
      <Navbar variant="employer" current="jobs" />

      <div className="shell">
        <EmployerSidebar current="jobs" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">My Job Posts</h1>
              <p className="page-sub">{active} active · {jobs.length} total</p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/employer/post-job">+ Post a Job</Link>
          </div>

          {error && <p className="muted">{error}</p>}

          {jobs.length === 0 ? (
            <div className="card card-pad">
              <p className="muted">No job posts yet. <Link className="link" to="/employer/post-job">Post your first job →</Link></p>
            </div>
          ) : (
            <div className="card">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Applicants</th>
                    <th>Status</th>
                    <th>Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div className="cell-title">{job.title}</div>
                        {job.department && <div className="cell-sub">{job.department}</div>}
                      </td>
                      <td><span className="chip">{job.job_type}</span></td>
                      <td className="muted">{job.location || '—'}</td>
                      <td><strong>{job.applicant_count ?? 0}</strong></td>
                      <td>
                        <select
                          className="input"
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          style={{ padding: '3px 6px', fontSize: '0.8rem', width: 'auto' }}
                        >
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="muted">{new Date(job.posted_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ color: '#e53e3e' }}
                          onClick={() => handleDelete(job.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EmployerJobs;
