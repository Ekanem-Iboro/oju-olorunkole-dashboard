import React from 'react';
import { MetricsCards } from '../dashboard/MetricsCards';
import { QuickActions } from '../dashboard/QuickActions';
import { RecentActivity } from '../dashboard/RecentActivity';
import { Charts } from '../dashboard/Charts';

export function OverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Dashboard Overview</h1>
        <p className="text-[#6B7280]">Welcome back! Here's what's happening at your church.</p>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Quick Actions and Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Charts />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}