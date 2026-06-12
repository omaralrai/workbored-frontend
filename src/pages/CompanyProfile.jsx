import Navbar from '../components/layout/Navbar';
import EmployerSidebar from '../components/layout/EmployerSidebar';

const details = [
  { k: 'Industry', v: 'Logistics & Shipping' },
  { k: 'Company Size', v: '5,001–10,000 employees' },
  { k: 'Founded', v: '1982' },
  { k: 'Website', v: 'aramex.com', link: true },
  { k: 'Headquarters', v: 'Amman, Jordan' },
  { k: 'Open Roles', v: '8 active' },
];

const roles = [
  { title: 'Frontend Engineer', meta: 'Full-time · Amman · Mid-level', salary: '$28k – $36k' },
  { title: 'Software Engineering Intern', meta: 'Internship · Amman · Entry', salary: 'Stipend' },
  { title: 'Product Manager', meta: 'Full-time · Amman · Mid-level', salary: '$38k – $52k' },
  { title: 'UX Designer', meta: 'Full-time · Amman · Mid-level', salary: '$30k – $42k' },
];

const CompanyProfile = () => {
  return (
    <>
      <Navbar variant="employer" current="company" user={{ initials: 'A', name: 'Aramex' }} />

      <div className="shell">
        <EmployerSidebar current="company" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">Company Profile</h1>
              <p className="page-sub">This is what job seekers see when they view your company.</p>
            </div>
            <button className="btn btn-secondary">Edit Profile</button>
          </div>

          <div className="card card-pad co-header">
            <div className="co-logo xl">A</div>
            <div className="co-header-body">
              <div className="co-header-name">Aramex</div>
              <div className="co-meta">
                <span><strong>Logistics</strong></span>
                <span>•</span>
                <span>5,000+ employees</span>
                <span>•</span>
                <span>Founded 1982</span>
                <span>•</span>
                <span className="link">aramex.com</span>
                <span>•</span>
                <span>Amman, Jordan</span>
              </div>
            </div>
          </div>

          <div className="profile-row">
            <div className="card card-pad">
              <div className="card-title">Company Details</div>
              <div className="detail-grid">
                {details.map((d) => (
                  <div className="detail-cell" key={d.k}>
                    <div className="k">{d.k}</div>
                    <div className={`v ${d.link ? 'link' : ''}`}>{d.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-title">About</div>
              <p className="about-text">Aramex is a global provider of comprehensive logistics and transportation solutions. Headquartered in Amman, Jordan, the company operates a network of more than 600 offices across 65 countries. We serve millions of customers worldwide with shipping, e-commerce, and supply chain services — and we're always looking for talented engineers, designers and operators to grow with us.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="title">Open Roles</div>
                <div className="sub">8 active listings</div>
              </div>
              <span className="link">Manage all →</span>
            </div>
            <table className="tbl">
              <tbody>
                {roles.map((role) => (
                  <tr key={role.title}>
                    <td><div className="cell-title">{role.title}</div><div className="cell-sub">{role.meta}</div></td>
                    <td className="muted">{role.salary}</td>
                    <td><span className="badge active">Active</span></td>
                    <td className="actions-col"><button className="btn btn-secondary btn-sm">View Details</button></td>
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

export default CompanyProfile;
