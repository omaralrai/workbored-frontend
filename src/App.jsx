import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import EmployerJobs from './pages/EmployerJobs';
import PostJob from './pages/PostJob';
import CompanyProfile from './pages/CompanyProfile';
import CompanySetup from './pages/CompanySetup';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

// Redirect logged-in users away from public-only pages (home, signin, register)
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role === 'employer') return <Navigate to="/employer/dashboard" replace />;
  if (user?.role === 'seeker') return <Navigate to="/seeker/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
          <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/seeker/dashboard" element={<ProtectedRoute role="seeker"><SeekerDashboard /></ProtectedRoute>} />
          <Route path="/seeker/profile" element={<ProtectedRoute role="seeker"><SeekerProfile /></ProtectedRoute>} />
          <Route path="/seeker/applications" element={<ProtectedRoute role="seeker"><SeekerApplications /></ProtectedRoute>} />
          <Route path="/employer/dashboard" element={<ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>} />
          <Route path="/employer/applications" element={<ProtectedRoute role="employer"><EmployerApplications /></ProtectedRoute>} />
          <Route path="/employer/jobs" element={<ProtectedRoute role="employer"><EmployerJobs /></ProtectedRoute>} />
          <Route path="/employer/post-job" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
          <Route path="/employer/company-setup" element={<ProtectedRoute role="employer"><CompanySetup /></ProtectedRoute>} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
