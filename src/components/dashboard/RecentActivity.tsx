import React from 'react';
import { UserPlus, MessageSquare, DollarSign, FileText, Calendar } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'registration',
      message: 'Sarah Johnson registered as a new member',
      timestamp: '2 minutes ago',
      icon: UserPlus,
      color: 'text-[#22C55E]',
      bgColor: 'bg-green-50',
    },
    {
      id: 2,
      type: 'testimony',
      message: 'New testimony submitted by Michael Brown',
      timestamp: '15 minutes ago',
      icon: MessageSquare,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 3,
      type: 'donation',
      message: 'Donation of $250 received from anonymous donor',
      timestamp: '1 hour ago',
      icon: DollarSign,
      color: 'text-[#84CC16]',
      bgColor: 'bg-lime-50',
    },
    {
      id: 4,
      type: 'content',
      message: 'Sunday service bulletin updated',
      timestamp: '2 hours ago',
      icon: FileText,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-blue-50',
    },
    {
      id: 5,
      type: 'event',
      message: 'Youth group meeting scheduled for Friday',
      timestamp: '3 hours ago',
      icon: Calendar,
      color: 'text-[#6B7280]',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#374151]">Recent Activity</h2>
      </div>
      
      <div className="divide-y divide-[#E2E8F0]">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <div
              key={activity.id}
              className={`p-6 flex items-center space-x-4 ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
              }`}
            >
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#374151] font-medium">{activity.message}</p>
                <p className="text-xs text-[#6B7280] mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[#E2E8F0] text-center">
        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
}