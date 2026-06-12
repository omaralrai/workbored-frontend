import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';

const jobPosts = [
  { title: 'Frontend Engineer', type: 'Full-time', applicants: 42, status: 'active', posted: '2d ago' },
  { title: 'Software Engineering Intern', type: 'Internship', applicants: 38, status: 'active', posted: '4d ago' },
  { title: 'Product Manager', type: 'Full-time', applicants: 21, status: 'active', posted: '1w ago' },
  { title: 'DevOps Engineer', type: 'Full-time', applicants: 17, status: 'paused', posted: '2w ago' },
  { title: 'UX Designer', type: 'Full-time', applicants: 24, status: 'active', posted: '3w ago' },
];

const recentApplicants = [
  { initials: 'SK', name: 'Sarah Khalil', role: 'Frontend Engineer · 2h ago', status: 'pending', statusLabel: 'Pending' },
  { initials: 'OM', name: 'Omar Mansour', role: 'Software Eng Intern · 5h ago', status: 'review', statusLabel: 'Review', avClass: 'orange' },
  { initials: 'LH', name: 'Lina Habash', role: 'Frontend Engineer · 8h ago', status: 'interview', statusLabel: 'Interview', avClass: 'green' },
  { initials: 'YA', name: 'Yousef Awad', role: 'Product Manager · 1d ago', status: 'pending', statusLabel: 'Pending', avClass: 'red' },
  { initials: 'RN', name: 'Rana Nasser', role: 'UX Designer · 1d ago', status: 'approved', statusLabel: 'Approved' },
];

const EmployerDashboard = () => {
  return (
    <>
      <Navbar variant="employer" current="dashboard" user={{ initials: 'A', name: 'Aramex' }} />

      <div className="shell">
        <EmployerSidebar current="dashboard" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-sub">Overview of your active hiring at Aramex.</p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/employer/post-job">+ Post a Job</Link>
          </div>

          <div className="stat-row s4">
            <div className="stat-card blue"><div className="num">8</div><div className="lbl">Active Listings</div></div>
            <div className="stat-card green"><div className="num">142</div><div className="lbl">Total Applicants</div></div>
            <div className="stat-card orange"><div className="num">24</div><div className="lbl">New This Week</div></div>
            <div className="stat-card blue"><div className="num">6</div><div className="lbl">Interviews Set</div></div>
          </div>

          <div className="dash-grid">
            <div className="card">
              <div className="card-head">
                <div>
                  <div className="title">Job Posts</div>
                  <div className="sub">Your most recent listings</div>
                </div>
                <Link className="link" to="/employer/post-job">View all →</Link>
              </div>
              <table className="tbl">
                <thead><tr><th>Title</th><th>Type</th><th>Applicants</th><th>Status</th><th>Posted</th><th></th></tr></thead>
                <tbody>
                  {jobPosts.map((job) => (
                    <tr key={job.title}>
                      <td><div className="cell-title">{job.title}</div></td>
                      <td><span className="chip">{job.type}</span></td>
                      <td><strong>{job.applicants}</strong></td>
                      <td><span className={`badge ${job.status}`}>{job.status === 'active' ? 'Active' : 'Paused'}</span></td>
                      <td className="muted">{job.posted}</td>
                      <td className="actions-col"><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-head">
                <div>
                  <div className="title">Recent Applications</div>
                  <div className="sub">Latest submissions</div>
                </div>
              </div>
              <div className="applicant-list">
                {recentApplicants.map((a) => (
                  <div className="applicant-row" key={a.name}>
                    <div className={`av ${a.avClass || ''}`}>{a.initials}</div>
                    <div className="info">
                      <div className="name">{a.name}</div>
                      <div className="role">{a.role}</div>
                    </div>
                    <span className={`badge ${a.status}`}>{a.statusLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployerDashboard;
