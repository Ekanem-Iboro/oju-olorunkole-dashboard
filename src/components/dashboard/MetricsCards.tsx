import React from 'react';
import { Users, DollarSign, MessageSquare, Eye, TrendingUp, TrendingDown } from 'lucide-react';

export function MetricsCards() {
  const metrics = [
    {
      title: 'Total Members',
      value: '2,847',
      change: '+12',
      changeType: 'increase' as const,
      icon: Users,
      color: 'text-[#22C55E]',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Monthly Donations',
      value: '$24,500',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Pending Testimonials',
      value: '8',
      change: '+3',
      changeType: 'increase' as const,
      icon: MessageSquare,
      color: 'text-[#EF4444]',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Live Stream Views',
      value: '1,247',
      change: '-5.1%',
      changeType: 'decrease' as const,
      icon: Eye,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.changeType === 'increase' ? TrendingUp : TrendingDown;
        
        return (
          <div key={metric.title} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.changeType === 'increase' ? 'text-[#22C55E]' : 'text-[#EF4444]'
              }`}>
                <TrendIcon className="h-4 w-4" />
                <span>{metric.change}</span>
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