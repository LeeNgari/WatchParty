
import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/content';
import { cn } from '@/lib/utils';

interface FeaturedHeroProps {
  content: ContentItem[];
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentContent = content[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [content.length]);

  const handlePlayClick = () => {
    if (currentContent.url) {
      window.open(currentContent.url, '_blank');
    } else if (currentContent.episodes && currentContent.episodes.length > 0) {
      window.open(currentContent.episodes[0], '_blank');
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!currentContent) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={currentContent.imageUrl}
          alt={currentContent.title}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
            setIsLoading(false);
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:mx-0 lg:ml-16">
          <div className="space-y-6">
            {/* Content Type Badge */}
            <div className="flex items-center gap-3">
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold",
                currentContent.type === 'movie' 
                  ? "bg-red-500 text-white" 
                  : "bg-blue-500 text-white"
              )}>
                {currentContent.type === 'movie' ? 'Movie' : 'TV Series'}
              </span>
              <span className="text-white/60 text-sm">Featured</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              {currentContent.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-white/80">
              <span className="text-green-400 font-semibold">98% Match</span>
              <span>{currentContent.releaseDate}</span>
              <span>{currentContent.duration}</span>
              <div className="flex gap-2">
                {currentContent.genre.slice(0, 3).map((genre, index) => (
                  <span key={index} className="text-sm">
                    {genre}{index < 2 && index < currentContent.genre.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/90 text-lg leading-relaxed max-w-xl line-clamp-3">
              {currentContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handlePlayClick}
                className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 transform hover:scale-105"
              >
                <div className="w-0 h-0 border-l-4 border-l-black border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                Play Now
              </button>
              
              <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200">
                <span className="text-xl">+</span>
                My List
              </button>
              
              <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200">
                <span className="text-xl">ℹ</span>
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-white" 
                : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;
