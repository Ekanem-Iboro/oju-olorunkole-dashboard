import React, { useState } from 'react';
import { CheckCircle, X, Star, Eye, Loader } from 'lucide-react';
import { useGetTestimonials, useGetPendingTestimonials } from '../../api/query';
import { useApproveTestimonial, useRejectTestimonial, useToggleFeaturedTestimonial, useDeleteTestimonial } from '../../api/mutate';

export function TestimonyManagement() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedTestimony, setSelectedTestimony] = useState<any>(null);

  const { data: testimonialsData, isLoading: loadingAll } = useGetTestimonials();
  const { data: pendingData, isLoading: loadingPending } = useGetPendingTestimonials();
  const approveMutation = useApproveTestimonial();
  const rejectMutation = useRejectTestimonial();
  const featureMutation = useToggleFeaturedTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const allTestimonials = Array.isArray(testimonialsData) ? testimonialsData : testimonialsData?.testimonials || [];
  const pendingTestimonies = Array.isArray(pendingData) ? pendingData : pendingData?.testimonials || [];
  const publishedTestimonies = allTestimonials.filter((t: any) => t.status === 'approved' || t.status === 'published');

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'healing': case 'healing & restoration':
        return 'bg-[#22C55E] text-white';
      case 'salvation': case 'salvation & new life':
        return 'bg-[#F59E0B] text-white';
      case 'breakthrough': case "god's provision":
        return 'bg-[#84CC16] text-white';
      case 'ministry': case 'ministry & calling':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-[#3B82F6] text-white';
    }
  };

  const handleApprove = (id: number) => {
    approveMutation.mutate(id);
    setSelectedTestimony(null);
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate(id);
    setSelectedTestimony(null);
  };

  const handleFeature = (id: number) => {
    featureMutation.mutate(id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimony?')) {
      deleteMutation.mutate(id);
      setSelectedTestimony(null);
    }
  };

  const isLoading = loadingAll || loadingPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-[#22C55E]" size={32} />
      </div>
    );
  }

  const renderPendingTestimonies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#374151]">Pending Testimonials</h2>
          <p className="text-[#6B7280]">Review and approve submitted testimonials</p>
        </div>
        <div className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-sm font-medium">
          {pendingTestimonies.length} Pending
        </div>
      </div>

      {pendingTestimonies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-12 text-center">
          <CheckCircle className="h-12 w-12 mx-auto mb-3 text-[#22C55E]" />
          <p className="text-[#6B7280]">All caught up! No pending testimonials.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingTestimonies.map((testimony: any) => (
            <div key={testimony.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#374151]">{testimony.title}</h3>
                    {testimony.is_featured && (
                      <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-3">
                    <span>{testimony.is_anonymous ? 'Anonymous' : testimony.name}</span>
                    {testimony.email && <><span>•</span><span>{testimony.email}</span></>}
                    <span>•</span>
                    <span>{testimony.created_at ? new Date(testimony.created_at).toLocaleDateString() : ''}</span>
                  </div>
                  {testimony.category && (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimony.category)}`}>
                      {testimony.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[#6B7280] line-clamp-3">{testimony.content}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={() => setSelectedTestimony(testimony)}
                  className="flex items-center space-x-2 text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Full</span>
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(testimony.id)}
                    disabled={approveMutation.isPending}
                    className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(testimony.id)}
                    disabled={rejectMutation.isPending}
                    className="bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-[#DC2626] flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPublishedTestimonies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#374151]">Published Testimonials</h2>
          <p className="text-[#6B7280]">Manage your published testimonials</p>
        </div>
        <div className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-sm font-medium">
          {publishedTestimonies.length} Published
        </div>
      </div>

      {publishedTestimonies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-12 text-center">
          <p className="text-[#6B7280]">No published testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {publishedTestimonies.map((testimony: any) => (
            <div key={testimony.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#374151]">{testimony.title}</h3>
                    {testimony.is_featured && (
                      <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-3">
                    <span>{testimony.is_anonymous ? 'Anonymous' : testimony.name}</span>
                    <span>•</span>
                    <span>{testimony.created_at ? new Date(testimony.created_at).toLocaleDateString() : ''}</span>
                  </div>
                  {testimony.category && (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimony.category)}`}>
                      {testimony.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[#6B7280] line-clamp-3">{testimony.content}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                  <span className="text-[#6B7280]">Published</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFeature(testimony.id)}
                    className={`p-1 transition-colors ${testimony.is_featured ? 'text-[#F59E0B]' : 'text-[#6B7280] hover:text-[#F59E0B]'}`}
                    title={testimony.is_featured ? 'Unfeature' : 'Feature'}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimony.id)}
                    className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDetailModal = () => {
    if (!selectedTestimony) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTestimony(null)}>
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#374151]">{selectedTestimony.title}</h2>
            <button onClick={() => setSelectedTestimony(null)} className="text-[#6B7280] hover:text-[#374151]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-4">
            <span>{selectedTestimony.is_anonymous ? 'Anonymous' : selectedTestimony.name}</span>
            {selectedTestimony.email && <><span>•</span><span>{selectedTestimony.email}</span></>}
            <span>•</span>
            <span>{selectedTestimony.created_at ? new Date(selectedTestimony.created_at).toLocaleDateString() : ''}</span>
          </div>
          {selectedTestimony.category && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-4 ${getCategoryColor(selectedTestimony.category)}`}>
              {selectedTestimony.category}
            </span>
          )}
          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-[#374151] whitespace-pre-wrap">{selectedTestimony.content}</p>
          </div>
          {selectedTestimony.status === 'pending' && (
            <div className="flex space-x-2 pt-4 border-t border-[#E2E8F0]">
              <button onClick={() => handleApprove(selectedTestimony.id)} className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Approve</span>
              </button>
              <button onClick={() => handleReject(selectedTestimony.id)} className="bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-[#DC2626] flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Reject</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderDetailModal()}

      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Testimony Management</h1>
        <p className="text-[#6B7280]">Review, approve, and manage church testimonials.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-1">
        <div className="flex space-x-1">
          {[
            { id: 'pending', label: 'Pending Approvals' },
            { id: 'published', label: 'Published' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#22C55E] text-white'
                  : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab.label}
              {tab.id === 'pending' && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white text-[#22C55E]' : 'bg-[#F59E0B] text-white'
                }`}>
                  {pendingTestimonies.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'pending' && renderPendingTestimonies()}
      {activeTab === 'published' && renderPublishedTestimonies()}
    </div>
  );
}
