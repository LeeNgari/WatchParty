import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';

interface ProfileSelectionProps {
  onProfileSelected: () => void;
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop', // Cinema seats
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop', // Movie theater
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop', // Star Wars scene
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1920&h=1080&fit=crop', // Movie reel
];

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onProfileSelected }) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
        setTransitioning(false);
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  const profiles = [
    { id: '1', name: 'John', avatar: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: '2', name: 'Sarah', avatar: 'bg-gradient-to-br from-pink-500 to-red-600' },
    { id: '3', name: 'Kids', avatar: 'bg-gradient-to-br from-green-500 to-emerald-600' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {/* Current Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${transitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%), url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'opacity 2s ease-in-out',
          }}
        />
        
        {/* Next Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${transitioning ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%), url(${backgroundImages[nextImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'opacity 2s ease-in-out',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Who's watching?</h1>
          <p className="text-gray-300 text-xl">Select your profile to continue</p>
        </div>

        <div className="flex flex-wrap gap-12 justify-center mb-16">
          {profiles.map((profile) => (
            <div key={profile.id} className="text-center group cursor-pointer">
              <button
                onClick={() => setSelectedProfile(profile.id)}
                className={`
                  w-40 h-40 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                  ${profile.avatar} 
                  ${selectedProfile === profile.id 
                    ? 'ring-4 ring-red-500 scale-110 shadow-2xl shadow-red-500/30 transform-gpu' 
                    : 'hover:scale-105 hover:shadow-xl hover:shadow-current/20 transform-gpu'
                  }
                `}
              >
                <User className="w-20 h-20 text-white/90" strokeWidth={1.5} />
              </button>
              <p className={`text-xl font-medium transition-all duration-300 ${
                selectedProfile === profile.id 
                  ? 'text-white scale-105' 
                  : 'text-gray-300 group-hover:text-white'
              }`}>
                {profile.name}
              </p>
            </div>
          ))}

          {/* Add Profile Button */}
          <div className="text-center group cursor-pointer">
            <button 
              className="w-40 h-40 rounded-2xl border-2 border-gray-600 border-dashed flex items-center justify-center mb-4 
              transition-all duration-300 hover:border-gray-300 hover:scale-105 transform-gpu
              bg-gradient-to-br from-gray-900/50 to-gray-800/30"
            >
              <Plus className="w-20 h-20 text-gray-400 group-hover:text-gray-200 transition-colors" strokeWidth={1.5} />
            </button>
            <p className="text-gray-400 text-xl font-medium group-hover:text-gray-200 transition-colors">
              Add Profile
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onProfileSelected}
            disabled={!selectedProfile}
            className={`bg-red-600 hover:bg-red-700 text-white px-16 py-6 text-xl font-semibold rounded-lg 
            transition-all duration-300 shadow-lg ${selectedProfile ? 'shadow-red-600/30 hover:shadow-red-600/40' : 'shadow-transparent'}
            transform-gpu hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;