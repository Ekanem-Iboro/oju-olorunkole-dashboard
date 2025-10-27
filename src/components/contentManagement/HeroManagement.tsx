// components/HeroManager.tsx
import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  status: string;
}

export function HeroManager() {
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'Welcome to Grace Fellowship',
      subtitle: 'Join us for Sunday service at 10:00 AM',
      image: 'https://images.pexels.com/photos/8468403/pexels-photo-8468403.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'published',
    },
    {
      id: 2,
      title: 'Youth Conference 2024',
      subtitle: 'Register now for our annual youth gathering',
      image: 'https://images.pexels.com/photos/8468529/pexels-photo-8468529.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'draft',
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#374151]">Hero Carousel</h2>
        <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-[#16A34A] flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {heroSlides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-lg mb-1">{slide.title}</h3>
                  <p className="text-sm opacity-90">{slide.subtitle}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(slide.status)}`}>
                  {slide.status.charAt(0).toUpperCase() + slide.status.slice(1)}
                </span>
                <div className="flex space-x-2">
                  <button className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-[#6B7280] hover:text-[#374151] p-1 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-[#EF4444] hover:text-[#DC2626] p-1 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}