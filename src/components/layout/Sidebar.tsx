import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  MessageSquare,
  DollarSign,
  Radio,
  BarChart3,
  Settings,
  Menu,
  Crown,
  User,
  Shield,
  Star
} from 'lucide-react';

interface SidebarProps {
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole: 'super_admin' | 'pastor' | 'staff' | 'ministry_leader';
}

export function Sidebar({  onTabChange, collapsed, onToggleCollapse, userRole }: SidebarProps) {
  const location = useLocation();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="h-3 w-3" />;
      case 'pastor':
        return <Star className="h-3 w-3" />;
      case 'staff':
        return <Shield className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'text-[#F59E0B]';
      case 'pastor':
        return 'text-[#22C55E]';
      case 'staff':
        return 'text-[#84CC16]';
      default:
        return 'text-[#3B82F6]';
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'content', label: 'Content', icon: FileText, path: '/content' },
    { id: 'members', label: 'Members', icon: Users, path: '/members' },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, path: '/testimonials' },
    { id: 'donations', label: 'Donations', icon: DollarSign, path: '/donations' },
    { id: 'livestream', label: 'Live Stream', icon: Radio, path: '/livestream' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`bg-[#15803D] text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
      {/* Header */}
      <div className="p-4 border-b border-[#22C55E]/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-semibold text-lg">Church Admin</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-[#22C55E]/20 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="p-4 border-b border-[#22C55E]/20">
          <div className={`flex items-center space-x-2 px-2 py-1 rounded ${getRoleColor(userRole)} bg-white/10`}>
            {getRoleIcon(userRole)}
            <span className="text-xs font-medium capitalize">
              {userRole.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#22C55E] text-white shadow-lg'
                      : 'text-white/80 hover:bg-[#84CC16]/20 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#22C55E]/20">
        <div className={`text-xs text-white/60 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? (
            <Shield className="h-4 w-4 mx-auto" />
          ) : (
            'Admin Portal v2.0'
          )}
        </div>
      </div>
    </div>
  );
}