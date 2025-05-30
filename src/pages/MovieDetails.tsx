
import React, { useState, useEffect } from 'react';
import { ALL_CONTENT } from '@/data/content';
import { ContentItem } from '@/types/content';
import { ArrowLeft, Play, Star, Calendar, Clock, Film, Tv, Plus, Heart } from 'lucide-react';

interface MovieDetailsProps {
  contentId?: string;
  onNavigate?: (section: string, contentId?: string) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ contentId, onNavigate }) => {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (contentId) {
      const item = ALL_CONTENT.find(c => c.id === contentId);
      setContent(item || null);
    }
  }, [contentId]);

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Content not found</h2>
          <button 
            onClick={() => onNavigate?.('home')}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleWatch = () => {
    onNavigate?.('watch', content.id);
  };

  const handleToggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-transparent to-transparent"></div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {content.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-6 text-white/80 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">8.5</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{content.releaseDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{content.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                {content.type === 'movie' ? <Film className="w-5 h-5" /> : <Tv className="w-5 h-5" />}
                <span className="capitalize">{content.type}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={handleWatch}
                className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/30"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>Watch Now</span>
              </button>
              
              <button 
                onClick={handleToggleWatchlist}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isInWatchlist 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <button 
                onClick={handleToggleLike}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isLiked 
                    ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Episodes Section (for TV Shows) */}
              {content.type === 'tv' && content.episodes && content.episodes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
                  <div className="space-y-4">
                    {content.episodes.map((episode, index) => (
                      <div 
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-2">
                              Episode {index + 1}
                            </h3>
                            <p className="text-gray-400">
                              {content.duration} • Available now
                            </p>
                          </div>
                          <button 
                            onClick={() => window.open(episode, '_blank')}
                            className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110"
                          >
                            <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Genres */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {content.genre.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-300 text-sm rounded-lg"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white capitalize">{content.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <span className="text-white">{content.releaseDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{content.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="text-white">8.5/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
