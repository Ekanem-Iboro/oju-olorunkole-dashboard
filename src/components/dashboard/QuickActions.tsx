import React from 'react';
import { Plus, CheckCircle, BarChart3, Radio } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Add New Event',
      description: 'Create a new church event',
      icon: Plus,
      color: 'bg-[#22C55E] hover:bg-[#16A34A]',
      textColor: 'text-white',
    },
    {
      title: 'Approve Testimonials',
      description: '8 pending approvals',
      icon: CheckCircle,
      color: 'bg-[#F59E0B] hover:bg-[#D97706]',
      textColor: 'text-white',
    },
    {
      title: 'View Reports',
      description: 'Monthly donation reports',
      icon: BarChart3,
      color: 'bg-[#3B82F6] hover:bg-[#2563EB]',
      textColor: 'text-white',
    },
    {
      title: 'Update Live Stream',
      description: 'Manage stream settings',
      icon: Radio,
      color: 'bg-[#15803D] hover:bg-[#166534]',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
      <h2 className="text-lg font-semibold text-[#374151] mb-4">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.title}
              className={`w-full p-4 rounded-lg ${action.color} ${action.textColor} text-left transition-colors group`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}