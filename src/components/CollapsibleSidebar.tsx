
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
    { id: 'recently-watched', label: 'Recently Watched', icon: Clock },
    { id: 'my-list', label: 'My List', icon: Bookmark }
  ];

  return (
    <>
      {/* Menu Toggle Button - Fixed Position */}
      <button 
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 group w-12 h-12 flex items-center justify-center rounded-2xl bg-black/20 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
      >
        <Menu className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
      </button>

      {/* Profile Button - Fixed Position */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-white font-medium text-sm">John Doe</p>
          <p className="text-white/60 text-xs">Premium</p>
        </div>
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />
      
      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full w-96 z-50 transform transition-all duration-500 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/25">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl blur opacity-20"></div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                StreamFlix
              </h2>
            </div>
            <button 
              onClick={onToggle}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        "w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 text-left group",
                        currentSection === item.id
                          ? "bg-gradient-to-r from-red-500/20 to-purple-500/20 text-white border border-red-500/30 shadow-lg shadow-red-500/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn(
                        "w-6 h-6 transition-colors duration-300",
                        currentSection === item.id ? "text-red-400" : "text-white/60 group-hover:text-white/80"
                      )} />
                      <span className="font-medium text-lg">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Profile Section */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-semibold text-lg">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-lg">John Doe</p>
                <p className="text-white/60 text-sm">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollapsibleSidebar;
