import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import Navbar from '../components/layout/Navbar';
import { getJobs } from '../api/client';

const Check = ({ label, on }) => (
  <div className={`check ${on ? 'on' : ''}`}>
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

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // 3rd-party API: ipapi.co — auto-detect user's city for the location field
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => setDetectedCity(data.city || ''))
      .catch(() => setDetectedCity(''))
      .finally(() => setDetectingLocation(false));
  }, []);

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
              <Check label="Full-time" on />
              <Check label="Internship" on />
              <Check label="Part-time" />
              <Check label="Contract" />
              <Check label="Remote" />
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
            <button className="btn btn-primary btn-block apply-filters-btn">Apply Filters</button>
            <button className="btn btn-ghost btn-block">Clear All</button>
          </aside>

          <div>
            <div className="results-head">
              <div><strong>{jobs.length} jobs</strong> <span className="muted">found</span></div>
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

            {!loading && !error && jobs.length === 0 && (
              <p className="muted">No jobs found.</p>
            )}

            {jobs.map((job) => {
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
