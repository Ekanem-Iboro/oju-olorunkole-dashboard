import React from 'react';
import { Users, MessageSquare, Bed, Mail, Loader } from 'lucide-react';
import { NairaIcon } from '../icons/NairaIcon';
import { useGetDashboardOverview } from '../../../api/query';

export function MetricsCards() {
  const { data: overview, isLoading } = useGetDashboardOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin text-[#22C55E]" size={20} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const m = overview?.metrics || {};

  const metrics = [
    {
      title: 'Total Members',
      value: (m.total_members || 0).toLocaleString(),
      icon: Users,
      color: 'text-[#22C55E]',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Donations',
      value: `₦${(m.total_donations || 0).toLocaleString()}`,
      icon: NairaIcon,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Pending Testimonials',
      value: (m.pending_testimonials || 0).toString(),
      icon: MessageSquare,
      color: 'text-[#EF4444]',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Accommodation Bookings',
      value: (m.total_accommodations || 0).toString(),
      icon: Bed,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.title} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-[#6B7280] mb-1">{metric.title}</h3>
              <p className="text-2xl font-semibold text-[#374151]">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
