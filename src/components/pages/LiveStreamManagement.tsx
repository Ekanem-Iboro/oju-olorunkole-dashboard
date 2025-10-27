import React, { useState } from 'react';
import { Radio, Calendar, Settings, Play, Square, Users, Eye } from 'lucide-react';

export function LiveStreamManagement() {
  const [isLive, setIsLive] = useState(false);
  const [currentViewers] = useState(247);

  const upcomingServices = [
    {
      id: 1,
      title: 'Sunday Morning Worship',
      date: '2024-01-14',
      time: '10:00 AM',
      status: 'scheduled',
      type: 'Regular Service',
    },
    {
      id: 2,
      title: 'Wednesday Bible Study',
      date: '2024-01-17',
      time: '7:00 PM',
      status: 'scheduled',
      type: 'Bible Study',
    },
    {
      id: 3,
      title: 'Youth Conference Special',
      date: '2024-01-20',
      time: '6:00 PM',
      status: 'draft',
      type: 'Special Event',
    },
  ];

  const streamHistory = [
    {
      id: 1,
      title: 'Sunday Morning Service',
      date: '2024-01-07',
      duration: '75 min',
      viewers: 312,
      status: 'completed',
    },
    {
      id: 2,
      title: 'New Year Prayer Service',
      date: '2024-01-01',
      duration: '120 min',
      viewers: 445,
      status: 'completed',
    },
    {
      id: 3,
      title: 'Christmas Eve Service',
      date: '2023-12-24',
      duration: '90 min',
      viewers: 678,
      status: 'completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-[#3B82F6] text-white';
      case 'live':
        return 'bg-[#EF4444] text-white animate-pulse';
      case 'draft':
        return 'bg-[#F59E0B] text-white';
      case 'completed':
        return 'bg-[#22C55E] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Live Stream Management</h1>
        <p className="text-[#6B7280]">Manage live streams, schedule services, and view analytics.</p>
      </div>

      {/* Live Stream Control Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#374151]">Stream Control</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-[#EF4444] animate-pulse' : 'bg-[#E2E8F0]'}`}></div>
            <span className="text-sm font-medium text-[#6B7280]">
              {isLive ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stream Status */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              {isLive ? (
                <div className="text-center text-white">
                  <Radio className="h-16 w-16 mx-auto mb-4 text-[#EF4444]" />
                  <p className="text-lg font-semibold mb-2">Live Stream Active</p>
                  <p className="text-sm opacity-75">{currentViewers} viewers</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Radio className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Stream Offline</p>
                  <p className="text-sm">Ready to go live</p>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isLive
                    ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                    : 'bg-[#22C55E] hover:bg-[#16A34A] text-white'
                }`}
              >
                {isLive ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isLive ? 'Stop Stream' : 'Go Live'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Stream Stats */}
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-[#3B82F6]" />
                <span className="text-sm font-medium text-[#374151]">Current Viewers</span>
              </div>
              <div className="text-2xl font-semibold text-[#374151]">{currentViewers}</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-[#22C55E]" />
                <span className="text-sm font-medium text-[#374151]">Peak Viewers</span>
              </div>
              <div className="text-2xl font-semibold text-[#374151]">312</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Radio className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-sm font-medium text-[#374151]">Stream Duration</span>
              </div>
              <div className="text-lg font-semibold text-[#374151]">45:32</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Services */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#374151]">Scheduled Services</h2>
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Schedule Service</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {upcomingServices.map((service, index) => (
                <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#374151]">{service.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">
                      <div>{new Date(service.date).toLocaleDateString()}</div>
                      <div>{service.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-[#84CC16] text-white rounded-full">
                      {service.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="text-[#22C55E] hover:text-[#16A34A] p-1 transition-colors">
                        <Play className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stream History */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#374151]">Stream History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Viewers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {streamHistory.map((stream, index) => (
                <tr key={stream.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#374151]">{stream.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">
                      {new Date(stream.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">{stream.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#374151]">{stream.viewers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(stream.status)}`}>
                      {stream.status.charAt(0).toUpperCase() + stream.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}