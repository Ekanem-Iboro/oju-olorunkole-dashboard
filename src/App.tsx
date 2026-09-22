import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./components/auth/LoginPage";
import { useLogin } from "../api/mutate";
import { OverviewDashboard } from "./app/OverviewDashboard";
import { ContentManagement } from "./app/ContentManagement";
import { MemberManagement } from "./app/MemberManagement";
import { TestimonyManagement } from "./app/TestimonyManagement";
import { DonationManagement } from "./app/DonationManagement";
import { ContactManagement } from "./app/ContactManagement";
import { AccommodationManagement } from "./app/AccommodationManagement";
import { LiveStreamManagement } from "./app/LiveStreamManagement";
import { Settings } from "./app/Settings";
import { DashboardLayout } from "./components/dashboard/AdminDashboard";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

interface User {
  id: number;
  email: string;
  name: string;
  role: "Super Admin" | "Pastor" | "Staff" | "Ministry Leader";
}

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const loginMutation = useLogin();

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length !== 3) {
          localStorage.removeItem("access_token");
          window.location.href = "/admin/login";
          return;
        }
        const tokenExpirationTime = JSON.parse(atob(parts[1])).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenExpirationTime < currentTime) {
          localStorage.removeItem("access_token");
          window.location.href = "/admin/login";
        }
      } catch {
        localStorage.removeItem("access_token");
        window.location.href = "/admin/login";
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  if (loginMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader className="animate-spin text-green-600" size={35} />
      </div>
    );
  }

  return (
    <Router basename="/admin">
      <Routes>
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
          <Route path="contacts" element={<ContactManagement />} />
          <Route path="accommodations" element={<AccommodationManagement />} />
          <Route path="livestream" element={<LiveStreamManagement />} />
          <Route path="settings" element={<Settings />} />

          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
