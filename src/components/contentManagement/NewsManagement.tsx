import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Newspaper, ChevronDown, Star, Loader } from 'lucide-react';
import { useGetNews } from '../../../api/query';
import { useDeleteNews } from '../../../api/mutate';
import { AddNewsModal } from './AddNewsModal';
import { UpdateNewsModal } from './UpdateNewsModal';

interface NewsRow {
    id: number;
    title: string;
    excerpt?: string | null;
    image_url?: string | null;
    category?: string | null;
    author?: string | null;
    status?: string;
    is_featured?: boolean | number;
    created_at: string;
}

export default function NewsManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    const { data: newsData, isLoading, refetch } = useGetNews();
    const {
        mutate: deleteNews,
        isPending: isDeleting,
        variables: deletingNewsId,
    } = useDeleteNews();

    const handleDeleteNews = (id: number) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            deleteNews(id);
        }
    };

    const handleEditNews = (id: number) => {
        setSelectedNewsId(id);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedNewsId(null);
        refetch();
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        refetch();
    };

    const getStatusColor = (status?: string) => {
        const statusMap: { [key: string]: string } = {
            published: 'bg-green-50 text-green-700 border-green-200',
            draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        };
        return (status && statusMap[status]) || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const getStatusDot = (status?: string) => {
        const dotMap: { [key: string]: string } = {
            published: 'bg-green-500',
            draft: 'bg-yellow-500',
        };
        return (status && dotMap[status]) || 'bg-gray-500';
    };

    const formatDate = (date: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const sortedNews = React.useMemo(() => {
        const news: NewsRow[] = Array.isArray(newsData) ? newsData : newsData?.news || [];

        const sorted = [...news];
        switch (sortBy) {
            case 'oldest':
                sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                break;
            case 'title':
                sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        return sorted;
    }, [newsData, sortBy]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#374151]">News</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add News</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22C55E] mx-auto mb-4"></div>
                        <p className="text-[#6B7280]">Loading news...</p>
                    </div>
                </div>
            ) : sortedNews && sortedNews.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#374151]">News List</h2>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none cursor-pointer appearance-none pr-10 bg-white"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">By Title</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] pointer-events-none" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Author</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E7EB]">
                                {sortedNews.map((item: NewsRow) => (
                                    <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#374151]">
                                            <div className="flex items-start space-x-3">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.title} className="w-12 h-12 rounded object-cover" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded bg-[#E5E7EB] flex items-center justify-center">
                                                        <Newspaper className="h-6 w-6 text-[#9CA3AF]" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <p className="font-medium text-[#374151]">{item.title}</p>
                                                        {(item.is_featured === true || item.is_featured === 1) && (
                                                            <Star className="h-4 w-4 text-[#F59E0B] fill-current" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-[#6B7280] line-clamp-2">{item.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                                            {item.category ? (
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#E0F2FE] text-[#0369A1]">
                                                    {item.category}
                                                </span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">{item.author || '-'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${getStatusDot(item.status)}`}></div>
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(item.status)}`}
                                                >
                                                    {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">{formatDate(item.created_at)}</td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEditNews(item.id)}
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                                                    title="Edit news"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteNews(item.id)}
                                                    disabled={isDeleting}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete news"
                                                >
                                                    {isDeleting && deletingNewsId === item.id ? (
                                                        <Loader className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#6B7280]">
                        Showing {sortedNews.length} article{sortedNews.length !== 1 ? 's' : ''}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="bg-white rounded-lg p-8 border border-[#E2E8F0] shadow-sm max-w-md">
                            <div className="flex justify-center mb-4">
                                <div className="bg-[#F3F4F6] p-4 rounded-full">
                                    <Newspaper className="h-8 w-8 text-[#6B7280]" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-[#374151] mb-2">No News Yet</h3>
                            <p className="text-[#6B7280] mb-6">Get started by publishing your first news article</p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#22C55E] text-white px-6 py-2 rounded-lg hover:bg-[#16A34A] flex items-center justify-center space-x-2 transition-colors w-full font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Create News</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AddNewsModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />

            <UpdateNewsModal isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} newsId={selectedNewsId} />
        </div>
    );
}
