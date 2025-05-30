
import React, { useState } from 'react';
import { Users, Plus, Play, Clock, Globe, Lock } from 'lucide-react';
import { ALL_CONTENT } from '@/data/content';

interface Room {
  id: string;
  name: string;
  host: string;
  currentContent: string;
  participants: number;
  maxParticipants: number;
  isPrivate: boolean;
  currentTime: string;
  thumbnail: string;
}

interface RoomsProps {
  onNavigate?: (section: string, roomId?: string) => void;
}

const Rooms: React.FC<RoomsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');

  

  const handleJoinRoom = (roomId: string) => {
    if (onNavigate) {
      onNavigate('room', roomId);
    }
  };

  const handleCreateRoom = () => {
    // Mock room creation - in real app this would open a modal
    console.log('Creating new room...');
  };


  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Watch Together</h1>
          <p className="text-gray-300 text-lg mb-8">Join friends and watch movies or TV shows together in real-time</p>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'public'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Public Rooms
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'private'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Lock className="w-5 h-5 inline mr-2" />
              My Rooms
            </button>
            <button
              onClick={handleCreateRoom}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 ml-auto"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Create Room
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rooms;
