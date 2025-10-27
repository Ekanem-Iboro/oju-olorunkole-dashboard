import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/auth/LoginPage';
import { useLogin } from '../api/mutate';
import { OverviewDashboard } from './components/pages/OverviewDashboard';
import { ContentManagement } from './components/pages/ContentManagement';
import { MemberManagement } from './components/pages/MemberManagement';
import { TestimonyManagement } from './components/pages/TestimonyManagement';
import { DonationManagement } from './components/pages/DonationManagement';
import { LiveStreamManagement } from './components/pages/LiveStreamManagement';
import { Analytics } from './components/pages/Analytics';
import { Settings } from './components/pages/Settings';
import { DashboardLayout } from './components/dashboard/AdminDashboard';
import { Loader } from 'lucide-react';

// Protected Route component that checks localStorage
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirect to dashboard if already authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
interface User {
  id: number;
  email: string;
  name: string;
  role: 'Super Admin' | 'Pastor' | 'Staff' | 'Ministry Leader';
  // Add other user properties as needed
}

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const loginMutation = useLogin();

// remove access_token after 30mins and redirect to login
  React.useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const tokenExpirationTime = JSON.parse(atob(token.split('.')[1])).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpirationTime < currentTime) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {

    try {
      await loginMutation.mutateAsync({ email, password });

    }
    catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  // Show loading state when fetching user profile after login
  if (loginMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader className="animate-spin text-green-600" size={35} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage
                onLogin={handleLogin}
                isLoading={loginMutation.isPending}
              />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<OverviewDashboard />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="testimonials" element={<TestimonyManagement />} />
          <Route path="donations" element={<DonationManagement />} />
          <Route path="livestream" element={<LiveStreamManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />

          {/* Default redirect for nested routes */}
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;