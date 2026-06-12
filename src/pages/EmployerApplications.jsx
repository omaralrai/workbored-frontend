import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';

const applicants = [
  { initials: 'SK', name: 'Sarah Khalil', role: 'Frontend Engineer', applied: '2h ago', status: 'pending', statusLabel: 'Pending', feedback: '', placeholder: 'Add feedback for applicant…', actions: ['review', 'reject'] },
  { initials: 'OM', name: 'Omar Mansour', role: 'Software Eng Intern', applied: '5h ago', status: 'review', statusLabel: 'Under Review', avClass: 'orange', feedback: 'Strong portfolio — reviewing with team this week.', actions: ['interview', 'approve', 'reject'] },
  { initials: 'LH', name: 'Lina Habash', role: 'Frontend Engineer', applied: '8h ago', status: 'interview', statusLabel: 'Interview', avClass: 'green', feedback: 'Interview scheduled Thu 10am — calendar invite sent.', actions: ['approve', 'reject'] },
  { initials: 'YA', name: 'Yousef Awad', role: 'Product Manager', applied: '1d ago', status: 'pending', statusLabel: 'Pending', avClass: 'red', feedback: '', placeholder: 'Add feedback for applicant…', actions: ['review', 'reject'] },
  { initials: 'RN', name: 'Rana Nasser', role: 'UX Designer', applied: '1d ago', status: 'approved', statusLabel: 'Approved', fbNote: { text: 'Offer sent — congratulations!', tone: 'green' }, final: 'finalised' },
  { initials: 'KA', name: 'Khaled Atiyeh', role: 'DevOps Engineer', applied: '2d ago', status: 'review', statusLabel: 'Under Review', avClass: 'orange', feedback: 'Reviewing with the platform team — decision soon.', actions: ['interview', 'approve', 'reject'] },
  { initials: 'NH', name: 'Nour Haddad', role: 'Software Eng Intern', applied: '3d ago', status: 'rejected', statusLabel: 'Rejected', avClass: 'green', fbNote: { text: 'Looking for more backend experience this round.', tone: 'red' }, final: 'closed' },
  { initials: 'MS', name: 'Maya Sabbagh', role: 'Frontend Engineer', applied: '3d ago', status: 'interview', statusLabel: 'Interview', feedback: 'Onsite interview Mon 2pm — meet with design team.', actions: ['approve', 'reject'] },
];

const actionLabels = {
  review: { label: 'Mark as Reviewed', cls: 'btn-secondary' },
  interview: { label: 'Set Interview', cls: 'btn-secondary' },
  approve: { label: 'Approve', cls: 'btn-success' },
  reject: { label: 'Reject', cls: 'btn-danger' },
};

const EmployerApplications = () => {
  return (
    <>
      <Navbar variant="employer" current="applications" user={{ initials: 'A', name: 'Aramex' }} />

      <div className="shell">
        <EmployerSidebar current="applications" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Applications</h1>
              <p className="page-sub">142 applicants across 8 active job posts.</p>
            </div>
            <button className="btn btn-secondary">Export CSV</button>
          </div>

          <div className="legend">
            <span className="legend-title">Status legend:</span>
            <span className="item"><span className="badge pending">Pending</span> Awaiting review</span>
            <span className="item"><span className="badge review">Under Review</span> Being read</span>
            <span className="item"><span className="badge interview">Interview</span> Shortlisted</span>
            <span className="item"><span className="badge approved">Approved</span> Finalised</span>
            <span className="item"><span className="badge rejected">Rejected</span> Closed</span>
          </div>

          <div className="filter-bar">
            <input className="input" placeholder="Search applicants…" />
            <button className="select">Job: All ▾</button>
            <button className="select">Status: All ▾</button>
            <button className="select">Sort: Recent ▾</button>
          </div>

          <div className="card">
            <table className="tbl">
              <thead>
                <tr><th>Applicant</th><th>Applied For</th><th>Date</th><th>Status</th><th style={{ width: '26%' }}>Feedback to Applicant</th><th className="actions-col">Actions</th></tr>
              </thead>
              <tbody>
                {applicants.map((a) => (
                  <tr key={a.name}>
                    <td>
                      <div className="co-cell">
                        <div className={`av ${a.avClass || ''}`}>{a.initials}</div>
                        <div>
                          <div className="cell-title">{a.name}</div>
                          <div className="cell-sub link">View Application →</div>
                        </div>
                      </div>
                    </td>
                    <td>{a.role}</td>
                    <td className="muted">{a.applied}</td>
                    <td><span className={`badge ${a.status}`}>{a.statusLabel}</span></td>
                    <td>
                      {a.fbNote
                        ? <div className={`fb-note ${a.fbNote.tone}`}>{a.fbNote.text}</div>
                        : <textarea className="fb-input" placeholder={a.placeholder} defaultValue={a.feedback} />}
                    </td>
                    <td className="actions-col">
                      {a.final
                        ? <span className={a.final}>{a.final === 'finalised' ? '✓ Finalised' : '✗ Closed'}</span>
                        : a.actions.map((act) => (
                            <button className={`btn ${actionLabels[act].cls} btn-sm`} key={act}>{actionLabels[act].label}</button>
                          ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="footnote">Status changes are reflected immediately on the applicant's dashboard as in-app feedback. No emails are sent.</p>
        </main>
      </div>
    </>
  );
};

export default EmployerApplications;
