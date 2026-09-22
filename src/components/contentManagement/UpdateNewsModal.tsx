import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Image } from 'lucide-react';
import { useUpdateNews, useUploadImage } from '../../../api/mutate';
import { useGetNewsItem } from '../../../api/query';

interface NewsFormData {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    status: string;
    is_featured: boolean;
}

interface NewsPayload {
    title: string;
    excerpt?: string;
    content: string;
    category?: string;
    author?: string;
    status: string;
    is_featured: boolean;
    image_url?: string | null;
    published_at?: string;
}

interface UpdateNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsId: number | null;
}

export function UpdateNewsModal({ isOpen, onClose, newsId }: UpdateNewsModalProps) {
    const [imagePreview, setImagePreview] = useState<string>('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const { data: newsItem, isLoading: isLoadingNews } = useGetNewsItem(newsId ?? 0);
    const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
    const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

    const isLoading = isLoadingNews || isUpdating || isUploading;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<NewsFormData>({
        defaultValues: {
            status: 'draft',
            is_featured: false,
        },
    });

    const status = watch('status', 'draft');

    useEffect(() => {
        if (newsItem) {
            setValue('title', newsItem.title || '');
            setValue('excerpt', newsItem.excerpt || '');
            setValue('content', newsItem.content || '');
            setValue('category', newsItem.category || '');
            setValue('author', newsItem.author || '');
            setValue('status', newsItem.status || 'draft');
            setValue('is_featured', newsItem.is_featured === true || newsItem.is_featured === 1);
            setImagePreview(newsItem.image_url || '');
            setUploadedImageUrl(newsItem.image_url || '');
        }
    }, [newsItem, setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);

            uploadImage(file, {
                onSuccess: (response) => setUploadedImageUrl(response.image_url),
                onError: (error) => {
                    console.error('Error uploading image:', error);
                    setUploadedImageUrl(newsItem?.image_url || '');
                    setImagePreview('');
                },
            });
        } else {
            setImagePreview(newsItem?.image_url || '');
            setUploadedImageUrl(newsItem?.image_url || '');
        }
    };

    const handleFormSubmit = async (data: NewsFormData) => {
        if (!newsId) return;

        try {
            const payload: NewsPayload = {
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                author: data.author,
                status: data.status,
                is_featured: data.is_featured,
                image_url: uploadedImageUrl || newsItem?.image_url || null,
            };

            if (data.status === 'published' && !newsItem?.published_at) {
                payload.published_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
            }

            updateNews(
                { id: newsId, data: payload },
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                    },
                    onError: (error) => {
                        console.error('Error updating news:', error);
                    },
                }
            );
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const handleClose = () => {
        reset();
        setImagePreview('');
        setUploadedImageUrl('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
                    <h3 className="text-xl font-semibold text-[#374151]">Edit News Article</h3>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-[#6B7280] hover:text-[#374151] transition-colors disabled:opacity-50"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {isLoadingNews ? (
                    <div className="p-6 text-center text-[#6B7280]">Loading news data...</div>
                ) : (
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Title <span className="text-[#EF4444]">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                                placeholder="Enter news title"
                                disabled={isLoading}
                            />
                            {errors.title && <p className="text-[#EF4444] text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">Excerpt</label>
                            <textarea
                                {...register('excerpt')}
                                rows={2}
                                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Short summary shown on the news list"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Content <span className="text-[#EF4444]">*</span>
                            </label>
                            <textarea
                                {...register('content', { required: 'Content is required' })}
                                rows={8}
                                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Write the full news article..."
                                disabled={isLoading}
                            />
                            {errors.content && <p className="text-[#EF4444] text-sm mt-1">{errors.content.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">Category</label>
                                <input
                                    type="text"
                                    {...register('category')}
                                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Announcement, Event"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">Author</label>
                                <input
                                    type="text"
                                    {...register('author')}
                                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                                    placeholder="Author name"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">Status</label>
                                <select
                                    {...register('status')}
                                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                                    disabled={isLoading}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('is_featured')}
                                        className="rounded border-[#E2E8F0] text-[#22C55E] focus:ring-[#22C55E]"
                                        disabled={isLoading}
                                    />
                                    <span className="text-sm font-medium text-[#374151]">Featured article</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-[#F8FAFC] p-3 rounded-lg">
                            <div className="text-sm font-medium text-[#374151] mb-1">Current Status</div>
                            <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    status === 'published' ? 'bg-[#22C55E] text-white' : 'bg-[#F59E0B] text-white'
                                }`}
                            >
                                {status?.charAt(0).toUpperCase() + status?.slice(1)}
                            </span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">Cover Image</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex-1">
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isLoading} />
                                    <div
                                        className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center ${
                                            isLoading
                                                ? 'border-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed'
                                                : 'border-[#E2E8F0] hover:border-[#22C55E] text-[#6B7280]'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <Image className="h-5 w-5" />
                                            <span className="text-sm">
                                                {isUploading
                                                    ? 'Uploading...'
                                                    : uploadedImageUrl && uploadedImageUrl !== newsItem?.image_url
                                                      ? 'Image updated'
                                                      : 'Click to upload new image'}
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

                        <div className="flex justify-end space-x-3 pt-4 border-t border-[#E2E8F0]">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="px-6 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {isUpdating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                                <span>{isUpdating ? 'Updating...' : 'Update News'}</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
