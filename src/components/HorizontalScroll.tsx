
import React, { useRef } from 'react';
import { ContentItem } from '@/types/content';
import ContentCard from './ContentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  title: string;
  content: ContentItem[];
  cardSize?: 'small' | 'medium' | 'large';
  onNavigate?: (section: string, contentId?: string) => void;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ 
  title, 
  content, 
  cardSize = 'medium',
  onNavigate
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 px-8">
        <h2 className="text-2xl font-light tracking-wide text-white">
          {title}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="group w-10 h-10 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="group w-10 h-10 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 border border-white/10"
          >
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-8 pb-4"
      >
        {content.map((item) => (
          <ContentCard 
            key={item.id} 
            content={item} 
            size={cardSize}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
