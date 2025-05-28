
import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/content';
import { Play, Info, Star, Calendar, Clock } from 'lucide-react';

interface FeaturedHeroProps {
  content: ContentItem[];
  onNavigate?: (section: string, contentId?: string) => void;
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ content, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentContent = content[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [content.length]);

  const handlePlay = () => {
    if (onNavigate) {
      onNavigate('watch', currentContent.id);
    } else {
      // Fallback
      if (currentContent.type === 'movie' && currentContent.url) {
        window.open(currentContent.url, '_blank');
      } else if (currentContent.type === 'tv' && currentContent.episodes && currentContent.episodes.length > 0) {
        window.open(currentContent.episodes[0], '_blank');
      }
    }
  };

  if (!currentContent) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-1000">
        <img 
          src={currentContent.imageUrl} 
          alt={currentContent.title}
          className="w-full h-full object-cover scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                {currentContent.type === 'movie' ? 'Featured Movie' : 'Featured Series'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {currentContent.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center gap-6 mb-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">8.5</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{currentContent.releaseDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{currentContent.duration}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex gap-2 mb-6">
              {currentContent.genre.slice(0, 3).map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/90 text-lg leading-relaxed mb-8 line-clamp-3">
              {currentContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handlePlay}
                className="group flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/30"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>Play Now</span>
              </button>
              
              <button 
                onClick={() => onNavigate?.('watch', currentContent.id)}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
              >
                <Info className="w-6 h-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-6 flex gap-2">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-12 bg-red-500' 
                : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;
