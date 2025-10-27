// components/AddProgramModal.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Image } from 'lucide-react';
import { useUploadImage, useAddProgram } from '../../../api/mutate';

interface EventFormData {
  title: string;
  description: string;
  categories: string;
  program_type: string;
  status: string;
  image?: FileList;
}

interface AddProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProgramModal({ isOpen, onClose }: AddProgramModalProps) {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const { mutate: addProgram, isPending: isAdding } = useAddProgram();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  
  const isLoading = isAdding || isUploading;

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    watch,
    formState: { errors } 
  } = useForm<EventFormData>({
    defaultValues: {
      status: 'active',
      program_type: 'event'
    }
  });

  const status = watch('status');
  const programType = watch('program_type');

  const formatProgramType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'event': 'Event',
      'everysundayservice': 'Every Sunday Service',
      'everymondayservice': 'Every Monday Service',
      'everytuesdayservice': 'Every Tuesday Service',
      'everywednesdayservice': 'Every Wednesday Service',
      'everythursdayservice': 'Every Thursday Service',
      'thirdfridayofthemonthservice': 'Third Friday of the Month Service',
      'everysaturdayservice': 'Every Saturday Service',
      'other': 'Other'
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      const fileList = {
        0: file,
        length: 1,
        item: (index: number) => index === 0 ? file : null
      } as any;
      
      setValue('image', fileList);

      // Upload image immediately
      uploadImage(file, {
        onSuccess: (response) => {
          setUploadedImageUrl(response.image_url);
        },
        onError: (error) => {
          console.error('Error uploading image:', error);
          setUploadedImageUrl('');
          setImagePreview('');
        }
      });
    } else {
      setImagePreview('');
      setUploadedImageUrl('');
      setValue('image', undefined as any);
    }
  };

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      if (!uploadedImageUrl) {
        console.error('No image uploaded');
        return;
      }

      // Create program data with uploaded image URL
      const programData = {
        title: data.title,
        description: data.description,
        categories: data.categories,
        program_type: data.program_type,
        status: data.status,
        image_url: uploadedImageUrl
      };

      await addProgram(programData);

      // Reset and close
      reset();
      setImagePreview('');
      setUploadedImageUrl('');
      onClose();
      
    } catch (error) {
      console.error('Error creating program:', error);
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
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <h3 className="text-xl font-semibold text-[#374151]">
            Add New Program
          </h3>
          <button 
            onClick={handleClose}
            disabled={isLoading}
            className="text-[#6B7280] hover:text-[#374151] transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Title <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
              placeholder="Enter program title"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Description <span className="text-[#EF4444]">*</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Enter program description"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Program Type <span className="text-[#EF4444]">*</span>
              </label>
              <select
                {...register('program_type', { required: 'Program type is required' })}
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              >
                <option value="event">Event</option>
                <option value="everysundayservice">Every Sunday Service</option>
                <option value="everymondayservice">Every Monday Service</option>
                <option value="everytuesdayservice">Every Tuesday Service</option>
                <option value="everywednesdayservice">Every Wednesday Service</option>
                <option value="everythursdayservice">Every Thursday Service</option>
                <option value="thirdfridayofthemonthservice">Third Friday of the Month Service</option>
                <option value="everysaturdayservice">Every Saturday Service</option>
                <option value="other">Other</option>
              </select>
              {errors.program_type && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.program_type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Categories <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              {...register('categories', { required: 'Categories are required' })}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#22C55E] focus:border-transparent outline-none transition-all"
              placeholder="e.g., Worship, Youth, Bible Study"
              disabled={isLoading}
            />
            {errors.categories && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.categories.message}</p>
            )}
            <p className="text-[#6B7280] text-xs mt-1">Separate multiple categories with commas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] p-3 rounded-lg">
              <div className="text-sm font-medium text-[#374151] mb-1">Current Status</div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                status === 'active' ? 'bg-[#22C55E] text-white' : 
                status === 'draft' ? 'bg-[#F59E0B] text-white' : 
                'bg-[#6B7280] text-white'
              }`}>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
              </div>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg">
              <div className="text-sm font-medium text-[#374151] mb-1">Program Type</div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                programType === 'event' ? 'bg-[#3B82F6] text-white' :
                programType === 'everysundayservice' ? 'bg-[#8B5CF6] text-white' :
                programType === 'everymondayservice' ? 'bg-[#EC4899] text-white' :
                programType === 'everytuesdayservice' ? 'bg-[#10B981] text-white' :
                programType === 'everywednesdayservice' ? 'bg-[#F59E0B] text-white' :
                programType === 'everythursdayservice' ? 'bg-[#EF4444] text-white' :
                programType === 'thirdfridayofthemonthservice' ? 'bg-[#6B7280] text-white' :
                programType === 'everysaturdayservice' ? 'bg-[#8B5CF6] text-white' :
                'bg-[#6B7280] text-white'
              }`}>
                {formatProgramType(programType)}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Upload Image <span className="text-[#EF4444]">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <div className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center ${
                  isLoading 
                    ? 'border-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed' 
                    : 'border-[#E2E8F0] hover:border-[#22C55E] text-[#6B7280]'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    <Image className="h-5 w-5" />
                    <span className="text-sm">
                      {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Image uploaded' : 'Click to upload image'}
                    </span>
                  </div>
                </div>
              </label>
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[#22C55E]">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.image.message}</p>
            )}
            <p className="text-[#6B7280] text-xs mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
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
              disabled={isLoading || !uploadedImageUrl}
              className="px-6 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAdding && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{isAdding ? 'Creating...' : 'Create Program'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}