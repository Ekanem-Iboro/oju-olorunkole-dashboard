import React from 'react';
import { UserPlus, MessageSquare, FileText, Calendar, Mail, Bed, Loader } from 'lucide-react';
import { NairaIcon } from '../icons/NairaIcon';
import { useGetDashboardOverview } from '../../../api/query';

const iconMap: Record<string, React.FC<any>> = {
  user: UserPlus,
  message: MessageSquare,
  naira: NairaIcon,
  mail: Mail,
  bed: Bed,
  file: FileText,
  calendar: Calendar,
};

function timeAgo(dateStr: string) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentActivity() {
  const { data: overview, isLoading } = useGetDashboardOverview();
  const activities = overview?.recent_activity || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#374151]">Recent Activity</h2>
        </div>
        <div className="p-12 flex items-center justify-center">
          <Loader className="animate-spin text-[#22C55E]" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#374151]">Recent Activity</h2>
      </div>

      <div className="divide-y divide-[#E2E8F0]">
        {activities.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            <FileText className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
            <p>No recent activity yet.</p>
          </div>
        ) : (
          activities.map((activity: any, index: number) => {
            const Icon = iconMap[activity.icon] || FileText;
            return (
              <div
                key={index}
                className={`p-4 flex items-center space-x-4 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#374151] font-medium truncate">{activity.message}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{timeAgo(activity.timestamp)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
