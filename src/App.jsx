import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import SeekerDashboard from './pages/SeekerDashboard';
import SeekerProfile from './pages/SeekerProfile';
import SeekerApplications from './pages/SeekerApplications';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerApplications from './pages/EmployerApplications';
import PostJob from './pages/PostJob';
import CompanyProfile from './pages/CompanyProfile';
import CompanySetup from './pages/CompanySetup';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/profile" element={<SeekerProfile />} />
        <Route path="/seeker/applications" element={<SeekerApplications />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/applications" element={<EmployerApplications />} />
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route path="/employer/company-setup" element={<CompanySetup />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
