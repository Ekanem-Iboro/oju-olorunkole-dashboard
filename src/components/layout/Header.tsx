import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, LogOut, Settings, Menu } from 'lucide-react';
import type { User as UserType } from '../../App';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export function Header({ user, onLogout, onToggleSidebar }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-[#F8FAFC] transition-colors"
          >
            <Menu className="h-5 w-5 text-[#6B7280]" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] w-64 transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-[#6B7280] hover:text-[#374151] transition-colors">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#EF4444] text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium text-[#374151]">{user.name}</div>
                <div className="text-xs text-[#6B7280] capitalize">{user.role.replace('_', ' ')}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-50">
                <div className="px-4 py-2 border-b border-[#E2E8F0]">
                  <div className="text-sm font-medium text-[#374151]">{user.name}</div>
                  <div className="text-xs text-[#6B7280]">{user.email}</div>
                </div>
                
                <button className="w-full text-left px-4 py-2 text-sm text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#374151] flex items-center space-x-2 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </button>
                
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}