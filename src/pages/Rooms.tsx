
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

  // Mock room data
  const publicRooms: Room[] = [
    {
      id: '1',
      name: 'Movie Night with Friends',
      host: 'Alice',
      currentContent: 'The Batman',
      participants: 4,
      maxParticipants: 8,
      isPrivate: false,
      currentTime: '1:23:45',
      thumbnail: ALL_CONTENT[0]?.imageUrl || '/placeholder.svg'
    },
    {
      id: '2', 
      name: 'Horror Marathon',
      host: 'Bob',
      currentContent: 'Stranger Things',
      participants: 6,
      maxParticipants: 10,
      isPrivate: false,
      currentTime: '0:45:12',
      thumbnail: ALL_CONTENT[1]?.imageUrl || '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Comedy Central',
      host: 'Charlie',
      currentContent: 'The Office',
      participants: 3,
      maxParticipants: 6,
      isPrivate: false,
      currentTime: '0:12:30',
      thumbnail: ALL_CONTENT[2]?.imageUrl || '/placeholder.svg'
    }
  ];

  const privateRooms: Room[] = [
    {
      id: '4',
      name: 'Family Movie Night',
      host: 'You',
      currentContent: 'Dune',
      participants: 2,
      maxParticipants: 5,
      isPrivate: true,
      currentTime: '2:15:08',
      thumbnail: ALL_CONTENT[3]?.imageUrl || '/placeholder.svg'
    }
  ];

  const handleJoinRoom = (roomId: string) => {
    if (onNavigate) {
      onNavigate('room', roomId);
    }
  };

  const handleCreateRoom = () => {
    // Mock room creation - in real app this would open a modal
    console.log('Creating new room...');
  };

  const currentRooms = activeTab === 'public' ? publicRooms : privateRooms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 px-6">
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

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRooms.map(room => (
            <div key={room.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-200 border border-gray-700/50">
              {/* Thumbnail */}
              <div className="relative h-48">
                <img 
                  src={room.thumbnail} 
                  alt={room.currentContent}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/40">
                  <button 
                    onClick={() => handleJoinRoom(room.id)}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </button>
                </div>

                {/* Room status */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{room.participants}/{room.maxParticipants}</span>
                  </div>
                </div>

                {/* Current time */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{room.currentTime}</span>
                  </div>
                </div>
              </div>

              {/* Room info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
                <p className="text-gray-300 mb-2">Currently watching: {room.currentContent}</p>
                <p className="text-gray-400 text-sm mb-4">Hosted by {room.host}</p>
                
                <button 
                  onClick={() => handleJoinRoom(room.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {currentRooms.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No {activeTab} rooms found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'public' 
                ? 'Be the first to create a public room!' 
                : 'Create your first private room to get started.'}
            </p>
            <button 
              onClick={handleCreateRoom}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Create Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
