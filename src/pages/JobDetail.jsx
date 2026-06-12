import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { getJob, getSeekerByUser, createApplication } from '../api/client';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const lines = (text) => (text || '').split('\n').map((l) => l.trim()).filter(Boolean);

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [applyState, setApplyState] = useState('idle');

  useEffect(() => {
    getJob(id)
      .then(setJob)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      setApplyState('signin');
      return;
    }

    setApplyState('loading');
    try {
      const seeker = await getSeekerByUser(user.id);
      await createApplication({ job_id: job.id, seeker_id: seeker.id });
      setApplyState('done');
    } catch (err) {
      setApplyState('error');
    }
  };

  if (error) {
    return (
      <>
        <Navbar variant={user?.role === 'employer' ? 'employer' : 'seeker'} current="jobs" />
        <main className="main no-side narrow">
          <p className="muted">Couldn't load this job: {error}</p>
        </main>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar variant={user?.role === 'employer' ? 'employer' : 'seeker'} current="jobs" />
        <main className="main no-side narrow">
          <p className="muted">Loading job…</p>
        </main>
      </>
    );
  }

  const tags = (job.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <>
      <Navbar variant={user?.role === 'employer' ? 'employer' : 'seeker'} current="jobs" />

      <main className="main no-side narrow">
        <div className="card card-pad">
          <div className="jd-head">
            <div className="left">
              <div className={`co-logo lg ${job.logo_color && job.logo_color !== 'blue' ? job.logo_color : ''}`}>{job.logo_initial}</div>
              <div>
                <h1>{job.title}</h1>
                <div className="jd-meta">
                  <span className="co-name">{job.company_name}</span>
                  <span className="dot"></span><span>{job.location}</span>
                  <span className="dot"></span><span>{job.work_mode}</span>
                </div>
                <div className="jd-tags">
                  <span className="chip blue">{job.job_type}</span>
                  {tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                  {job.experience_level && <span className="chip">{job.experience_level}</span>}
                  {job.salary_display && <span className="chip">{job.salary_display}</span>}
                </div>
              </div>
            </div>
            {user?.role !== 'employer' && (
              applyState === 'done'
                ? <span className="badge approved">Applied ✓</span>
                : <button className="btn btn-primary btn-lg" onClick={handleApply} disabled={applyState === 'loading'}>
                    {applyState === 'loading' ? 'Applying…' : 'Apply Now'} <ArrowIcon />
                  </button>
            )}
          </div>

          {applyState === 'signin' && <p className="form-error">Please sign in as a job seeker to apply.</p>}
          {applyState === 'error' && <p className="form-error">Couldn't submit your application. You may have already applied.</p>}

          <div className="jd-section">
            <h3>About the Role</h3>
            <p>{job.description}</p>
          </div>

          {job.responsibilities && (
            <div className="jd-section">
              <h3>Key Responsibilities</h3>
              <ul>{lines(job.responsibilities).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}

          {job.requirements && (
            <div className="jd-section">
              <h3>Requirements</h3>
              <ul>{lines(job.requirements).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}

          {job.benefits && (
            <div className="jd-section">
              <h3>Benefits</h3>
              <ul>{lines(job.benefits).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}

          <div className="jd-section">
            <h3>About {job.company_name}</h3>
            <div className="about-co">
              <div className={`co-logo md ${job.logo_color && job.logo_color !== 'blue' ? job.logo_color : ''}`}>{job.logo_initial}</div>
              <div className="info">
                <div><div className="k">Industry</div><div className="v">{job.industry || '—'}</div></div>
                <div><div className="k">Size</div><div className="v">{job.company_size || '—'}</div></div>
                <div><div className="k">Founded</div><div className="v">{job.founded_year || '—'}</div></div>
                <div><div className="k">HQ</div><div className="v">{job.headquarters || '—'}</div></div>
                <div><div className="k">Website</div><div className="v link">{job.website || '—'}</div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default JobDetail;
