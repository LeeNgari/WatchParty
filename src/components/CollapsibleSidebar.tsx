
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
    { id: 'explore', label: 'Movies & TV', icon: Compass },
    { id: 'rooms', label: 'Watch Together', icon: Users },
    { id: 'watch', label: 'My List', icon: Video },
  ];

  return (
    <>
      {/* Menu Button - Fixed position */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 w-10 h-10 bg-gray-900/90 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-gray-700/50"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out border-r border-gray-800/50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-8 pt-20">
          <h1 className="text-2xl font-bold text-white">
            WatchParty
          </h1>
          <p className="text-gray-400 text-sm mt-1">Stream together</p>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-2
                  ${isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
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
      </div>
    </>
  );
};

export default CollapsibleSidebar;
