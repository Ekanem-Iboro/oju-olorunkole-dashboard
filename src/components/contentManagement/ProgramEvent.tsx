// pages/program-event.tsx
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, ChevronDown, Loader } from 'lucide-react';
import { useGetPrograms } from '../../../api/query';
import { useDeleteProgram } from '../../../api/mutate';
import { AddProgramModal } from './AddProgramModal';
import { UpdateProgramModal } from './UpdateProgramModal';

export default function ProgramEventPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    const { data: programs, isLoading, refetch } = useGetPrograms();
    const {
        mutate: deleteProgram,
        isPending: isDeleting,
        variables: deletingProgramId,
    } = useDeleteProgram();

    const handleDeleteProgram = (programId: number) => {
        deleteProgram(programId); // Pass the ID directly here
    };


    const handleEditProgram = (programId: number) => {
        setSelectedProgramId(programId);
        setIsUpdateModalOpen(true);
    };



    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedProgramId(null);
        refetch();
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        refetch();
    };

    const getStatusColor = (status: string) => {
        const statusMap: { [key: string]: string } = {
            'active': 'bg-green-50 text-green-700 border-green-200',
            'draft': 'bg-yellow-50 text-yellow-700 border-yellow-200',
            'inactive': 'bg-gray-50 text-gray-700 border-gray-200',
        };
        return statusMap[status] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const getStatusDot = (status: string) => {
        const dotMap: { [key: string]: string } = {
            'active': 'bg-green-500',
            'draft': 'bg-yellow-500',
            'inactive': 'bg-gray-500',
        };
        return dotMap[status] || 'bg-gray-500';
    };

    const formatProgramType = (type: string) => {
        const typeMap: { [key: string]: string } = {
            'event': 'Event',
            'everysundayservice': 'Every Sunday',
            'everymondayservice': 'Every Monday',
            'everytuesdayservice': 'Every Tuesday',
            'everywednesdayservice': 'Every Wednesday',
            'everythursdayservice': 'Every Thursday',
            'thirdfridayofthemonthservice': '3rd Friday',
            'everysaturdayservice': 'Every Saturday',
            'other': 'Other'
        };
        return typeMap[type] || type;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const sortedPrograms = React.useMemo(() => {
        if (!programs) return [];

        const sorted = [...programs];
        switch (sortBy) {
            case 'oldest':
                sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        return sorted;
    }, [programs, sortBy]);

    return (
        <div className="p-6 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#374151]">Programs & Events</h1>
                    <p className="text-[#6B7280] mt-1">Manage your church programs and events</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#22C55E] text-white px-6 py-3 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors shadow-md hover:shadow-lg"
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add Program</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22C55E] mx-auto mb-4"></div>
                        <p className="text-[#6B7280]">Loading programs...</p>
                    </div>
                </div>
            ) : sortedPrograms && sortedPrograms.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Table Header with Sort */}
                    <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#374151]">Programs List</h2>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none cursor-pointer appearance-none pr-10 bg-white"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">By Title</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] pointer-events-none" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Day & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Categories</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E7EB]">
                                {sortedPrograms.map((program: any) => (
                                    <tr key={program.id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#374151]">
                                            <div className="flex items-start space-x-3">
                                                {program.image_url ? (
                                                    <img
                                                        src={program.image_url}
                                                        alt={program.title}
                                                        className="w-12 h-12 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded bg-[#E5E7EB] flex items-center justify-center">
                                                        <Calendar className="h-6 w-6 text-[#9CA3AF]" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-[#374151]">{program.title}</p>
                                                    <p className="text-xs text-[#6B7280] line-clamp-2">{program.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#E0F2FE] text-[#0369A1]">
                                                {formatProgramType(program.program_type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                                            {program.location || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                                            {program.dayandtime || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex flex-wrap gap-1">
                                                {program.categories?.split(',').slice(0, 2).map((cat: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-[#F3F4F6] text-[#6B7280] px-2 py-1 rounded"
                                                    >
                                                        {cat.trim()}
                                                    </span>
                                                ))}
                                                {program.categories?.split(',').length > 2 && (
                                                    <span className="text-xs text-[#6B7280] px-2 py-1">
                                                        +{program.categories.split(',').length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${getStatusDot(program.status)}`}></div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(program.status)}`}>
                                                    {program.status?.charAt(0).toUpperCase() + program.status?.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                                            {formatDate(program.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEditProgram(program.id)}
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                                                    title="Edit program"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProgram(program.id)}
                                                    disabled={isDeleting}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete program"
                                                >
                                                    {isDeleting && deletingProgramId === program.id ? (
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

                    {/* Table Footer */}
                    <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#6B7280]">
                        Showing {sortedPrograms.length} program{sortedPrograms.length !== 1 ? 's' : ''}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="bg-white rounded-lg p-8 border border-[#E2E8F0] shadow-sm max-w-md">
                            <div className="flex justify-center mb-4">
                                <div className="bg-[#F3F4F6] p-4 rounded-full">
                                    <Calendar className="h-8 w-8 text-[#6B7280]" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-[#374151] mb-2">No Programs Yet</h3>
                            <p className="text-[#6B7280] mb-6">Get started by creating your first program or event</p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#22C55E] text-white px-6 py-2 rounded-lg hover:bg-[#16A34A] flex items-center justify-center space-x-2 transition-colors w-full font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Create Program</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <AddProgramModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
            />

            <UpdateProgramModal
                isOpen={isUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                programId={selectedProgramId}
            />
        </div>
    );
}