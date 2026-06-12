import Navbar from '../components/layout/Navbar';
import SeekerSidebar from '../components/layout/SeekerSidebar';

const skills = ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Figma', 'Git', 'Node.js'];

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 2H10L14 6V16H4V2Z" stroke="currentColor" strokeWidth="1.4" /><path d="M10 2V6H14" stroke="currentColor" strokeWidth="1.4" /></svg>
);

const SeekerProfile = () => {
  return (
    <>
      <Navbar variant="seeker" current="profile" user={{ initials: 'JD', name: 'John D.' }} />

      <div className="shell">
        <SeekerSidebar current="profile" />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="page-title">My Profile</h1>
              <p className="page-sub">Keep your profile up to date — it's what employers see.</p>
            </div>
            <button className="btn btn-secondary">Preview as Employer</button>
          </div>

          <div className="card card-pad profile-completion">
            <div className="completion-head">
              <div className="completion-label">Profile Completion</div>
              <div className="completion-pct">65%</div>
            </div>
            <div className="progress"><div className="b" style={{ width: '65%' }}></div></div>
            <div className="completion-hint">Add a phone number and LinkedIn URL to reach 100%.</div>
          </div>

          <div className="profile-grid">
            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Personal Information</div>
                <button className="btn btn-ghost btn-sm">Edit</button>
              </div>
              <div className="info-grid">
                <div className="info-cell"><div className="k">Full Name</div><div className="v">John Doe</div></div>
                <div className="info-cell"><div className="k">Job Title</div><div className="v">Frontend Developer</div></div>
                <div className="info-cell"><div className="k">Email</div><div className="v">john.doe@example.com</div></div>
                <div className="info-cell"><div className="k">Phone</div><div className="v muted">— add phone</div></div>
                <div className="info-cell"><div className="k">Location</div><div className="v">Amman, Jordan</div></div>
                <div className="info-cell"><div className="k">LinkedIn</div><div className="v muted">— add link</div></div>
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Skills</div>
                <button className="btn btn-ghost btn-sm">+ Add Skill</button>
              </div>
              <div>
                {skills.map((skill) => (
                  <span className="skill-pill" key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-row-head">
                <div className="card-row-title">Resume / CV</div>
              </div>
              <div className="file-row">
                <div className="file-icon"><FileIcon /></div>
                <div className="body">
                  <div className="name">John_Doe_Resume_2026.pdf</div>
                  <div className="meta">240 KB · Updated last week</div>
                </div>
                <button className="btn btn-ghost btn-sm">Replace</button>
                <button className="btn btn-secondary btn-sm">Download</button>
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-row-title summary-title">Professional Summary</div>
              <textarea className="textarea" defaultValue="Frontend developer with 2 years of experience building React applications. Passionate about accessibility, design systems, and shipping work that respects users' time. Currently looking for a mid-level role in Amman or remote." />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SeekerProfile;
