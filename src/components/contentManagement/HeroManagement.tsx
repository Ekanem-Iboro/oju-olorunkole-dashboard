import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Loader, Image } from 'lucide-react';
import { useGetHeroSlides } from '../../../api/query';
import { useDeleteHeroSlide, useAddHeroSlide } from '../../../api/mutate';

export function HeroManager() {
  const [selectedSlide, setSelectedSlide] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', image_url: '', button_text: '', button_link: '' });

  const { data: slidesData, isLoading, refetch } = useGetHeroSlides();
  const deleteMutation = useDeleteHeroSlide();
  const addMutation = useAddHeroSlide();

  const slides = Array.isArray(slidesData) ? slidesData : slidesData?.slides || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-[#22C55E] text-white';
      case 'draft':
        return 'bg-[#F59E0B] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      deleteMutation.mutate(id);
      setSelectedSlide(null);
    }
  };

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.image_url) return;
    addMutation.mutate(newSlide, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setNewSlide({ title: '', subtitle: '', image_url: '', button_text: '', button_link: '' });
        refetch();
      }
    });
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#374151]">Hero Carousel</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Add Slide</span>
        </button>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-12 text-center">
          <Image className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
          <p className="text-[#6B7280]">No hero slides yet. Create one from the API or content manager.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slides.map((slide: any) => (
            <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                {slide.image_url ? (
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
                    <Image className="h-12 w-12 text-[#E2E8F0]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg mb-1">{slide.title}</h3>
                    {slide.subtitle && <p className="text-sm opacity-90">{slide.subtitle}</p>}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(slide.status)}`}>
                    {slide.status?.charAt(0).toUpperCase() + slide.status?.slice(1) || 'Draft'}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedSlide(slide)}
                      className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSlide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSlide(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">{selectedSlide.title}</h2>
              <button onClick={() => setSelectedSlide(null)} className="text-[#6B7280] hover:text-[#374151] text-sm">Close</button>
            </div>
            {selectedSlide.image_url && (
              <img src={selectedSlide.image_url} alt={selectedSlide.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <div className="space-y-2">
              <div><span className="text-xs text-[#6B7280] uppercase">Subtitle:</span><p className="text-[#374151]">{selectedSlide.subtitle || 'N/A'}</p></div>
              <div><span className="text-xs text-[#6B7280] uppercase">Status:</span><p><span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedSlide.status)}`}>{selectedSlide.status}</span></p></div>
              {selectedSlide.cta_text && <div><span className="text-xs text-[#6B7280] uppercase">CTA:</span><p className="text-[#374151]">{selectedSlide.cta_text}</p></div>}
              {selectedSlide.cta_link && <div><span className="text-xs text-[#6B7280] uppercase">CTA Link:</span><p className="text-[#374151]">{selectedSlide.cta_link}</p></div>}
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Add Hero Slide</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#6B7280] hover:text-[#374151] text-sm">Close</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Title *</label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                  placeholder="Enter slide title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                  placeholder="Enter subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Image URL *</label>
                <input
                  type="text"
                  value={newSlide.image_url}
                  onChange={(e) => setNewSlide({ ...newSlide, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Button Text</label>
                <input
                  type="text"
                  value={newSlide.button_text}
                  onChange={(e) => setNewSlide({ ...newSlide, button_text: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                  placeholder="e.g., Learn More"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Button Link</label>
                <input
                  type="text"
                  value={newSlide.button_link}
                  onChange={(e) => setNewSlide({ ...newSlide, button_link: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                  placeholder="https://example.com/page"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSlide}
                  disabled={!newSlide.title || !newSlide.image_url || addMutation.isPending}
                  className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {addMutation.isPending && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <span>{addMutation.isPending ? 'Adding...' : 'Add Slide'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
