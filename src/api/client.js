const API_BASE = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }

  return data;
}

const get = (path) => request(path);
const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
const put = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) });
const patch = (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) });
const del = (path) => request(path, { method: 'DELETE' });

// Users
export const registerUser = (payload) => post('/users/register', payload);
export const loginUser = (payload) => post('/users/login', payload);

// Jobs
export const getJobs = () => get('/jobs');
export const getJob = (id) => get(`/jobs/${id}`);
export const getCompanyJobs = (companyId) => get(`/jobs/company/${companyId}`);
export const createJob = (payload) => post('/jobs', payload);
export const updateJob = (id, payload) => put(`/jobs/${id}`, payload);
export const updateJobStatus = (id, status) => patch(`/jobs/${id}/status`, { status });
export const deleteJob = (id) => del(`/jobs/${id}`);

// Applications
export const getCompanyApplications = (companyId) => get(`/applications/company/${companyId}`);
export const getSeekerApplications = (seekerId) => get(`/applications/seeker/${seekerId}`);
export const createApplication = (payload) => post('/applications', payload);
export const updateApplication = (id, payload) => put(`/applications/${id}`, payload);
export const withdrawApplication = (id) => del(`/applications/${id}`);

// Companies
export const getCompany = (id) => get(`/companies/${id}`);
export const getCompanyByUser = (userId) => get(`/companies/user/${userId}`);
export const updateCompany = (id, payload) => put(`/companies/${id}`, payload);

// Seekers
export const getSeeker = (id) => get(`/seekers/${id}`);
export const getSeekerByUser = (userId) => get(`/seekers/user/${userId}`);
export const updateSeeker = (id, payload) => put(`/seekers/${id}`, payload);
export const addSeekerSkill = (id, skillName) => post(`/seekers/${id}/skills`, { skill_name: skillName });
export const removeSeekerSkill = (id, skillId) => del(`/seekers/${id}/skills/${skillId}`);
