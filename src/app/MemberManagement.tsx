import React, { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, Mail, Loader, X } from 'lucide-react';
import { useGetMembers } from '../../api/query';
import { useDeleteMember } from '../../api/mutate';

export function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const { data: membersData, isLoading } = useGetMembers();
  const deleteMutation = useDeleteMember();

  const members = Array.isArray(membersData) ? membersData : membersData?.members || [];

  const filteredMembers = members.filter((member: any) => {
    const firstName = member.first_name || member.firstName || '';
    const lastName = member.last_name || member.lastName || '';
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#22C55E] text-white';
      case 'inactive':
        return 'bg-[#E2E8F0] text-[#6B7280]';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => setSelectedMember(null),
      });
    }
  };

  const getMemberName = (member: any) => {
    const firstName = member.first_name || member.firstName || '';
    const lastName = member.last_name || member.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-[#22C55E]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Member Management</h1>
        <p className="text-[#6B7280]">Manage church members, registrations, and member analytics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#374151]">{members.length}</div>
          <div className="text-sm text-[#6B7280]">Total Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#22C55E]">
            {members.filter((m: any) => m.status === 'active').length || members.length}
          </div>
          <div className="text-sm text-[#6B7280]">Active Members</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#F59E0B]">
            {members.filter((m: any) => m.gender === 'Female' || m.gender === 'female').length}
          </div>
          <div className="text-sm text-[#6B7280]">Female Members</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search members by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
            />
          </div>
        </div>
      </div>

      {/* Members Table + Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`bg-white rounded-lg shadow-sm border border-[#E2E8F0] ${selectedMember ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <div className="p-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#374151]">Members ({filteredMembers.length})</h2>
          </div>
          {selectedMember ? (
            <div className="divide-y divide-[#E2E8F0] max-h-[600px] overflow-y-auto">
              {filteredMembers.map((member: any) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors ${
                    selectedMember?.id === member.id ? 'bg-[#F0FDF4] border-l-4 border-[#22C55E]' : ''
                  }`}
                >
                  <div className="font-medium text-sm text-[#374151]">{getMemberName(member)}</div>
                  <div className="text-xs text-[#6B7280]">{member.email}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E2E8F0]">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Gender</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#374151] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E2E8F0]">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-[#6B7280]">
                        <UserPlus className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
                        <p>No members found.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member: any, index: number) => (
                      <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#374151]">{getMemberName(member)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#6B7280]">
                            <div>{member.email}</div>
                            <div className="text-xs">{member.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                          {member.city || member.state || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                          {member.gender || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              disabled={deleteMutation.isPending}
                              className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete member"
                            >
                              {deleteMutation.isPending && deleteMutation.variables === member.id ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Member Detail */}
        {selectedMember && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#374151]">{getMemberName(selectedMember)}</h2>
                  <p className="text-sm text-[#6B7280]">{selectedMember.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(selectedMember.id)}
                    disabled={deleteMutation.isPending}
                    className="bg-[#EF4444] text-white px-3 py-1.5 rounded-lg hover:bg-[#DC2626] flex items-center space-x-1 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteMutation.isPending && deleteMutation.variables === selectedMember.id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span>
                      {deleteMutation.isPending && deleteMutation.variables === selectedMember.id
                        ? 'Deleting...'
                        : 'Delete'}
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-[#6B7280] hover:text-[#374151] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Phone</label><p className="text-[#374151]">{selectedMember.phone || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Gender</label><p className="text-[#374151]">{selectedMember.gender || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">City</label><p className="text-[#374151]">{selectedMember.city || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">State</label><p className="text-[#374151]">{selectedMember.state || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Address</label><p className="text-[#374151]">{selectedMember.address || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Marital Status</label><p className="text-[#374151]">{selectedMember.marital_status || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Date of Birth</label><p className="text-[#374151]">{selectedMember.birth_date || 'N/A'}</p></div>
                <div><label className="text-xs font-medium text-[#6B7280] uppercase">Joined</label><p className="text-[#374151]">{selectedMember.created_at ? new Date(selectedMember.created_at).toLocaleDateString() : 'N/A'}</p></div>
              </div>
              {selectedMember.ministry_interests && (
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Ministry Interests</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Array.isArray(selectedMember.ministry_interests) ? selectedMember.ministry_interests : JSON.parse(selectedMember.ministry_interests || '[]')).map((interest: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-[#F0FDF4] text-[#15803D] text-xs rounded-full">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
