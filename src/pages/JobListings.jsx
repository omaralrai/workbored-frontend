import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import Navbar from '../components/layout/Navbar';
import { getJobs } from '../api/client';

const Check = ({ label, on, onChange }) => (
  <div className={`check ${on ? 'on' : ''}`} onClick={onChange} style={{ cursor: 'pointer' }}>
    <span className="box"></span>
    {label}
  </div>
);

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detectedCity, setDetectedCity] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(true);

  const [typeFilters, setTypeFilters] = useState({
    'full-time': true,
    'internship': true,
    'part-time': false,
    'contract': false,
    'remote': false,
  });

  const [expFilters, setExpFilters] = useState({
    'entry': true,
    'mid-level': true,
    'senior': false,
    'lead': false,
  });

  const [applied, setApplied] = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // 3rd-party API: ipapi.co — auto-detect user city for location field
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => setDetectedCity(data.city || ''))
      .catch(() => setDetectedCity(''))
      .finally(() => setDetectingLocation(false));
  }, []);

  const toggleType = (key) =>
    setTypeFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleExp = (key) =>
    setExpFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleApplyFilters = () => {
    const activeTypes = Object.keys(typeFilters).filter((k) => typeFilters[k]);
    const activeExps = Object.keys(expFilters).filter((k) => expFilters[k]);
    setApplied({ types: activeTypes, exps: activeExps });
  };

  const handleClearAll = () => {
    setTypeFilters({ 'full-time': false, 'internship': false, 'part-time': false, 'contract': false, 'remote': false });
    setExpFilters({ 'entry': false, 'mid-level': false, 'senior': false, 'lead': false });
    setApplied(null);
  };

  const filteredJobs = applied
    ? jobs.filter((job) => {
        const typeMatch =
          applied.types.length === 0 ||
          applied.types.includes(job.job_type) ||
          (applied.types.includes('remote') && job.work_mode === 'remote');
        const expMatch =
          applied.exps.length === 0 ||
          applied.exps.includes(job.experience_level);
        return typeMatch && expMatch;
      })
    : jobs;

  return (
    <>
      <Navbar variant="seeker" current="jobs" />

      <main className="main no-side">
        <div className="search-strip">
          <div className="field">
            <div className="lbl">Keyword</div>
            <div className="val">All Roles</div>
          </div>
          <div className="field">
            <div className="lbl">Location</div>
            <div className="val">
              {detectingLocation ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    style={{ width: '12px', height: '12px', borderWidth: '2px', color: 'var(--grey)' }}
                  />
                  {' '}Detecting…
                </>
              ) : (
                detectedCity || 'Anywhere'
              )}
            </div>
          </div>
          <div className="field">
            <div className="lbl">Job Type</div>
            <div className="val">All Types ▾</div>
          </div>
          <button className="btn-search">Search</button>
        </div>

        <div className="listings-shell">
          <aside className="filters">
            <div className="filter-group">
              <h4>Job Type</h4>
              <Check label="Full-time" on={typeFilters['full-time']} onChange={() => toggleType('full-time')} />
              <Check label="Internship" on={typeFilters['internship']} onChange={() => toggleType('internship')} />
              <Check label="Part-time" on={typeFilters['part-time']} onChange={() => toggleType('part-time')} />
              <Check label="Contract" on={typeFilters['contract']} onChange={() => toggleType('contract')} />
              <Check label="Remote" on={typeFilters['remote']} onChange={() => toggleType('remote')} />
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
              <Check label="Entry Level" on={expFilters['entry']} onChange={() => toggleExp('entry')} />
              <Check label="Mid Level" on={expFilters['mid-level']} onChange={() => toggleExp('mid-level')} />
              <Check label="Senior" on={expFilters['senior']} onChange={() => toggleExp('senior')} />
              <Check label="Lead" on={expFilters['lead']} onChange={() => toggleExp('lead')} />
            </div>
            <button className="btn btn-primary btn-block apply-filters-btn" onClick={handleApplyFilters}>
              Apply Filters
            </button>
            <button className="btn btn-ghost btn-block" onClick={handleClearAll}>Clear All</button>
          </aside>

          <div>
            <div className="results-head">
              <div><strong>{filteredJobs.length} jobs</strong> <span className="muted">found</span></div>
              <div className="sort-by">Sort by: <strong>Most recent ▾</strong></div>
            </div>

            {loading && (
              <div className="listings-loading">
                <Spinner animation="border" style={{ color: 'var(--primary)', width: '32px', height: '32px' }} />
                <p className="muted">Loading jobs…</p>
              </div>
            )}

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')} style={{ fontSize: '13px' }}>
                Could not load jobs: {error}
              </Alert>
            )}

            {!loading && !error && filteredJobs.length === 0 && (
              <p className="muted">No jobs match the selected filters.</p>
            )}

            {filteredJobs.map((job) => {
              const tags = (job.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

              return (
                <div className="job-card" key={job.id}>
                  <div className={`co-logo ${job.logo_color && job.logo_color !== 'blue' ? job.logo_color : ''}`}>
                    {job.logo_initial}
                  </div>
                  <div className="body">
                    <div className="head">
                      <div>
                        <div className="title">
                          <Link to={`/jobs/${job.id}`} className="title-link">{job.title}</Link>
                        </div>
                        <div className="co">{job.company_name} · {job.location}</div>
                      </div>
                      <Link className="btn btn-primary" to={`/jobs/${job.id}`}>View Details</Link>
                    </div>
                    <div className="meta">
                      <Badge className="job-type-badge">{job.job_type}</Badge>
                      {job.work_mode && <span className="chip">{job.work_mode}</span>}
                      {job.experience_level && <span className="chip">{job.experience_level}</span>}
                      {tags.map((tag) => (
                        <span className="chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="salary">{job.salary_display}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default JobListings;
