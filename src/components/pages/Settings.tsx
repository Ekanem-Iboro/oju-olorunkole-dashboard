import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Palette, Save } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Grace Fellowship Church',
    siteDescription: 'A welcoming community of faith',
    contactEmail: 'admin@gracefellowship.org',
    address: '123 Church Street, Anytown, ST 12345',
    phone: '(555) 123-4567',
    notifications: {
      newMembers: true,
      testimonials: true,
      donations: true,
      contactForms: true,
    },
    theme: {
      primaryColor: '#22C55E',
      accentColor: '#F59E0B',
    },
    livestream: {
      youtubeChannel: 'gracefellowshipchurch',
      autoNotify: true,
      archiveStreams: true,
    },
  });

  const handleInputChange = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#374151] mb-4">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleInputChange('siteName', e.target.value)}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">Site Description</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleInputChange('siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">Church Address</label>
        <input
          type="text"
          value={settings.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">Phone Number</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#374151] mb-4">Notification Settings</h2>
      
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-[#374151] capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange(`notifications.${key}`, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22C55E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLiveStreamSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#374151] mb-4">Live Stream Settings</h2>
      
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">YouTube Channel</label>
        <input
          type="text"
          value={settings.livestream.youtubeChannel}
          onChange={(e) => handleInputChange('livestream.youtubeChannel', e.target.value)}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
          placeholder="Your YouTube channel name"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-[#374151]">Auto Notifications</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Automatically notify members when going live
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.livestream.autoNotify}
              onChange={(e) => handleInputChange('livestream.autoNotify', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22C55E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-[#374151]">Archive Streams</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Save completed streams for later viewing
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.livestream.archiveStreams}
              onChange={(e) => handleInputChange('livestream.archiveStreams', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#22C55E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Settings</h1>
        <p className="text-[#6B7280]">Manage your church website settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-2">
            {[
              { id: 'general', label: 'General', icon: Globe },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'livestream', label: 'Live Stream', icon: SettingsIcon },
              { id: 'appearance', label: 'Appearance', icon: Palette },
              { id: 'security', label: 'Security', icon: Shield },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#22C55E] text-white'
                      : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'livestream' && renderLiveStreamSettings()}
            {activeTab === 'appearance' && (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#374151] mb-2">Appearance Settings</h3>
                <p className="text-[#6B7280]">Theme and styling options coming soon</p>
              </div>
            )}
            {activeTab === 'security' && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#374151] mb-2">Security Settings</h3>
                <p className="text-[#6B7280]">Password and security options coming soon</p>
              </div>
            )}

            {/* Save Button */}
            {(activeTab === 'general' || activeTab === 'notifications' || activeTab === 'livestream') && (
              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <button className="bg-[#22C55E] text-white px-6 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}