
import React, { useState } from 'react';
import { Plus, Users, Video, ArrowRight } from 'lucide-react';
import { Room } from '@/types/room';

interface RoomsProps {
  onNavigate?: (section: string, roomId?: string) => void;
}

const Rooms: React.FC<RoomsProps> = ({ onNavigate }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleJoinRoom = (roomId: string) => {
    onNavigate?.('room', roomId);
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light text-white mb-4 tracking-tight">
            Watch Together
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl">
            Create a room and invite friends to watch movies and shows together with screen sharing.
          </p>
        </div>

        {/* Create Room Button */}
        <div className="mb-16">
          <button
            onClick={handleCreateRoom}
            className="group flex items-center gap-4 bg-white text-black px-8 py-6 rounded-2xl font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg">Create New Room</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Active Rooms */}
        <div className="space-y-8">
          <h2 className="text-3xl font-light text-white tracking-tight">
            Active Rooms
          </h2>
          
          {rooms.length === 0 ? (
            <div className="text-center py-16">
              <Video className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-light text-white/60 mb-4">
                No active rooms
              </h3>
              <p className="text-white/40 font-light">
                Create a room to start watching together with friends
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => handleJoinRoom(room.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium text-white group-hover:text-white/90">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {room.participants.length}/{room.maxParticipants}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {room.host.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">
                        Hosted by {room.host.name}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300 border border-white/20">
                    Join Room
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreateRoom={(room) => {
            setRooms([...rooms, room]);
            setShowCreateModal(false);
            handleJoinRoom(room.id);
          }}
        />
      )}
    </div>
  );
};

interface CreateRoomModalProps {
  onClose: () => void;
  onCreateRoom: (room: Room) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose, onCreateRoom }) => {
  const [roomName, setRoomName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(8);
  const [hostName, setHostName] = useState('');

  const handleCreate = () => {
    if (!roomName.trim() || !hostName.trim()) return;

    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name: roomName,
      host: {
        id: 'host-' + Math.random().toString(36).substr(2, 9),
        name: hostName,
        isHost: true,
        isScreenSharing: false,
      },
      participants: [],
      isActive: true,
      createdAt: new Date(),
      maxParticipants,
    };

    onCreateRoom(newRoom);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20">
        <h2 className="text-3xl font-light text-white mb-8 tracking-tight">
          Create Room
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-light mb-3">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Enter room name"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-light mb-3">
              Your Name
            </label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-light mb-3">
              Max Participants
            </label>
            <select
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
            >
              <option value={4} className="bg-gray-900">4 people</option>
              <option value={8} className="bg-gray-900">8 people</option>
              <option value={12} className="bg-gray-900">12 people</option>
              <option value={16} className="bg-gray-900">16 people</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300 border border-white/20"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!roomName.trim() || !hostName.trim()}
            className="flex-1 bg-white text-black py-3 rounded-xl font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
