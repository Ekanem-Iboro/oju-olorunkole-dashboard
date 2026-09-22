import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../layout/Sidebar';
import { Loader } from 'lucide-react';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const getCurrentTabFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'dashboard';
    return path.replace('/', '');
  };

  const [activeTab, setActiveTab] = React.useState(getCurrentTabFromPath());

  React.useEffect(() => {
    setActiveTab(getCurrentTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('access_token');
    onLogout();
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const mockUser = {
    id: '1',
    email: 'admin@church.com',
    name: 'Church Admin',
    role: 'super_admin' as const
  };

  if (isLoggingOut) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-[#22C55E] mx-auto mb-4" size={40} />
          <p className="text-[#374151] font-medium">Logging out...</p>
          <p className="text-[#6B7280] text-sm mt-1">Redirecting to login</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onTabChange={handleTabChange}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        userRole={mockUser.role}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {activeTab.replace('_', ' ')}
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {mockUser.name}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{mockUser.name}</p>
                <p className="text-sm text-gray-600">{mockUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
