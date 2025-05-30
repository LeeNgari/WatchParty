import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/content';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedHeroProps {
  content: ContentItem[];
  onNavigate?: (section: string, contentId?: string) => void;
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ content, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        setIsTransitioning(false);
      }, 1000); // Transition duration
    }, 8000); // Change every 8 seconds (7s visible + 1s transition)

    return () => clearInterval(interval);
  }, [content.length]);

  const currentContent = content[currentIndex];
  const nextContent = content[(currentIndex + 1) % content.length];

  if (!currentContent) return null;

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
      setIsTransitioning(false);
    }, 1000);
  };

  const handlePlay = () => onNavigate?.('watch', currentContent.id);
  const handleInfo = () => onNavigate?.('details', currentContent.id);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {/* Current Content */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img 
            src={currentContent.imageUrl} 
            alt={currentContent.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent"></div>
        </div>
        
        {/* Next Content (preloaded) */}
        {nextContent && (
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={nextContent.imageUrl} 
              alt={nextContent.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-24">
        <div className="max-w-2xl space-y-6 transform-gpu">
          {/* Title with subtle animation */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
            {currentContent.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-gray-300">
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              98% Match
            </span>
            <span>{currentContent.releaseDate}</span>
            
            <span>{currentContent.duration}</span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl drop-shadow-lg">
            {currentContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button 
              onClick={handlePlay}
              className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/10"
            >
              <Play className="w-6 h-6 fill-current" />
              <span className="text-lg">Play</span>
            </button>
            
            <button 
              onClick={handleInfo}
              className="flex items-center gap-3 bg-gray-800/90 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700/90 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-black/20"
            >
              <Info className="w-6 h-6" />
              <span className="text-lg">More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-20">
        <button 
          onClick={handlePrevious}
          className="w-12 h-12 bg-gray-900/90 backdrop-blur-md hover:bg-gray-800/90 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shadow-black/30"
        >
          <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 bg-gray-900/90 backdrop-blur-md hover:bg-gray-800/90 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shadow-black/30"
        >
          <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-8 lg:left-24 flex gap-2 z-20">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 1000);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'bg-red-600 w-10 shadow-lg shadow-red-600/40' 
                : 'bg-gray-600 w-4 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;