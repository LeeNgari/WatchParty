
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, currentSection }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'tv-shows', label: 'TV Shows', icon: '📺' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'explore', label: 'Explore', icon: '🌟' },
    { id: 'my-list', label: 'My List', icon: '📋' },
    { id: 'recently-watched', label: 'Recently Watched', icon: '⏰' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h2 className="text-xl font-bold text-white">StreamFlix</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left",
                    currentSection === item.id
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">John Doe</p>
              <p className="text-white/60 text-xs">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
