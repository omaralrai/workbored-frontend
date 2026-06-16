import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import Navbar from '../components/layout/Navbar';
import { getJobs } from '../api/client';

const SALARY_MAX = 120000;

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
  const [detectingLocation, setDetectingLocation] = useState(true);

  // Search strip inputs — Location is pre-filled by ipapi.co (3rd-party API)
  const [keyword, setKeyword] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [searchJobType, setSearchJobType] = useState('');

  // Sidebar type checkboxes
  const [typeFilters, setTypeFilters] = useState({
    'full-time': true, 'internship': true, 'part-time': false, 'contract': false, 'remote': false,
  });

  // Sidebar experience checkboxes
  const [expFilters, setExpFilters] = useState({
    'entry': true, 'mid-level': true, 'senior': false, 'lead': false,
  });

  // Salary range slider state
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(SALARY_MAX);
  const sliderRef = useRef(null);

  // Single applied state merging all filters
  const [applied, setApplied] = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // 3rd-party API: ipapi.co — auto-detect user city to pre-fill Location field
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        const city = data.city || '';
        setLocationInput(city);
      })
      .catch(() => {})
      .finally(() => setDetectingLocation(false));
  }, []);

  // Update CSS custom properties on the slider wrapper to drive the track fill
  useEffect(() => {
    if (sliderRef.current) {
      const minPct = (salaryMin / SALARY_MAX) * 100;
      const maxPct = (salaryMax / SALARY_MAX) * 100;
      sliderRef.current.style.setProperty('--min-pct', `${minPct}%`);
      sliderRef.current.style.setProperty('--max-pct', `${maxPct}%`);
    }
  }, [salaryMin, salaryMax]);

  const toggleType = (key) => setTypeFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleExp = (key) => setExpFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSearch = () => {
    setApplied((prev) => ({
      ...prev,
      keyword: keyword.trim().toLowerCase(),
      location: locationInput.trim().toLowerCase(),
      jobType: searchJobType,
    }));
  };

  const handleApplyFilters = () => {
    const activeTypes = Object.keys(typeFilters).filter((k) => typeFilters[k]);
    const activeExps = Object.keys(expFilters).filter((k) => expFilters[k]);
    setApplied((prev) => ({
      ...prev,
      types: activeTypes,
      exps: activeExps,
      salaryMin,
      salaryMax,
    }));
  };

  const handleClearAll = () => {
    setKeyword('');
    setLocationInput('');
    setSearchJobType('');
    setSalaryMin(0);
    setSalaryMax(SALARY_MAX);
    setTypeFilters({ 'full-time': false, 'internship': false, 'part-time': false, 'contract': false, 'remote': false });
    setExpFilters({ 'entry': false, 'mid-level': false, 'senior': false, 'lead': false });
    setApplied(null);
  };

  const filteredJobs = applied
    ? jobs.filter((job) => {
        // Keyword: match job title or company name
        if (applied.keyword) {
          const kw = applied.keyword;
          const inTitle = job.title?.toLowerCase().includes(kw);
          const inCompany = job.company_name?.toLowerCase().includes(kw);
          if (!inTitle && !inCompany) return false;
        }

        // Location: match job location string
        if (applied.location) {
          if (!job.location?.toLowerCase().includes(applied.location)) return false;
        }

        // Job type from search strip dropdown
        if (applied.jobType && job.job_type !== applied.jobType) return false;

        // Sidebar type checkboxes
        if (applied.types && applied.types.length > 0) {
          const typeMatch =
            applied.types.includes(job.job_type) ||
            (applied.types.includes('remote') && job.work_mode === 'remote');
          if (!typeMatch) return false;
        }

        // Sidebar experience checkboxes
        if (applied.exps && applied.exps.length > 0) {
          if (!applied.exps.includes(job.experience_level)) return false;
        }

        // Salary range — only filter jobs that have numeric salary data
        if (applied.salaryMin !== undefined && applied.salaryMax !== undefined) {
          if (job.salary_min !== null && job.salary_max !== null) {
            if (job.salary_max < applied.salaryMin || job.salary_min > applied.salaryMax) return false;
          }
        }

        return true;
      })
    : jobs;

  const fmtSalary = (val) => (val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${val}`);

  return (
    <>
      <Navbar variant="seeker" current="jobs" />

      <main className="main no-side">
        {/* Search strip — Keyword + Location (ipapi.co) + Job Type + Search button */}
        <div className="search-strip">
          <div className="field">
            <div className="lbl">Keyword</div>
            <input
              className="search-input"
              type="text"
              placeholder="Job title or company"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="field">
            <div className="lbl">Location</div>
            {detectingLocation ? (
              <div className="val">
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ width: '12px', height: '12px', borderWidth: '2px', color: 'var(--grey)' }}
                />
                {' '}Detecting…
              </div>
            ) : (
              <input
                className="search-input"
                type="text"
                placeholder="City or country"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            )}
          </div>
          <div className="field">
            <div className="lbl">Job Type</div>
            <select
              className="search-select"
              value={searchJobType}
              onChange={(e) => setSearchJobType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <button className="btn-search" onClick={handleSearch}>Search</button>
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
              <div className="salary-slider-wrap" ref={sliderRef}>
                <input
                  type="range"
                  className="salary-range salary-range--low"
                  min={0}
                  max={SALARY_MAX}
                  step={1000}
                  value={salaryMin}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), salaryMax - 5000);
                    setSalaryMin(val);
                  }}
                />
                <input
                  type="range"
                  className="salary-range salary-range--high"
                  min={0}
                  max={SALARY_MAX}
                  step={1000}
                  value={salaryMax}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), salaryMin + 5000);
                    setSalaryMax(val);
                  }}
                />
              </div>
              <div className="slider-range">
                <span>{fmtSalary(salaryMin)}</span>
                <span>{fmtSalary(salaryMax)}</span>
              </div>
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
                      {tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
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
