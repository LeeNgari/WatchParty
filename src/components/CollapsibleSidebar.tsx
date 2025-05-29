
import React from 'react';
import { Home, Search, Compass, Video, Users } from 'lucide-react';

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
    { id: 'explore', label: 'Movies & TV', icon: Compass },
    { id: 'rooms', label: 'Watch Together', icon: Users },
    { id: 'watch', label: 'My List', icon: Video },
  ];

  return (
    <>
      {/* Black Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Always visible, either collapsed or expanded */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-xl z-50 transition-all duration-300 ease-out border-r border-gray-800/50
        ${isOpen ? 'w-64' : 'w-16'}
      `}>
        {/* Header */}
        <div className={`p-4 ${isOpen ? 'pt-8' : 'pt-6'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">W</span>
            </div>
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">WatchParty</h1>
                <p className="text-gray-400 text-xs">Stream together</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 mt-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-4 px-3 py-3 rounded-lg text-left transition-all duration-200 mb-2 group relative
                  ${isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }
                `}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-60">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute top-6 right-4 w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200"
        >
          <div className="flex flex-col gap-1">
            <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <div className={`w-3 h-0.5 bg-white transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-3 h-0.5 bg-white transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>

        {/* Footer - Only show when expanded */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">U</span>
              </div>
              <div>
                <p className="text-white font-medium">User</p>
                <p className="text-gray-400 text-sm">Premium</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollapsibleSidebar;
