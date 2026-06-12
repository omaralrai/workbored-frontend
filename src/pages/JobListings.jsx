import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const jobs = [
  {
    id: 1, initial: 'A', title: 'Frontend Engineer', co: 'Aramex · Amman, Jordan',
    tags: [{ label: 'Full-time', blue: true }, { label: 'On-site' }, { label: 'Mid-level' }, { label: 'React · TypeScript' }],
    salary: '$28,000 – $36,000 / year',
  },
  {
    id: 2, initial: 'M', logoClass: 'green', title: 'UX Research Intern', co: 'Mawdoo3 · Remote',
    tags: [{ label: 'Internship', blue: true }, { label: 'Remote' }, { label: 'Entry' }, { label: '3 months' }],
    salary: 'Stipend · $800/month',
  },
  {
    id: 3, initial: 'O', logoClass: 'orange', title: 'Junior Backend Developer', co: 'Optimiza · Hybrid · Amman',
    tags: [{ label: 'Full-time', blue: true }, { label: 'Hybrid' }, { label: 'Junior' }, { label: 'Node.js' }],
    salary: '$22,000 – $28,000 / year',
  },
  {
    id: 4, initial: 'E', logoClass: 'red', title: 'QA Engineer Intern', co: 'Estarta Solutions · Amman',
    tags: [{ label: 'Internship', blue: true }, { label: 'On-site' }, { label: 'Entry' }],
    salary: 'Stipend · $650/month',
  },
  {
    id: 5, initial: 'M', title: 'Mobile Developer (iOS)', co: 'MenaITech · Amman',
    tags: [{ label: 'Full-time', blue: true }, { label: 'On-site' }, { label: 'Mid-level' }, { label: 'Swift' }],
    salary: '$30,000 – $42,000 / year',
  },
  {
    id: 6, initial: 'H', logoClass: 'orange', title: 'Data Analyst', co: 'Hikma Pharmaceuticals · Amman',
    tags: [{ label: 'Full-time', blue: true }, { label: 'On-site' }, { label: 'Mid-level' }, { label: 'SQL · Python' }],
    salary: '$26,000 – $34,000 / year',
  },
];

const Check = ({ label, count, on }) => (
  <div className={`check ${on ? 'on' : ''}`}>
    <span className="box"></span>
    {label}
    {count != null && <span className="count">{count}</span>}
  </div>
);

const JobListings = () => {
  return (
    <>
      <Navbar variant="seeker" current="jobs" user={{ initials: 'JD', name: 'John D.' }} />

      <main className="main no-side">
        <div className="search-strip">
          <div className="field"><div className="lbl">Keyword</div><div className="val">Product Designer</div></div>
          <div className="field"><div className="lbl">Location</div><div className="val">Amman, Jordan</div></div>
          <div className="field"><div className="lbl">Job Type</div><div className="val">All Types ▾</div></div>
          <button className="btn-search">Search</button>
        </div>

        <div className="listings-shell">
          <aside className="filters">
            <div className="filter-group">
              <h4>Job Type</h4>
              <Check label="Full-time" count={842} on />
              <Check label="Internship" count={312} on />
              <Check label="Part-time" count={128} />
              <Check label="Contract" count={94} />
              <Check label="Remote" count={256} />
            </div>
            <div className="filter-group">
              <h4>Salary Range</h4>
              <div className="slider">
                <div className="fill"></div>
                <div className="h" style={{ left: '20%' }}></div>
                <div className="h" style={{ left: '70%' }}></div>
              </div>
              <div className="slider-range"><span>$15k</span><span>$80k</span></div>
            </div>
            <div className="filter-group">
              <h4>Experience</h4>
              <Check label="Entry Level" on />
              <Check label="Mid Level" on />
              <Check label="Senior" />
              <Check label="Lead" />
            </div>
            <button className="btn btn-primary btn-block" style={{ marginBottom: '8px' }}>Apply Filters</button>
            <button className="btn btn-ghost btn-block">Clear All</button>
          </aside>

          <div>
            <div className="results-head">
              <div><strong>248 jobs</strong> <span className="muted">found in Amman</span></div>
              <div className="sort-by">Sort by: <strong>Most recent ▾</strong></div>
            </div>

            {jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className={`co-logo ${job.logoClass || ''}`}>{job.initial}</div>
                <div className="body">
                  <div className="head">
                    <div>
                      <div className="title"><Link to={`/jobs/${job.id}`} style={{ color: 'inherit' }}>{job.title}</Link></div>
                      <div className="co">{job.co}</div>
                    </div>
                    <Link className="btn btn-primary" to={`/jobs/${job.id}`}>Apply Now</Link>
                  </div>
                  <div className="meta">
                    {job.tags.map((tag) => (
                      <span className={`chip ${tag.blue ? 'blue' : ''}`} key={tag.label}>{tag.label}</span>
                    ))}
                  </div>
                  <div className="salary">{job.salary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default JobListings;
