import React from 'react';

export function Charts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#374151]">Monthly Overview</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-[#22C55E] text-white rounded-full">Members</button>
          <button className="px-3 py-1 text-xs bg-[#E2E8F0] text-[#6B7280] rounded-full hover:bg-[#D1D5DB] transition-colors">Donations</button>
          <button className="px-3 py-1 text-xs bg-[#E2E8F0] text-[#6B7280] rounded-full hover:bg-[#D1D5DB] transition-colors">Attendance</button>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="h-64 bg-gradient-to-t from-[#F8FAFC] to-white border border-[#E2E8F0] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold text-white">📊</span>
          </div>
          <p className="text-[#6B7280] text-sm">Chart visualization would appear here</p>
          <p className="text-xs text-[#9CA3AF] mt-2">Showing member growth over time</p>
        </div>
      </div>
    </div>
  );
}