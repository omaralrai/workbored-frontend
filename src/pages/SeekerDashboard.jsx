import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#178B58" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const applications = [
  { title: 'Frontend Engineer', co: 'Aramex', logo: 'A', logoClass: '', applied: '2 days ago', status: 'interview', statusLabel: 'Interview', meaning: "You've been selected for an interview! Check for details.", fb: { text: 'Interview scheduled Thu 10am.', tone: 'blue' } },
  { title: 'UX Research Intern', co: 'Mawdoo3', logo: 'M', logoClass: 'green', applied: '5 days ago', status: 'review', statusLabel: 'Under Review', meaning: 'The employer is reviewing your application.', fb: { text: 'Strong portfolio — reviewing this week.', tone: 'orange' } },
  { title: 'QA Engineer Intern', co: 'Estarta', logo: 'E', logoClass: 'red', applied: '1 week ago', status: 'pending', statusLabel: 'Pending', meaning: 'Awaiting employer review — hang tight!', fb: null },
  { title: 'Junior Backend Developer', co: 'Optimiza', logo: 'O', logoClass: 'orange', applied: '2 weeks ago', status: 'approved', statusLabel: 'Approved', meaning: 'Congratulations! You have been approved.', fb: { text: 'Offer sent — check for details.', tone: 'green' } },
  { title: 'Mobile Developer Intern', co: 'MenaITech', logo: 'M', logoClass: '', applied: '3 weeks ago', status: 'rejected', statusLabel: 'Rejected', meaning: 'Not selected this time — keep applying!', fb: { text: 'Looking for more iOS experience.', tone: 'red' } },
];

const SeekerDashboard = () => {
  return (
    <>
      <Navbar variant="seeker" current="dashboard" user={{ initials: 'JD', name: 'John D.' }} />

      <div className="shell">
        <SeekerSidebar current="dashboard" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Welcome back, John</h1>
              <p className="page-sub">You have 12 active applications across 8 companies.</p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/jobs">Browse Jobs <ArrowIcon /></Link>
          </div>

          <div className="banner green">
            <div className="banner-icon"><CheckIcon /></div>
            <div><strong>You'll receive in-app updates</strong> every time an employer updates your status — no email needed.</div>
          </div>

          <div className="stat-row s5">
            <div className="stat-card grey"><div className="num">6</div><div className="lbl">Pending</div></div>
            <div className="stat-card orange"><div className="num">3</div><div className="lbl">Under Review</div></div>
            <div className="stat-card blue"><div className="num">1</div><div className="lbl">Interview</div></div>
            <div className="stat-card green"><div className="num">0</div><div className="lbl">Approved</div></div>
            <div className="stat-card red"><div className="num">2</div><div className="lbl">Rejected</div></div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="title">Recent Applications</div>
                <div className="sub">Latest activity from employers</div>
              </div>
              <Link className="link" to="/seeker/applications">View all →</Link>
            </div>
            <table className="tbl">
              <thead>
                <tr><th>Job Title</th><th>Company</th><th>Applied</th><th>Status</th><th style={{ width: '30%' }}>What this means</th><th style={{ width: '24%' }}>Employer Feedback</th></tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.title}>
                    <td><div className="cell-title">{app.title}</div></td>
                    <td><div className="co-cell"><div className={`co-logo sm ${app.logoClass}`}>{app.logo}</div>{app.co}</div></td>
                    <td className="muted">{app.applied}</td>
                    <td><span className={`badge ${app.status}`}>{app.statusLabel}</span></td>
                    <td>{app.meaning}</td>
                    <td>{app.fb ? <div className={`fb-note ${app.fb.tone}`}>{app.fb.text}</div> : <span className="muted no-fb">— No feedback yet</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default SeekerDashboard;
