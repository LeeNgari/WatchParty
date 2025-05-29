
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
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-black/80 hover:bg-black/90 rounded-sm flex items-center justify-center transition-all duration-200"
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
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-red-600">
            WatchParty
          </h1>
        </div>

        {/* Navigation */}
        <nav className="pt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-6 py-3 text-left transition-colors duration-200
                  ${isActive 
                    ? 'bg-gray-900 text-white border-r-2 border-red-600' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">User</p>
              <p className="text-gray-400 text-xs">Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollapsibleSidebar;
