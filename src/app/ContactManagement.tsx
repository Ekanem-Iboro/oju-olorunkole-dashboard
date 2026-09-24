import React, { useState } from 'react';
import { Search, Mail, MailOpen, Trash2, Eye, Filter, Loader } from 'lucide-react';
import { useGetContacts } from '../../api/query';
import { useMarkContactRead, useDeleteContact } from '../../api/mutate';
import { ConfirmModal } from '../components/ConfirmModal';

export function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data: contactsData, isLoading } = useGetContacts();
  const markReadMutation = useMarkContactRead();
  const deleteMutation = useDeleteContact();

  const contacts = Array.isArray(contactsData) ? contactsData : contactsData?.contacts || [];

  const filteredContacts = contacts.filter((contact: any) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesPurpose = filterPurpose === 'all' || contact.purpose === filterPurpose;
    return matchesSearch && matchesStatus && matchesPurpose;
  });

  const unreadCount = contacts.filter((c: any) => c.status === 'unread').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-[#F59E0B] text-white';
      case 'read':
        return 'bg-[#22C55E] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'Prayer Request':
        return 'bg-purple-100 text-purple-700';
      case 'Pastoral Care':
        return 'bg-blue-100 text-blue-700';
      case 'Ministry Involvement':
        return 'bg-green-100 text-green-700';
      case 'Event Information':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewContact = (contact: any) => {
    setSelectedContact(contact);
    if (contact.status === 'unread') {
      markReadMutation.mutate(contact.id);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteTargetId(id);
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
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="Are you sure you want to delete this contact message? This action cannot be undone."
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTargetId === null) return;
          const targetId = deleteTargetId;
          deleteMutation.mutate(targetId, {
            onSuccess: () => {
              if (selectedContact?.id === targetId) setSelectedContact(null);
              setDeleteTargetId(null);
            },
            onError: () => setDeleteTargetId(null),
          });
        }}
        onCancel={() => {
          if (!deleteMutation.isPending) setDeleteTargetId(null);
        }}
      />
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Contact Management</h1>
        <p className="text-[#6B7280]">Manage contact form submissions and prayer requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#374151]">{contacts.length}</div>
          <div className="text-sm text-[#6B7280]">Total Messages</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#F59E0B]">{unreadCount}</div>
          <div className="text-sm text-[#6B7280]">Unread</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#22C55E]">{contacts.length - unreadCount}</div>
          <div className="text-sm text-[#6B7280]">Read</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="text-2xl font-semibold text-[#3B82F6]">
            {contacts.filter((c: any) => c.purpose === 'Prayer Request').length}
          </div>
          <div className="text-sm text-[#6B7280]">Prayer Requests</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
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
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <select
            value={filterPurpose}
            onChange={(e) => setFilterPurpose(e.target.value)}
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
          >
            <option value="all">All Purposes</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Prayer Request">Prayer Request</option>
            <option value="Pastoral Care">Pastoral Care</option>
            <option value="Ministry Involvement">Ministry Involvement</option>
            <option value="Event Information">Event Information</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Contact List + Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className={`bg-white rounded-lg shadow-sm border border-[#E2E8F0] ${selectedContact ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <div className="p-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#374151]">
              Messages ({filteredContacts.length})
            </h2>
          </div>
          <div className="divide-y divide-[#E2E8F0] max-h-[600px] overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-[#6B7280]">
                <Mail className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
                <p>No contact messages found.</p>
              </div>
            ) : (
              filteredContacts.map((contact: any) => (
                <div
                  key={contact.id}
                  onClick={() => handleViewContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-[#F0FDF4] border-l-4 border-[#22C55E]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {contact.status === 'unread' ? (
                          <Mail className="h-4 w-4 text-[#F59E0B] flex-shrink-0" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-[#6B7280] flex-shrink-0" />
                        )}
                        <span className={`font-medium text-sm ${contact.status === 'unread' ? 'text-[#374151]' : 'text-[#6B7280]'}`}>
                          {contact.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] truncate">{contact.email}</p>
                      <p className="text-xs text-[#6B7280] truncate mt-1">{contact.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(contact.status)}`}>
                          {contact.status}
                        </span>
                        {contact.purpose && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getPurposeColor(contact.purpose)}`}>
                            {contact.purpose}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#6B7280] flex-shrink-0 ml-2">
                      {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Detail */}
        {selectedContact && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#374151]">{selectedContact.name}</h2>
                  <p className="text-sm text-[#6B7280]">{selectedContact.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    disabled={deleteMutation.isPending}
                    className="bg-[#EF4444] text-white px-3 py-1.5 rounded-lg hover:bg-[#DC2626] flex items-center space-x-1 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteMutation.isPending && deleteMutation.variables === selectedContact.id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span>
                      {deleteMutation.isPending && deleteMutation.variables === selectedContact.id
                        ? 'Deleting...'
                        : 'Delete'}
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-[#6B7280] hover:text-[#374151] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC] text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Phone</label>
                  <p className="text-[#374151]">{selectedContact.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Purpose</label>
                  <p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPurposeColor(selectedContact.purpose)}`}>
                      {selectedContact.purpose || 'Not specified'}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Status</label>
                  <p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Date</label>
                  <p className="text-[#374151]">
                    {selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6B7280] uppercase">Message</label>
                <div className="mt-2 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <p className="text-[#374151] whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
