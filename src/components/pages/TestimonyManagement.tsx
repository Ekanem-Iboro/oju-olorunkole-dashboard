import React, { useState } from 'react';
import { CheckCircle, X, Edit, Eye, Star } from 'lucide-react';

export function TestimonyManagement() {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingTestimonies = [
    {
      id: 1,
      name: 'Michael Brown',
      email: 'michael@example.com',
      title: 'Healing and Hope',
      content: 'I want to share how God has brought healing to my family during our most difficult time. When my wife was diagnosed with cancer, we felt overwhelmed and scared...',
      category: 'Healing',
      submittedDate: '2024-01-10',
      featured: false,
    },
    {
      id: 2,
      name: 'Sarah Thompson',
      email: 'sarah@example.com',
      title: 'Finding Purpose',
      content: 'After years of searching for meaning in my life, I found my purpose through serving in our church community. The volunteer work has transformed my perspective...',
      category: 'General',
      submittedDate: '2024-01-12',
      featured: true,
    },
  ];

  const publishedTestimonies = [
    {
      id: 3,
      name: 'John Wilson',
      title: 'From Addiction to Freedom',
      content: 'My journey from addiction to recovery has been nothing short of miraculous. Through the support of this church family and God\'s grace...',
      category: 'Breakthrough',
      publishedDate: '2024-01-08',
      views: 247,
      featured: true,
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      title: 'A New Beginning',
      content: 'Coming to faith later in life has been the most rewarding decision I\'ve ever made. The community here welcomed me with open arms...',
      category: 'Salvation',
      publishedDate: '2024-01-05',
      views: 189,
      featured: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Healing':
        return 'bg-[#22C55E] text-white';
      case 'Salvation':
        return 'bg-[#F59E0B] text-white';
      case 'Breakthrough':
        return 'bg-[#84CC16] text-white';
      default:
        return 'bg-[#3B82F6] text-white';
    }
  };

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

      <div className="space-y-4">
        {pendingTestimonies.map((testimony) => (
          <div key={testimony.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#374151]">{testimony.title}</h3>
                  {testimony.featured && (
                    <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-3">
                  <span>{testimony.name}</span>
                  <span>•</span>
                  <span>{testimony.email}</span>
                  <span>•</span>
                  <span>{new Date(testimony.submittedDate).toLocaleDateString()}</span>
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimony.category)}`}>
                  {testimony.category}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[#6B7280] line-clamp-3">{testimony.content}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button className="flex items-center space-x-2 text-[#3B82F6] hover:text-[#2563EB] transition-colors">
                <Eye className="h-4 w-4" />
                <span>Preview Full</span>
              </button>
              
              <div className="flex space-x-2">
                <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button className="bg-[#6B7280] text-white px-4 py-2 rounded-lg hover:bg-[#374151] flex items-center space-x-2 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-[#DC2626] flex items-center space-x-2 transition-colors">
                  <X className="h-4 w-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {publishedTestimonies.map((testimony) => (
          <div key={testimony.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#374151]">{testimony.title}</h3>
                  {testimony.featured && (
                    <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-3">
                  <span>{testimony.name}</span>
                  <span>•</span>
                  <span>{new Date(testimony.publishedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{testimony.views} views</span>
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimony.category)}`}>
                  {testimony.category}
                </span>
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
                <button className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-[#F59E0B] hover:text-[#D97706] p-1 transition-colors">
                  <Star className="h-4 w-4" />
                </button>
                <button className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#374151] mb-2">Testimony Categories</h2>
        <p className="text-[#6B7280]">Manage testimony categories and their settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Healing', count: 15, color: 'bg-[#22C55E]' },
          { name: 'Salvation', count: 23, color: 'bg-[#F59E0B]' },
          { name: 'Breakthrough', count: 12, color: 'bg-[#84CC16]' },
          { name: 'General', count: 31, color: 'bg-[#3B82F6]' },
        ].map((category) => (
          <div key={category.name} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
            <div className={`w-3 h-3 ${category.color} rounded-full mb-3`}></div>
            <h3 className="text-lg font-semibold text-[#374151] mb-1">{category.name}</h3>
            <p className="text-[#6B7280] text-sm mb-4">{category.count} testimonials</p>
            <button className="text-[#3B82F6] hover:text-[#2563EB] text-sm font-medium transition-colors">
              Edit Category
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Testimony Management</h1>
        <p className="text-[#6B7280]">Review, approve, and manage church testimonials.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-1">
        <div className="flex space-x-1">
          {[
            { id: 'pending', label: 'Pending Approvals' },
            { id: 'published', label: 'Published' },
            { id: 'categories', label: 'Categories' },
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

      {/* Content */}
      {activeTab === 'pending' && renderPendingTestimonies()}
      {activeTab === 'published' && renderPublishedTestimonies()}
      {activeTab === 'categories' && renderCategories()}
    </div>
  );
}