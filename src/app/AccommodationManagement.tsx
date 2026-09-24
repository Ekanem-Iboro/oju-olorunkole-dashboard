import React, { useState, useEffect } from 'react';
import { Search, Bed, CheckCircle, XCircle, Clock, Trash2, Eye, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetAccommodations } from '../../api/query';
import { useUpdateAccommodationStatus, useDeleteAccommodation } from '../../api/mutate';
import { ConfirmModal } from '../components/ConfirmModal';

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return err instanceof Error ? err.message : fallback;
};

export function AccommodationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data: accommodationsData, isLoading } = useGetAccommodations();
  const updateStatusMutation = useUpdateAccommodationStatus();
  const deleteMutation = useDeleteAccommodation();

  const bookings = Array.isArray(accommodationsData) ? accommodationsData : accommodationsData?.accommodations || [];

  useEffect(() => {
    if (!selectedBooking) return;
    const fresh = bookings.find((b: any) => b.id === selectedBooking.id);
    if (fresh) {
      setSelectedBooking((prev: any) => (prev ? { ...prev, ...fresh } : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, selectedBooking?.id]);

  const filteredBookings = bookings.filter((booking: any) => {
    const matchesSearch =
      booking.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.state?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'confirmed':
        return 'bg-[#22C55E] text-white';
      case 'cancelled':
        return 'bg-[#EF4444] text-white';
      case 'completed':
        return 'bg-[#3B82F6] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Status updated to ${newStatus}`);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, 'Failed to update status'));
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const pendingCount = bookings.filter((b: any) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b: any) => b.status === 'confirmed').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-[#22C55E]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="Are you sure you want to delete this booking? This action cannot be undone."
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTargetId === null) return;
          const targetId = deleteTargetId;
          deleteMutation.mutate(targetId, {
            onSuccess: () => {
              toast.success('Booking deleted successfully');
              if (selectedBooking?.id === targetId) setSelectedBooking(null);
              setDeleteTargetId(null);
            },
            onError: (error) => {
              toast.error(getErrorMessage(error, 'Failed to delete booking'));
              setDeleteTargetId(null);
            },
          });
        }}
        onCancel={() => {
          if (!deleteMutation.isPending) setDeleteTargetId(null);
        }}
      />
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Accommodation Management</h1>
        <p className="text-[#6B7280]">Manage guest house booking requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#374151]">{bookings.length}</div>
          <div className="text-sm text-[#6B7280]">Total Bookings</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#F59E0B]">{pendingCount}</div>
          <div className="text-sm text-[#6B7280]">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#22C55E]">{confirmedCount}</div>
          <div className="text-sm text-[#6B7280]">Confirmed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#3B82F6]">
            {bookings.filter((b: any) => b.status === 'completed').length}
          </div>
          <div className="text-sm text-[#6B7280]">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by name, email, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table + Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings List */}
        <div className={`bg-white rounded-lg shadow-sm border border-[#E2E8F0] ${selectedBooking ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <div className="p-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#374151]">
              Bookings ({filteredBookings.length})
            </h2>
          </div>
          {selectedBooking ? (
            <div className="divide-y divide-[#E2E8F0] max-h-[600px] overflow-y-auto">
              {filteredBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors ${
                    selectedBooking?.id === booking.id ? 'bg-[#F0FDF4] border-l-4 border-[#22C55E]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className={`font-medium text-sm ${booking.status === 'pending' ? 'text-[#374151]' : 'text-[#6B7280]'}`}>
                        {booking.full_name}
                      </p>
                      <p className="text-xs text-[#6B7280] truncate">{booking.email}</p>
                      <p className="text-xs text-[#6B7280]">{booking.check_in} - {booking.check_out}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatusBadge(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E2E8F0]">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Family</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#374151] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E2E8F0]">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280]">
                        <Bed className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
                        <p>No accommodation bookings found.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking: any, index: number) => (
                      <tr key={booking.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#374151]">{booking.full_name}</div>
                          <div className="text-xs text-[#6B7280]">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                          <div>{booking.check_in}</div>
                          <div className="text-xs">to {booking.check_out}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                          {booking.number_of_family}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                          <div>{booking.state}</div>
                          <div className="text-xs">{booking.local_government}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusBadge(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                              disabled={updateStatusMutation.isPending}
                              title="Update status"
                              className="text-xs border border-[#E2E8F0] rounded-lg px-2 py-1 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] disabled:opacity-50 cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                            {updateStatusMutation.isPending &&
                              updateStatusMutation.variables?.id === booking.id && (
                                <Loader className="h-3.5 w-3.5 animate-spin text-[#22C55E]" />
                              )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                              title="View booking & update status"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(booking.id)}
                              disabled={deleteMutation.isPending}
                              className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete booking"
                            >
                              {deleteMutation.isPending && deleteMutation.variables === booking.id ? (
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

        {/* Booking Detail */}
        {selectedBooking && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#374151]">{selectedBooking.full_name}</h2>
                  <p className="text-sm text-[#6B7280]">{selectedBooking.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-[#6B7280] hover:text-[#374151] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Actions */}
              <div>
                <label className="text-xs font-medium text-[#6B7280] uppercase mb-2 block">Update Status</label>
                <div className="flex space-x-2">
                  {['pending', 'confirmed', 'cancelled', 'completed'].map((status) => {
                    const isCurrent = selectedBooking.status === status;
                    const isUpdating =
                      updateStatusMutation.isPending &&
                      updateStatusMutation.variables?.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedBooking.id, status)}
                        disabled={isCurrent || updateStatusMutation.isPending}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize flex items-center space-x-1 ${
                          isCurrent
                            ? `${getStatusBadge(status)} cursor-default`
                            : 'bg-[#F8FAFC] text-[#6B7280] hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {isUpdating && (
                          <Loader className="h-3.5 w-3.5 animate-spin" />
                        )}
                        <span>{status}</span>
                      </button>
                    );
                  })}
                </div>
                {updateStatusMutation.isPending && (
                  <p className="mt-2 text-xs text-[#6B7280] flex items-center space-x-1">
                    <Loader className="h-3 w-3 animate-spin" />
                    <span>Saving status...</span>
                  </p>
                )}
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Phone</label>
                  <p className="text-[#374151]">{selectedBooking.phone_number}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Family Members</label>
                  <p className="text-[#374151]">{selectedBooking.number_of_family}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Check-in Date</label>
                  <p className="text-[#374151]">{selectedBooking.check_in}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Check-out Date</label>
                  <p className="text-[#374151]">{selectedBooking.check_out}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">State</label>
                  <p className="text-[#374151]">{selectedBooking.state || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Local Government</label>
                  <p className="text-[#374151]">{selectedBooking.local_government || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Submitted</label>
                  <p className="text-[#374151]">
                    {selectedBooking.created_at ? new Date(selectedBooking.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Status</label>
                  <p>
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 w-fit ${getStatusBadge(selectedBooking.status)}`}>
                      {getStatusIcon(selectedBooking.status)}
                      <span className="ml-1 capitalize">{selectedBooking.status}</span>
                    </span>
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedBooking.description && (
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Purpose of Visit</label>
                  <div className="mt-2 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <p className="text-[#374151] whitespace-pre-wrap">{selectedBooking.description}</p>
                  </div>
                </div>
              )}

              {/* Delete Button */}
              <div className="pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={() => handleDelete(selectedBooking.id)}
                  disabled={deleteMutation.isPending}
                  className="bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-[#DC2626] flex items-center space-x-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteMutation.isPending && deleteMutation.variables === selectedBooking.id ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span>
                    {deleteMutation.isPending && deleteMutation.variables === selectedBooking.id
                      ? 'Deleting...'
                      : 'Delete Booking'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
