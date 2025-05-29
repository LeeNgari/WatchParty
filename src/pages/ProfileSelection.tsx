
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';

interface ProfileSelectionProps {
  onProfileSelected: () => void;
}

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onProfileSelected }) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    { id: '1', name: 'User 1', avatar: 'bg-red-600' },
    { id: '2', name: 'User 2', avatar: 'bg-blue-600' },
    { id: '3', name: 'Kids', avatar: 'bg-green-600' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Who's watching?</h1>
        <p className="text-gray-400 text-lg">Select your profile to continue</p>
      </div>

      <div className="flex gap-8 mb-12">
        {profiles.map((profile) => (
          <div key={profile.id} className="text-center">
            <button
              onClick={() => setSelectedProfile(profile.id)}
              className={`
                w-32 h-32 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200
                ${profile.avatar} 
                ${selectedProfile === profile.id ? 'ring-4 ring-white scale-105' : 'hover:scale-105'}
              `}
            >
              <User className="w-16 h-16 text-white" />
            </button>
            <p className="text-white text-lg font-medium">{profile.name}</p>
          </div>
        ))}

        {/* Add Profile Button */}
        <div className="text-center">
          <button className="w-32 h-32 rounded-lg border-2 border-gray-600 flex items-center justify-center mb-4 transition-all duration-200 hover:border-white hover:scale-105">
            <Plus className="w-16 h-16 text-gray-600" />
          </button>
          <p className="text-gray-400 text-lg font-medium">Add Profile</p>
        </div>
      </div>

      <Button 
        onClick={onProfileSelected}
        disabled={!selectedProfile}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </Button>
    </div>
  );
};

export default ProfileSelection;
