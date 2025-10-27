import React, { useState } from 'react';
import { BarChart3, Users, Globe, MousePointer, Smartphone, Monitor, TrendingUp, Download } from 'lucide-react';

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const websiteStats = [
    {
      label: 'Total Visitors',
      value: '12,847',
      change: '+15.3%',
      icon: Users,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Page Views',
      value: '34,521',
      change: '+8.7%',
      icon: Globe,
      color: 'text-[#22C55E]',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Avg. Session',
      value: '4:32',
      change: '+12.1%',
      icon: MousePointer,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Bounce Rate',
      value: '34.2%',
      change: '-5.4%',
      icon: TrendingUp,
      color: 'text-[#84CC16]',
      bgColor: 'bg-lime-50',
    },
  ];

  const engagementMetrics = [
    {
      category: 'Testimony Submissions',
      value: 23,
      change: '+18.2%',
      color: 'bg-[#F59E0B]',
    },
    {
      category: 'Newsletter Signups',
      value: 156,
      change: '+12.7%',
      color: 'bg-[#15803D]',
    },
    {
      category: 'Contact Forms',
      value: 45,
      change: '+8.9%',
      color: 'bg-[#84CC16]',
    },
    {
      category: 'Event Registrations',
      value: 89,
      change: '+22.3%',
      color: 'bg-[#3B82F6]',
    },
  ];

  const deviceBreakdown = [
    { device: 'Desktop', percentage: 45, color: 'bg-[#3B82F6]' },
    { device: 'Mobile', percentage: 42, color: 'bg-[#22C55E]' },
    { device: 'Tablet', percentage: 13, color: 'bg-[#F59E0B]' },
  ];

  const topPages = [
    { page: '/home', views: 8432, percentage: 24.4 },
    { page: '/about', views: 3821, percentage: 11.1 },
    { page: '/sermons', views: 3156, percentage: 9.1 },
    { page: '/events', views: 2847, percentage: 8.2 },
    { page: '/contact', views: 2341, percentage: 6.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#374151] mb-2">Analytics Dashboard</h1>
          <p className="text-[#6B7280]">Track website performance and user engagement metrics.</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>
          <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Website Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {websiteStats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-[#6B7280] mb-1">{stat.label}</h3>
                <p className="text-2xl font-semibold text-[#374151]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-semibold text-[#374151] mb-6">Website Traffic</h2>
          <div className="h-64 bg-gradient-to-t from-[#F8FAFC] to-white border border-[#E2E8F0] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-[#3B82F6] mx-auto mb-4" />
              <p className="text-[#6B7280] text-sm">Traffic chart visualization</p>
              <p className="text-xs text-[#9CA3AF] mt-2">Showing visitor trends over time</p>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-semibold text-[#374151] mb-6">Device Breakdown</h2>
          <div className="space-y-4">
            {deviceBreakdown.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-[#6B7280]" />}
                  {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-[#6B7280]" />}
                  {device.device === 'Tablet' && <Smartphone className="h-4 w-4 text-[#6B7280]" />}
                  <span className="text-sm font-medium text-[#374151]">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-[#E2E8F0] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${device.color}`}
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-[#6B7280] w-12 text-right">
                    {device.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#374151] mb-6">Engagement Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {engagementMetrics.map((metric) => (
            <div key={metric.category} className={`rounded-lg p-4 border-l-4 ${metric.color}`}>
              <div className="bg-white/50 backdrop-blur rounded p-4">
                <h3 className="text-sm font-medium text-[#6B7280] mb-1">{metric.category}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-[#374151]">{metric.value}</span>
                  <span className="text-sm font-medium text-[#22C55E]">{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#374151] mb-6">Top Pages</h2>
        <div className="space-y-4">
          {topPages.map((page, index) => (
            <div key={page.page} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-[#22C55E] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#374151]">{page.page}</div>
                  <div className="text-xs text-[#6B7280]">{page.percentage}% of total views</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#374151]">{page.views.toLocaleString()}</div>
                <div className="text-xs text-[#6B7280]">views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}