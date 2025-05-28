
import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/content';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedHeroProps {
  content: ContentItem[];
  onNavigate?: (section: string, contentId?: string) => void;
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ content, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [content.length]);

  const currentContent = content[currentIndex];

  if (!currentContent) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % content.length);
  };

  const handlePlay = () => {
    onNavigate?.('watch', currentContent.id);
  };

  const handleInfo = () => {
    onNavigate?.('watch', currentContent.id);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={currentContent.imageUrl} 
          alt={currentContent.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl space-y-8">
            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-light text-white leading-tight tracking-tight">
              {currentContent.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center gap-6 text-white/60 text-sm font-light">
              <span>{currentContent.releaseDate}</span>
              <span>•</span>
              <span>{currentContent.duration}</span>
              <span>•</span>
              <span className="capitalize">{currentContent.type}</span>
            </div>

            {/* Genres */}
            <div className="flex gap-3">
              {currentContent.genre.slice(0, 3).map((genre, index) => (
                <span key={index} className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 text-sm font-light rounded-full border border-white/10">
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/80 text-lg leading-relaxed max-w-xl font-light">
              {currentContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handlePlay}
                className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>
              
              <button 
                onClick={handleInfo}
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button 
          onClick={handlePrevious}
          className="w-12 h-12 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-8 flex gap-2 z-20">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;
