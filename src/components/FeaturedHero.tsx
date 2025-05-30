
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
    if (onNavigate) {
      onNavigate('watch', currentContent.id);
    }
  };

  const handleInfo = () => {
    if (onNavigate) {
      onNavigate('watch', currentContent.id);
    }
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 lg:px-16">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            {currentContent.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-gray-300">
            <span className="text-green-400 font-semibold">98% Match</span>
            <span>{currentContent.releaseDate}</span>
            <span className="px-2 py-1 border border-gray-400 text-sm">HD</span>
            <span>{currentContent.duration}</span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-base leading-relaxed max-w-xl">
            {currentContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handlePlay}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            
            <button 
              onClick={handleInfo}
              className="flex items-center gap-3 bg-gray-700/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600/80 transition-all duration-200"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button 
          onClick={handlePrevious}
          className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={handleNext}
          className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-4 lg:left-16 flex gap-2 z-20">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-red-600 w-8' 
                : 'bg-gray-600 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;
