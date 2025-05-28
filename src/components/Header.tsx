
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, currentSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'explore', label: 'Explore' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Menu Button */}
          <button 
            onClick={onMenuClick}
            className="w-10 h-10 flex flex-col justify-center items-center space-y-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-white">StreamFlix</h1>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  currentSection === item.id
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Icon (Mobile) */}
          <button 
            onClick={() => onNavigate('search')}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            🔍
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <div className="text-right">
                <p className="text-white text-sm font-medium">John Doe</p>
                <p className="text-white/60 text-xs">Premium</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
