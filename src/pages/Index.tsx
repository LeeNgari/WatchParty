import React, { useState } from 'react';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import Home from './Home';
import Search from './Search';
import Explore from './Explore';
import Watch from './Watch';
import MovieDetails from './MovieDetails';
import Rooms from './Rooms';
import Room from './Room';
import Login from './Login';
import Register from './Register';
import ProfileSelection from './ProfileSelection';
import Admin from './Admin';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('login');
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>();
  const [currentContentId, setCurrentContentId] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const handleNavigate = (section: string, contentId?: string) => {
    setCurrentSection(section);
    if (contentId && (section === 'watch' || section === 'details')) {
      setCurrentContentId(contentId);
    }
    if (contentId && section === 'room') {
      setCurrentRoomId(contentId);
    }
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
        return <Watch contentId={currentContentId} onNavigate={handleNavigate} />;
      case 'details':
        return <MovieDetails contentId={currentContentId} onNavigate={handleNavigate} />;
      case 'rooms':
        return <Rooms onNavigate={handleNavigate} />;
      case 'room':
        return <Room roomId={currentRoomId} onNavigate={handleNavigate} />;
      case 'admin':
        return <Admin />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Persistent collapsed sidebar */}
      {isAuthenticated && hasProfile && (
        <div className="h-full w-16 fixed z-20">
          <CollapsibleSidebar 
            isOpen={false}
            onToggle={() => {}} // Disabled toggle
            onNavigate={handleNavigate}
            currentSection={currentSection}
          />
        </div>
      )}

      {/* Main content with consistent spacing */}
      <main className={`flex-1 min-h-screen ${isAuthenticated && hasProfile ? 'ml-16' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;