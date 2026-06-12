import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';

const applications = [
  { co: 'Aramex', logo: 'A', logoClass: '', title: 'Frontend Engineer', type: 'Full-time · Amman', applied: '2 days ago', status: 'interview', statusLabel: 'Interview', fb: { text: 'Interview Thu 10am — link in messages.', tone: 'blue' }, withdraw: false },
  { co: 'Mawdoo3', logo: 'M', logoClass: 'green', title: 'UX Research Intern', type: 'Internship · Remote', applied: '5 days ago', status: 'review', statusLabel: 'Under Review', fb: { text: 'Strong portfolio — reviewing this week.', tone: 'orange' }, withdraw: false },
  { co: 'Estarta', logo: 'E', logoClass: 'red', title: 'QA Engineer Intern', type: 'Internship · Amman', applied: '1 week ago', status: 'pending', statusLabel: 'Pending', fb: null, withdraw: true },
  { co: 'Optimiza', logo: 'O', logoClass: 'orange', title: 'Junior Backend Developer', type: 'Full-time · Hybrid', applied: '2 weeks ago', status: 'approved', statusLabel: 'Approved', fb: { text: 'Offer sent — congratulations!', tone: 'green' }, withdraw: false },
  { co: 'MenaITech', logo: 'M', logoClass: '', title: 'Mobile Developer Intern', type: 'Internship · Amman', applied: '3 weeks ago', status: 'rejected', statusLabel: 'Rejected', fb: { text: 'Looking for more iOS experience.', tone: 'red' }, withdraw: false },
  { co: 'Hikma', logo: 'H', logoClass: 'orange', title: 'Data Analyst', type: 'Full-time · Amman', applied: '3 weeks ago', status: 'review', statusLabel: 'Under Review', fb: { text: 'Reviewed by hiring manager — decision soon.', tone: 'orange' }, withdraw: false },
  { co: 'Aramex', logo: 'A', logoClass: '', title: 'Software Engineering Intern', type: 'Internship · Amman', applied: '4 weeks ago', status: 'pending', statusLabel: 'Pending', fb: null, withdraw: true },
];

const tabs = [
  { label: 'All', count: 12, active: true },
  { label: 'Pending', count: 6 },
  { label: 'Under Review', count: 3 },
  { label: 'Interview', count: 1 },
  { label: 'Approved', count: 0 },
  { label: 'Rejected', count: 2 },
];

const SeekerApplications = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Navbar variant="seeker" current="applications" user={{ initials: 'JD', name: 'John D.' }} />

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
            {tabs.map((tab) => (
              <div className={`tab ${tab.active ? 'active' : ''}`} key={tab.label}>{tab.label} <span className="count">{tab.count}</span></div>
            ))}
          </div>

          <div className="card">
            <table className="tbl">
              <thead>
                <tr><th>Company</th><th>Job Title</th><th>Applied</th><th>Status</th><th style={{ width: '24%' }}>Employer Feedback</th><th className="actions-col">Actions</th></tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i}>
                    <td><div className="co-cell"><div className={`co-logo sm ${app.logoClass}`}>{app.logo}</div>{app.co}</div></td>
                    <td><div className="cell-title">{app.title}</div><div className="cell-sub">{app.type}</div></td>
                    <td className="muted">{app.applied}</td>
                    <td><span className={`badge ${app.status}`}>{app.statusLabel}</span></td>
                    <td>{app.fb ? <div className={`fb-note ${app.fb.tone}`}>{app.fb.text}</div> : <span className="muted no-fb">— No feedback yet</span>}</td>
                    <td className="actions-col">
                      <button className="btn btn-secondary btn-sm" onClick={() => setSelected(app)}>View Job</button>
                      {app.withdraw && <button className="btn btn-danger btn-sm">Withdraw</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="modal">
            <div className="modal-head">
              <div className="modal-head-info">
                <div className={`co-logo modal-logo ${selected.logoClass}`}>{selected.logo}</div>
                <div>
                  <div className="modal-title">{selected.title}</div>
                  <div className="modal-co">{selected.co}</div>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-status-row">
                <div>
                  <div className="modal-status-eyebrow">Your Application Status</div>
                  <div className="modal-status-text">{selected.statusLabel} — applied {selected.applied}</div>
                </div>
                <span className={`badge ${selected.status}`}>{selected.statusLabel}</span>
              </div>
              <div className="modal-section"><h4>About the Role</h4><p>You'll join the team to ship customer-facing features end-to-end, from design to deploy.</p></div>
              <div className="modal-section"><h4>Requirements</h4><ul><li>Relevant coursework or 1–2 years experience</li><li>Strong fundamentals in your stack</li><li>Good communication and ownership</li></ul></div>
              <div className="modal-section">
                <h4>Employer Feedback</h4>
                {selected.fb ? <div className={`fb-note ${selected.fb.tone}`}>{selected.fb.text}</div> : <div className="fb-note blue">No feedback yet.</div>}
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
                <Link className="btn btn-primary" to="/jobs/1">Open Full Page →</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeekerApplications;
