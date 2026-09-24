import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Loader, Image } from 'lucide-react';
import { useGetBanners, useGetBanner } from '../../../api/query';
import { useDeleteBanner, useAddBanner, useUpdateBanner, useUploadImage } from '../../../api/mutate';
import { ConfirmModal } from '../ConfirmModal';

interface BannerFormData {
    title: string;
    subtitle: string;
    button_text: string;
    button_link: string;
    display_order: number;
    is_active: boolean;
}

interface BannerRow {
    id: number;
    title: string;
    subtitle?: string | null;
    image_url?: string | null;
    button_text?: string | null;
    button_link?: string | null;
    is_active?: boolean | number;
    display_order?: number;
}

const emptyForm: BannerFormData = {
    title: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    display_order: 0,
    is_active: true,
};

export function BannerManager() {
    const [selectedBanner, setSelectedBanner] = useState<BannerRow | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBannerId, setEditBannerId] = useState<number | null>(null);
    const [form, setForm] = useState<BannerFormData>(emptyForm);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const { data: bannersData, isLoading } = useGetBanners();
    const { data: editBanner } = useGetBanner(editBannerId ?? 0);
    const deleteMutation = useDeleteBanner();
    const addMutation = useAddBanner();
    const updateMutation = useUpdateBanner();
    const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

    const banners = Array.isArray(bannersData) ? bannersData : bannersData?.banners || [];

    const isSaving = addMutation.isPending || updateMutation.isPending || isUploading;

    useEffect(() => {
        if (isEditModalOpen && editBanner) {
            setForm({
                title: editBanner.title || '',
                subtitle: editBanner.subtitle || '',
                button_text: editBanner.button_text || '',
                button_link: editBanner.button_link || '',
                display_order: editBanner.display_order ?? 0,
                is_active: editBanner.is_active === true || editBanner.is_active === 1,
            });
            setImagePreview(editBanner.image_url || '');
            setUploadedImageUrl(editBanner.image_url || '');
        }
    }, [isEditModalOpen, editBanner]);

    const handleDelete = (id: number) => {
        setDeleteTargetId(id);
    };

    const openAddModal = () => {
        setForm(emptyForm);
        setImagePreview('');
        setUploadedImageUrl('');
        setIsAddModalOpen(true);
    };

    const openEditModal = (banner: BannerRow) => {
        setEditBannerId(banner.id);
        setForm(emptyForm);
        setImagePreview('');
        setUploadedImageUrl('');
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditBannerId(null);
        setForm(emptyForm);
        setImagePreview('');
        setUploadedImageUrl('');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);

        uploadImage(file, {
            onSuccess: (response) => {
                setUploadedImageUrl(response.image_url);
            },
            onError: (error) => {
                console.error('Error uploading image:', error);
                setUploadedImageUrl('');
                setImagePreview('');
            },
        });
    };

    const handleAdd = () => {
        if (!form.title || !uploadedImageUrl) return;
        addMutation.mutate(
            { ...form, image_url: uploadedImageUrl },
            {
                onSuccess: () => closeModals(),
            }
        );
    };

    const handleUpdate = () => {
        if (!editBannerId || !form.title || !uploadedImageUrl) return;
        updateMutation.mutate(
            { id: editBannerId, data: { ...form, image_url: uploadedImageUrl } },
            {
                onSuccess: () => closeModals(),
            }
        );
    };

    const getStatusBadge = (isActive: boolean | number | null | undefined) =>
        isActive === true || isActive === 1
            ? 'bg-[#22C55E] text-white'
            : 'bg-[#E2E8F0] text-[#6B7280]';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="animate-spin text-[#22C55E]" size={32} />
            </div>
        );
    }

    const renderFormFields = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Title *</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none"
                    placeholder="Enter banner title"
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
                <label className="block text-sm font-medium text-[#374151] mb-1">Image *</label>
                <div className="flex items-center space-x-4">
                    <label className="flex-1">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSaving} />
                        <div
                            className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center ${
                                isSaving
                                    ? 'border-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed'
                                    : 'border-[#E2E8F0] hover:border-[#22C55E] text-[#6B7280]'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Image className="h-5 w-5" />
                                <span className="text-sm">
                                    {isUploading
                                        ? 'Uploading...'
                                        : uploadedImageUrl
                                          ? 'Image uploaded'
                                          : 'Click to upload image'}
                                </span>
                            </div>
                        </div>
                    </label>
                    {imagePreview && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[#22C55E]">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ConfirmModal
                isOpen={deleteTargetId !== null}
                message="Are you sure you want to delete this banner? This action cannot be undone."
                isPending={deleteMutation.isPending}
                onConfirm={() => {
                    if (deleteTargetId === null) return;
                    deleteMutation.mutate(deleteTargetId, {
                        onSuccess: () => {
                            setSelectedBanner(null);
                            setDeleteTargetId(null);
                        },
                        onError: () => setDeleteTargetId(null),
                    });
                }}
                onCancel={() => {
                    if (!deleteMutation.isPending) setDeleteTargetId(null);
                }}
            />
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#374151]">Banners</h2>
                <button
                    onClick={openAddModal}
                    className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Banner</span>
                </button>
            </div>

            {banners.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-12 text-center">
                    <Image className="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" />
                    <p className="text-[#6B7280]">No banners yet. Create your first banner to show it on the home page.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {banners.map((banner: BannerRow) => (
                        <div key={banner.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
                            <div className="aspect-video bg-gray-200 relative">
                                {banner.image_url ? (
                                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
                                        <Image className="h-12 w-12 text-[#E2E8F0]" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                                    <div className="text-white">
                                        <h3 className="font-semibold text-lg mb-1">{banner.title}</h3>
                                        {banner.subtitle && <p className="text-sm opacity-90">{banner.subtitle}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(banner.is_active)}`}>
                                            {banner.is_active === true || banner.is_active === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="text-xs text-[#6B7280]">Order: {banner.display_order}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedBanner(banner)}
                                            className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors"
                                            title="View banner"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(banner)}
                                            className="text-[#22C55E] hover:text-[#16A34A] p-1 transition-colors"
                                            title="Edit banner"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(banner.id)}
                                            disabled={deleteMutation.isPending}
                                            className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Delete banner"
                                        >
                                            {deleteMutation.isPending && deleteMutation.variables === banner.id ? (
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

            {selectedBanner && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBanner(null)}>
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-[#374151]">{selectedBanner.title}</h2>
                            <button onClick={() => setSelectedBanner(null)} className="text-[#6B7280] hover:text-[#374151] text-sm">
                                Close
                            </button>
                        </div>
                        {selectedBanner.image_url && (
                            <img src={selectedBanner.image_url} alt={selectedBanner.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                        )}
                        <div className="space-y-2">
                            <div>
                                <span className="text-xs text-[#6B7280] uppercase">Subtitle:</span>
                                <p className="text-[#374151]">{selectedBanner.subtitle || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-xs text-[#6B7280] uppercase">Status:</span>
                                <p>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedBanner.is_active)}`}>
                                        {selectedBanner.is_active === true || selectedBanner.is_active === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </p>
                            </div>
                            {selectedBanner.button_text && (
                                <div>
                                    <span className="text-xs text-[#6B7280] uppercase">CTA:</span>
                                    <p className="text-[#374151]">{selectedBanner.button_text}</p>
                                </div>
                            )}
                            {selectedBanner.button_link && (
                                <div>
                                    <span className="text-xs text-[#6B7280] uppercase">CTA Link:</span>
                                    <p className="text-[#374151]">{selectedBanner.button_link}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModals}>
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-[#374151]">Add Banner</h2>
                            <button onClick={closeModals} className="text-[#6B7280] hover:text-[#374151] text-sm">
                                Close
                            </button>
                        </div>
                        {renderFormFields()}
                        <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-[#E2E8F0]">
                            <button
                                onClick={closeModals}
                                disabled={isSaving}
                                className="px-4 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={!form.title || !uploadedImageUrl || isSaving}
                                className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {isSaving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                                <span>{isSaving ? 'Saving...' : 'Add Banner'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModals}>
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-[#374151]">Edit Banner</h2>
                            <button onClick={closeModals} className="text-[#6B7280] hover:text-[#374151] text-sm">
                                Close
                            </button>
                        </div>
                        {!editBanner && editBannerId ? (
                            <div className="p-6 text-center text-[#6B7280]">Loading banner data...</div>
                        ) : (
                            <>
                                {renderFormFields()}
                                <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-[#E2E8F0]">
                                    <button
                                        onClick={closeModals}
                                        disabled={isSaving}
                                        className="px-4 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={!form.title || !uploadedImageUrl || isSaving}
                                        className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                    >
                                        {isSaving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                                        <span>{isSaving ? 'Saving...' : 'Update Banner'}</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
