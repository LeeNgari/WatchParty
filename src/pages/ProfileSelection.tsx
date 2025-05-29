
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';

interface ProfileSelectionProps {
  onProfileSelected: () => void;
}

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onProfileSelected }) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    { id: '1', name: 'John', avatar: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { id: '2', name: 'Sarah', avatar: 'bg-gradient-to-br from-pink-500 to-red-600' },
    { id: '3', name: 'Kids', avatar: 'bg-gradient-to-br from-green-500 to-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Who's watching?</h1>
        <p className="text-gray-400 text-lg">Select your profile to continue</p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center mb-16 max-w-4xl">
        {profiles.map((profile) => (
          <div key={profile.id} className="text-center group">
            <button
              onClick={() => setSelectedProfile(profile.id)}
              className={`
                w-32 h-32 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                ${profile.avatar} 
                ${selectedProfile === profile.id 
                  ? 'ring-4 ring-red-500 scale-110 shadow-2xl shadow-red-500/25' 
                  : 'hover:scale-105 shadow-xl'
                }
              `}
            >
              <User className="w-16 h-16 text-white" />
            </button>
            <p className={`text-lg font-medium transition-colors ${
              selectedProfile === profile.id ? 'text-white' : 'text-gray-300'
            }`}>
              {profile.name}
            </p>
          </div>
        ))}

        {/* Add Profile Button */}
        <div className="text-center group">
          <button className="w-32 h-32 rounded-2xl border-2 border-gray-600 border-dashed flex items-center justify-center mb-4 transition-all duration-300 hover:border-gray-400 hover:scale-105">
            <Plus className="w-16 h-16 text-gray-500 group-hover:text-gray-300" />
          </button>
          <p className="text-gray-400 text-lg font-medium">Add Profile</p>
        </div>
      </div>

      <Button 
        onClick={onProfileSelected}
        disabled={!selectedProfile}
        className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-red-600/25"
      >
        Continue
      </Button>
    </div>
  );
};

export default ProfileSelection;
