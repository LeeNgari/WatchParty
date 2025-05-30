
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Users, ScreenShare, Monitor, Settings } from 'lucide-react';
import { User, ScreenShareState } from '@/types/room';

interface RoomProps {
  roomId?: string;
  onNavigate?: (section: string) => void;
}

const Room: React.FC<RoomProps> = ({ roomId, onNavigate }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<User[]>([
    {
      id: 'host-1',
      name: 'You',
      isHost: true,
      isScreenSharing: false,
    },
  ]);
  const [screenShareState, setScreenShareState] = useState<ScreenShareState>({
    isSharing: false,
    hostId: null,
    stream: null,
  });

  const screenShareRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const handleStartScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }

      setIsScreenSharing(true);
      setScreenShareState({
        isSharing: true,
        hostId: 'host-1',
        stream,
      });

      // Handle when screen sharing stops
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        handleStopScreenShare();
      });

    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const handleStopScreenShare = () => {
    if (screenShareState.stream) {
      screenShareState.stream.getTracks().forEach(track => track.stop());
    }

    setIsScreenSharing(false);
    setScreenShareState({
      isSharing: false,
      hostId: null,
      stream: null,
    });

    if (screenShareRef.current) {
      screenShareRef.current.srcObject = null;
    }
  };

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      handleStopScreenShare();
    } else {
      handleStartScreenShare();
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (screenShareState.stream) {
        screenShareState.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('rooms')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light">Leave Room</span>
          </button>
          <div className="h-6 w-px bg-white/20"></div>
          <h1 className="text-xl font-light text-white">
            Room #{roomId || 'unknown'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/60">
            <Users className="w-5 h-5" />
            <span className="font-light">{participants.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          {screenShareState.isSharing ? (
            <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden">
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Screen Sharing Active
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl">
              <div className="text-center">
                <Monitor className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-2xl font-light text-white/60 mb-2">
                  No screen sharing active
                </h3>
                <p className="text-white/40 font-light">
                  Start sharing your screen to watch together
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Participants */}
        <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-6">
          <h2 className="text-xl font-light text-white mb-6">
            Participants ({participants.length})
          </h2>

          <div className="space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {participant.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-light">
                      {participant.name}
                    </span>
                    {participant.isHost && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                  {participant.isScreenSharing && (
                    <span className="text-xs text-green-400">
                      Sharing screen
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Room Link */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-white font-light mb-2">Invite Others</h3>
            <div className="flex gap-2">
              <input
                readOnly
                value={`${window.location.origin}/room/${roomId}`}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white/80 text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`)}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-6 bg-black/50 backdrop-blur-xl border-t border-white/10">
        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isVideoOn 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsAudioOn(!isAudioOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAudioOn 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            isScreenSharing
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <ScreenShare className="w-5 h-5" />
          <span>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
        </button>

        <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Room;
