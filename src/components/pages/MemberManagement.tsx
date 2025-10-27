import React, { useState } from 'react';
import { Search, Filter, Download, UserPlus, Edit, Trash2, Mail } from 'lucide-react';

export function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const members = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      joinDate: '2023-01-15',
      status: 'active',
      role: 'Member',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      joinDate: '2023-02-10',
      status: 'active',
      role: 'Ministry Leader',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '(555) 345-6789',
      joinDate: '2023-03-05',
      status: 'inactive',
      role: 'Member',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '(555) 456-7890',
      joinDate: '2024-01-10',
      status: 'active',
      role: 'Volunteer',
    },
  ];

  const pendingRegistrations = [
    {
      id: 1,
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '(555) 567-8901',
      submittedDate: '2024-01-12',
      message: 'Looking forward to joining the community',
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '(555) 678-9012',
      submittedDate: '2024-01-13',
      message: 'Recently moved to the area and seeking a church home',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#22C55E] text-white';
      case 'inactive':
        return 'bg-[#E2E8F0] text-[#6B7280]';
      case 'new':
        return 'bg-[#F59E0B] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Ministry Leader':
        return 'bg-[#F59E0B] text-white';
      case 'Volunteer':
        return 'bg-[#84CC16] text-white';
      default:
        return 'bg-[#3B82F6] text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Member Management</h1>
        <p className="text-[#6B7280]">Manage church members, registrations, and member analytics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#374151]">2,847</div>
          <div className="text-sm text-[#6B7280]">Total Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#22C55E]">2,623</div>
          <div className="text-sm text-[#6B7280]">Active Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#F59E0B]">2</div>
          <div className="text-sm text-[#6B7280]">Pending Registrations</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#3B82F6]">12</div>
          <div className="text-sm text-[#6B7280]">New This Month</div>
        </div>
      </div>

      {/* Pending Registrations */}
      {pendingRegistrations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-semibold text-[#374151]">Pending Registrations</h2>
          </div>
          <div className="p-6 space-y-4">
            {pendingRegistrations.map((registration) => (
              <div key={registration.id} className="bg-[#F8FAFC] rounded-lg p-4 border-l-4 border-[#F59E0B]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#374151]">{registration.name}</h3>
                    <p className="text-sm text-[#6B7280]">{registration.email} • {registration.phone}</p>
                    <p className="text-xs text-[#6B7280] mt-1">Submitted: {new Date(registration.submittedDate).toLocaleDateString()}</p>
                    {registration.message && (
                      <p className="text-sm text-[#374151] mt-2 italic">"{registration.message}"</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-[#22C55E] text-white px-3 py-1 text-sm rounded hover:bg-[#16A34A] transition-colors">
                      Approve
                    </button>
                    <button className="bg-[#EF4444] text-white px-3 py-1 text-sm rounded hover:bg-[#DC2626] transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Member Directory */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#374151]">Member Directory</h2>
            <div className="flex space-x-2">
              <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] flex items-center space-x-2 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors">
                <UserPlus className="h-4 w-4" />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Join Date
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
              {members.map((member, index) => (
                <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#374151]">{member.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">
                      <div>{member.email}</div>
                      <div>{member.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-[#374151] p-1 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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