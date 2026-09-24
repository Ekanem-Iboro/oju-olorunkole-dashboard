import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Loader, Image, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetHeroSlides, useGetHeroSlide } from '../../../api/query';
import { useDeleteHeroSlide, useAddHeroSlide, useUpdateHeroSlide, useUploadImage } from '../../../api/mutate';
import { ConfirmModal } from '../ConfirmModal';

interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  is_active?: boolean | number;
  display_order?: number;
}

interface SlideFormData {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  display_order: number;
  is_active: boolean;
}

const emptyForm: SlideFormData = {
  title: '',
  subtitle: '',
  button_text: '',
  button_link: '',
  display_order: 0,
  is_active: true,
};

const resolveImageUrl = (url?: string | null): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) {
    return `${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}${url}`;
  }
  return url;
};

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return err instanceof Error ? err.message : fallback;
};

const isActive = (value?: boolean | number | null) =>
  value === true || value === 1;

export function HeroManager() {
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSlideId, setEditSlideId] = useState<number | null>(null);
  const [form, setForm] = useState<SlideFormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data: slidesData, isLoading, refetch } = useGetHeroSlides();
  const { data: editSlide } = useGetHeroSlide(editSlideId ?? 0);
  const deleteMutation = useDeleteHeroSlide();
  const addMutation = useAddHeroSlide();
  const updateMutation = useUpdateHeroSlide();
  const uploadMutation = useUploadImage();

  const slides: HeroSlide[] = Array.isArray(slidesData)
    ? slidesData
    : slidesData?.slides || slidesData?.hero_slides || [];

  const isSaving =
    addMutation.isPending || updateMutation.isPending || uploadMutation.isPending;

  useEffect(() => {
    if (isEditModalOpen && editSlide) {
      const slide: HeroSlide =
        editSlide.slide || editSlide.hero_slide || editSlide;
      setForm({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        button_text: slide.button_text || '',
        button_link: slide.button_link || '',
        display_order: slide.display_order ?? 0,
        is_active: isActive(slide.is_active),
      });
      setImageFile(null);
      setImagePreview(resolveImageUrl(slide.image_url));
      setUploadedImageUrl(slide.image_url || '');
    }
  }, [isEditModalOpen, editSlide]);

  const getStatusBadge = (value?: boolean | number | null) =>
    isActive(value)
      ? 'bg-[#22C55E] text-white'
      : 'bg-[#E2E8F0] text-[#6B7280]';

  const getStatusLabel = (value?: boolean | number | null) =>
    isActive(value) ? 'Active' : 'Inactive';

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setUploadedImageUrl('');
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditSlideId(slide.id);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setUploadedImageUrl('');
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditSlideId(null);
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return uploadedImageUrl || null;
    const uploaded = await uploadMutation.mutateAsync(imageFile);
    const image_url = uploaded?.image_url || uploaded?.url || uploaded?.path;
    if (!image_url) {
      toast.error('Upload succeeded but no image URL was returned');
      return null;
    }
    return image_url;
  };

  const handleDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const handleAddSlide = async () => {
    if (!form.title) return;
    try {
      const image_url = await uploadImage();
      if (!image_url) {
        if (!imageFile) toast.error('Please choose an image');
        return;
      }
      await addMutation.mutateAsync({ ...form, image_url });
      toast.success('Slide added successfully');
      closeModals();
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to add slide'));
    }
  };

  const handleUpdateSlide = async () => {
    if (!editSlideId || !form.title) return;
    try {
      const image_url = await uploadImage();
      if (!image_url) {
        toast.error('Slide image is required');
        return;
      }
      await updateMutation.mutateAsync({
        id: editSlideId,
        data: { ...form, image_url },
      });
      toast.success('Slide updated successfully');
      closeModals();
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update slide'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-[#22C55E]" size={32} />
      </div>
    );
  }

  const isUploadingImage = uploadMutation.isPending;

  const renderFormFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
          placeholder="Enter slide title"
          disabled={isSaving}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">Subtitle</label>
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
          placeholder="Enter subtitle"
          disabled={isSaving}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">Button Text</label>
          <input
            type="text"
            value={form.button_text}
            onChange={(e) => setForm({ ...form, button_text: e.target.value })}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
            placeholder="e.g., Learn More"
            disabled={isSaving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">Button Link</label>
          <input
            type="text"
            value={form.button_link}
            onChange={(e) => setForm({ ...form, button_link: e.target.value })}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
            placeholder="/contact or https://..."
            disabled={isSaving}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">Display Order</label>
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
            disabled={isSaving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">Status</label>
          <select
            value={form.is_active ? 'active' : 'inactive'}
            onChange={(e) => setForm({ ...form, is_active: e.target.value === 'active' })}
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none bg-white"
            disabled={isSaving}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#374151] mb-1">
          Image {isEditModalOpen ? '(leave unchanged to keep current)' : '*'}
        </label>
        <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4 text-center hover:border-[#22C55E] transition-colors">
          <Upload className="h-8 w-8 mx-auto mb-2 text-[#9CA3AF]" />
          <p className="text-sm text-[#6B7280] mb-2">Upload a slide image</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id={isEditModalOpen ? 'edit-hero-slide-image' : 'hero-slide-image'}
            disabled={isSaving}
          />
          <label
            htmlFor={isEditModalOpen ? 'edit-hero-slide-image' : 'hero-slide-image'}
            className="inline-block px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] cursor-pointer transition-colors text-sm font-medium"
          >
            {isUploadingImage ? 'Uploading...' : 'Choose Image'}
          </label>
          {imageFile && (
            <p className="mt-2 text-xs text-[#374151]">{imageFile.name}</p>
          )}
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Slide preview"
            className="mt-3 w-full h-40 object-cover rounded-lg border border-[#E2E8F0]"
          />
        )}
      </div>
    </div>
  );

  const renderActions = (onSave: () => void, saveLabel: string) => (
    <div className="flex justify-end space-x-3 pt-4 border-t border-[#E2E8F0]">
      <button
        onClick={closeModals}
        disabled={isSaving}
        className="px-4 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={!form.title || isSaving || (!imageFile && !uploadedImageUrl)}
        className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isSaving && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        <span>{isSaving ? 'Saving...' : saveLabel}</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="Are you sure you want to delete this slide? This action cannot be undone."
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTargetId === null) return;
          deleteMutation.mutate(deleteTargetId, {
            onSuccess: () => {
              toast.success('Slide deleted successfully');
              setSelectedSlide(null);
              setDeleteTargetId(null);
              refetch();
            },
            onError: (error) => {
              toast.error(getErrorMessage(error, 'Failed to delete slide'));
              setDeleteTargetId(null);
            },
          });
        }}
        onCancel={() => {
          if (!deleteMutation.isPending) setDeleteTargetId(null);
        }}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#374151]">Hero Carousel</h2>
        <button
          onClick={openAddModal}
          className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Add Slide</span>
        </button>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-12 text-center">
          <Image className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
          <p className="text-[#6B7280]">No hero slides yet. Create your first slide to show it on the home page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slides.map((slide: HeroSlide) => (
            <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                {slide.image_url ? (
                  <img
                    src={resolveImageUrl(slide.image_url)}
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
                {slide.button_text && (
                  <div className="absolute top-3 left-3 bg-white/90 text-[#374151] text-xs font-medium px-2 py-1 rounded">
                    {slide.button_text}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(slide.is_active)}`}>
                      {getStatusLabel(slide.is_active)}
                    </span>
                    <span className="text-xs text-[#6B7280]">Order: {slide.display_order ?? 0}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedSlide(slide)}
                      className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                      title="View slide"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(slide)}
                      className="text-[#22C55E] hover:text-[#16A34A] p-1 transition-colors"
                      title="Edit slide"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      disabled={deleteMutation.isPending}
                      className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete slide"
                    >
                      {deleteMutation.isPending && deleteMutation.variables === slide.id ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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
              <img
                src={resolveImageUrl(selectedSlide.image_url)}
                alt={selectedSlide.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-2">
              <div>
                <span className="text-xs text-[#6B7280] uppercase">Subtitle:</span>
                <p className="text-[#374151]">{selectedSlide.subtitle || 'N/A'}</p>
              </div>
              <div>
                <span className="text-xs text-[#6B7280] uppercase">Status:</span>
                <p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedSlide.is_active)}`}>
                    {getStatusLabel(selectedSlide.is_active)}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-xs text-[#6B7280] uppercase">Display Order:</span>
                <p className="text-[#374151]">{selectedSlide.display_order ?? 0}</p>
              </div>
              <div>
                <span className="text-xs text-[#6B7280] uppercase">Button Text:</span>
                <p className="text-[#374151]">{selectedSlide.button_text || 'N/A'}</p>
              </div>
              <div>
                <span className="text-xs text-[#6B7280] uppercase">Button Link:</span>
                <p className="text-[#374151]">{selectedSlide.button_link || 'N/A'}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  const slide = selectedSlide;
                  setSelectedSlide(null);
                  openEditModal(slide);
                }}
                className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Slide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModals}>
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Add Hero Slide</h2>
              <button onClick={closeModals} className="text-[#6B7280] hover:text-[#374151] text-sm">Close</button>
            </div>
            {renderFormFields()}
            <div className="pt-4">
              {renderActions(handleAddSlide, 'Add Slide')}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModals}>
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#374151]">Edit Hero Slide</h2>
              <button onClick={closeModals} className="text-[#6B7280] hover:text-[#374151] text-sm">Close</button>
            </div>
            {!editSlide && editSlideId ? (
              <div className="p-6 text-center text-[#6B7280] flex items-center justify-center space-x-2">
                <Loader className="animate-spin text-[#22C55E]" size={20} />
                <span>Loading slide data...</span>
              </div>
            ) : (
              <>
                {renderFormFields()}
                <div className="pt-4">
                  {renderActions(handleUpdateSlide, 'Update Slide')}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
