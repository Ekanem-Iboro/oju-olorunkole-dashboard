import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../layout/Sidebar';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  // Extract current tab from URL path
  const getCurrentTabFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'dashboard';
    return path.replace('/', '');
  };

  const [activeTab, setActiveTab] = React.useState(getCurrentTabFromPath());

  // Update active tab when route changes
  React.useEffect(() => {
    setActiveTab(getCurrentTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
  };

  // Mock user data - you might want to fetch this from your API
  const mockUser = {
    id: '1',
    email: 'admin@church.com',
    name: 'Church Admin',
    role: 'super_admin' as const
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onTabChange={handleTabChange}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        userRole={mockUser.role}
      />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content - Outlet renders the child routes */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};



{/* <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
         */}

// const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// 