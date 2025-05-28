
import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, Search, User, Home, Compass, Film, Tv, Clock, Bookmark, X } from 'lucide-react';

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
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv-shows', label: 'TV Shows', icon: Tv },
    { id: 'recently-watched', label: 'Continue Watching', icon: Clock },
    { id: 'my-list', label: 'My List', icon: Bookmark }
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <button 
        onClick={onToggle}
        className="fixed top-8 left-8 z-50 group w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
      >
        <Menu className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      </button>

      {/* Profile Button */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-white font-medium text-sm tracking-wide">John Doe</p>
          <p className="text-white/40 text-xs font-light">Premium</p>
        </div>
        <div className="relative group cursor-pointer">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all duration-300">
            <User className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />
      
      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full w-80 z-50 transform transition-all duration-500 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Clean background */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl border-r border-white/5"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <h2 className="text-xl font-light tracking-wide text-white">
                StreamFlix
              </h2>
            </div>
            <button 
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                        currentSection === item.id
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        currentSection === item.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )} />
                      <span className="font-light tracking-wide">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Profile Section */}
          <div className="p-6 border-t border-white/5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium tracking-wide">John Doe</p>
                <p className="text-white/40 text-sm font-light">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollapsibleSidebar;
