
import React from 'react';
import { Home, Search, Compass, Video, Users, X, Menu } from 'lucide-react';

interface CollapsibleSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ 
  isOpen, 
  onToggle, 
  onNavigate, 
  currentSection 
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'rooms', label: 'Watch Together', icon: Users },
    { id: 'watch', label: 'My List', icon: Video },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-xl hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl font-light text-white tracking-tight">
            StreamFlix
          </h1>
          <p className="text-white/60 text-sm font-light mt-2">
            Premium streaming experience
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-4 rounded-xl font-light transition-all duration-300 text-left
                  ${isActive 
                    ? 'bg-white text-black' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <div>
              <p className="text-white font-light">Guest User</p>
              <p className="text-white/60 text-sm">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollapsibleSidebar;
