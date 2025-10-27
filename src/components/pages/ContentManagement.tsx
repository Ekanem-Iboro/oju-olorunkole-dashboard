// components/ContentManagement.tsx
import React, { useState } from 'react';
import { Image, Calendar, FileText } from 'lucide-react';
import { HeroManager } from '../../components/contentManagement/HeroManagement';
import ProgramEventPage from '../contentManagement/ProgramEvent';
// import { PagesManager } from './PagesManager';


export function ContentManagement() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const sections = [
    { id: 'hero', label: 'Hero Carousel', icon: Image },
    { id: 'events', label: 'Events & Programs', icon: Calendar },
    { id: 'pages', label: 'Pages', icon: FileText },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroManager />;
      case 'events':
        return <ProgramEventPage />;
      // case 'pages':
      //   return <PagesManager />;
      default:
        return <HeroManager />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Content Management</h1>
        <p className="text-[#6B7280]">Manage your website content, events, and media.</p>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-1">
        <div className="flex space-x-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === section.id
                  ? 'bg-[#22C55E] text-white'
                  : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F8FAFC]'
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderActiveSection()}
    </div>
  );
}