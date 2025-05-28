
import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/content';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedHeroProps {
  content: ContentItem[];
  onNavigate?: (section: string, contentId?: string) => void;
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ content, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [content.length, isAutoPlaying]);

  const currentContent = content[currentIndex];

  if (!currentContent) return null;

  const handleWatch = () => {
    onNavigate?.('watch', currentContent.id);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % content.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={currentContent.display_pic} 
          alt={currentContent.title}
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-2xl px-8 ml-8">
          <h1 className="text-6xl font-light tracking-tight text-white mb-6 leading-tight">
            {currentContent.title}
          </h1>
          
          <p className="text-lg font-light text-white/80 mb-8 leading-relaxed line-clamp-3">
            {currentContent.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-white/60 font-light">{currentContent.release_date}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/60 font-light">{currentContent.duration}</span>
            <span className="text-white/40">•</span>
            <div className="flex gap-2">
              {currentContent.genre.slice(0, 2).map((g, idx) => (
                <span key={idx} className="text-white/60 font-light">
                  {g}{idx < currentContent.genre.slice(0, 2).length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleWatch}
              className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </button>
            
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white px-8 py-3 rounded-full font-light border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button 
        onClick={handlePrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-black/40 transition-all duration-300 border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-black/40 transition-all duration-300 border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {content.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;
