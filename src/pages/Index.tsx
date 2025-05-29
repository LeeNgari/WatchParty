
import React, { useState } from 'react';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import Home from './Home';
import Search from './Search';
import Explore from './Explore';
import Watch from './Watch';
import Rooms from './Rooms';
import Room from './Room';
import Login from './Login';
import Register from './Register';
import ProfileSelection from './ProfileSelection';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('login');
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const handleNavigate = (section: string, contentId?: string) => {
    setCurrentSection(section);
    if (contentId && section === 'watch') {
      sessionStorage.setItem('currentContentId', contentId);
    }
    if (contentId && section === 'room') {
      setCurrentRoomId(contentId);
    }
    setSidebarOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentSection('profile-selection');
  };

  const handleProfileSelected = () => {
    setHasProfile(true);
    setCurrentSection('home');
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      switch (currentSection) {
        case 'register':
          return <Register onNavigate={() => setCurrentSection('login')} />;
        case 'login':
        default:
          return <Login onLogin={handleLogin} onNavigate={() => setCurrentSection('register')} />;
      }
    }

    if (!hasProfile) {
      return <ProfileSelection onProfileSelected={handleProfileSelected} />;
    }

    switch (currentSection) {
      case 'search':
        return <Search />;
      case 'explore':
        return <Explore />;
      case 'watch':
        return <Watch />;
      case 'rooms':
        return <Rooms onNavigate={handleNavigate} />;
      case 'room':
        return <Room roomId={currentRoomId} onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {isAuthenticated && hasProfile && (
        <CollapsibleSidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
          currentSection={currentSection}
        />
      )}

      <main className={`transition-all duration-300 ${isAuthenticated && hasProfile ? (sidebarOpen ? 'ml-64' : 'ml-16') : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
