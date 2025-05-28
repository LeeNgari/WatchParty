
import React, { useState } from 'react';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import Home from './Home';
import Search from './Search';
import Explore from './Explore';
import Watch from './Watch';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string, contentId?: string) => {
    setCurrentSection(section);
    if (contentId && section === 'watch') {
      sessionStorage.setItem('currentContentId', contentId);
    }
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'search':
        return <Search />;
      case 'explore':
        return <Explore />;
      case 'watch':
        return <Watch />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />

      <main className="relative">
        {renderContent()}
      </main>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Index;
