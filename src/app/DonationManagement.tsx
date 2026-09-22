import React, { useState } from 'react';
import { TrendingUp, Calendar, Eye, Filter, Loader } from 'lucide-react';
import { NairaIcon } from '../components/icons/NairaIcon';
import { useGetDonations, useGetDonationStats } from '../../api/query';
import { useUpdateDonationStatus } from '../../api/mutate';

export function DonationManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  const { data: donationsData, isLoading } = useGetDonations();
  const { data: statsData } = useGetDonationStats();
  const updateStatusMutation = useUpdateDonationStatus();

  const donations = Array.isArray(donationsData) ? donationsData : donationsData?.donations || [];
  const stats = statsData || {};

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#22C55E] text-white';
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'failed':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
    setSelectedDonation(null);
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
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Donation Management</h1>
        <p className="text-[#6B7280]">Track donations, manage recurring gifts, and generate reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-50">
              <NairaIcon className="h-6 w-6 text-[#22C55E]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Total Donations</h3>
            <p className="text-2xl font-semibold text-[#374151]">
              {stats.total_amount ? `₦${Number(stats.total_amount).toLocaleString()}` : '₦0'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-blue-50">
              <Calendar className="h-6 w-6 text-[#3B82F6]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Total Count</h3>
            <p className="text-2xl font-semibold text-[#374151]">{stats.total_count || donations.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-yellow-50">
              <NairaIcon className="h-6 w-6 text-[#F59E0B]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Average Gift</h3>
            <p className="text-2xl font-semibold text-[#374151]">
              {stats.average_amount ? `₦${Number(stats.average_amount).toLocaleString()}` : '₦0'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-lime-50">
              <TrendingUp className="h-6 w-6 text-[#84CC16]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Top Donor</h3>
            <p className="text-2xl font-semibold text-[#374151] text-sm">
              {stats.top_donor || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#374151]">All Donations</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#374151] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280]">
                    <NairaIcon className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
                    <p>No donations found.</p>
                  </td>
                </tr>
              ) : (
                donations.map((donation: any, index: number) => (
                  <tr key={donation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-[#374151]">
                        ₦{Number(donation.amount).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#6B7280]">{donation.donor_name || 'Anonymous'}</div>
                      {donation.email && <div className="text-xs text-[#9CA3AF]">{donation.email}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                      {donation.created_at ? new Date(donation.created_at).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                      {donation.payment_method || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(donation.payment_status || donation.status)}`}>
                        {(donation.payment_status || donation.status || 'pending').charAt(0).toUpperCase() + (donation.payment_status || donation.status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDonation(null)}>
          <div className="bg-white rounded-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Donation Details</h2>
              <button onClick={() => setSelectedDonation(null)} className="text-[#6B7280] hover:text-[#374151] text-sm">Close</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-[#6B7280]">Amount</span><span className="font-semibold text-[#374151]">₦{Number(selectedDonation.amount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6B7280]">Donor</span><span className="text-[#374151]">{selectedDonation.donor_name || 'Anonymous'}</span></div>
              <div className="flex justify-between"><span className="text-[#6B7280]">Email</span><span className="text-[#374151]">{selectedDonation.email || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#6B7280]">Phone</span><span className="text-[#374151]">{selectedDonation.phone || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#6B7280]">Method</span><span className="text-[#374151]">{selectedDonation.payment_method || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#6B7280]">Date</span><span className="text-[#374151]">{selectedDonation.created_at ? new Date(selectedDonation.created_at).toLocaleString() : 'N/A'}</span></div>
              {selectedDonation.purpose && <div className="flex justify-between"><span className="text-[#6B7280]">Purpose</span><span className="text-[#374151]">{selectedDonation.purpose}</span></div>}
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
              <label className="text-xs font-medium text-[#6B7280] uppercase mb-2 block">Update Status</label>
              <div className="flex space-x-2">
                {['pending', 'completed', 'failed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedDonation.id, status)}
                    disabled={(selectedDonation.payment_status || selectedDonation.status) === status}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                      (selectedDonation.payment_status || selectedDonation.status) === status
                        ? `${getStatusBadge(status)} cursor-default`
                        : 'bg-[#F8FAFC] text-[#6B7280] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
