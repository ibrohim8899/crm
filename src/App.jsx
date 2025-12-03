import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import TeacherLogin from './pages/TeacherLogin';
import AdminLogin from './pages/AdminLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center min-h-screen">Yuklanmoqda...</div>;
  if (!user) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/teacher/dashboard" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/teacher/dashboard" element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 