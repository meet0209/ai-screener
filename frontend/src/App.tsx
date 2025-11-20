import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CandidateDetails from './pages/CandidateDetails';
import ResumeViewer from './pages/ResumeViewer';
import TestRunner from './pages/TestRunner';
import AssignmentUpload from './pages/AssignmentUpload';
import ReviewPanel from './pages/ReviewPanel';
import Settings from './pages/Settings';
import { useAuthStore } from './store/auth';

const ProtectedRoute = ({ children, roles }: { children: JSX.Element; roles?: string[] }) => {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  if (!token) return <Navigate to="/login" />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/dashboard" />;
  return children;
};

const Shell = ({ children }: { children: React.ReactNode }) => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="layout">
      <aside>
        <h2>AI Screener</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main>{children}</main>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Shell>
            <Dashboard />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/candidates/:id"
      element={
        <ProtectedRoute>
          <Shell>
            <CandidateDetails />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/candidates/:id/resume"
      element={
        <ProtectedRoute>
          <Shell>
            <ResumeViewer />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/tests/:id"
      element={
        <ProtectedRoute>
          <Shell>
            <TestRunner />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/assignments/:candidateId"
      element={
        <ProtectedRoute>
          <Shell>
            <AssignmentUpload />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/review/:id"
      element={
        <ProtectedRoute roles={['reviewer', 'admin']}>
          <Shell>
            <ReviewPanel />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute roles={['admin']}>
          <Shell>
            <Settings />
          </Shell>
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default App;
