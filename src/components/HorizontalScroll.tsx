
import React, { useRef } from 'react';
import { ContentItem } from '@/types/content';
import ContentCard from './ContentCard';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  title: string;
  content: ContentItem[];
  cardSize?: 'small' | 'medium' | 'large';
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ 
  title, 
  content, 
  cardSize = 'medium' 
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
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
          >
            <span className="text-white text-lg">‹</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
          >
            <span className="text-white text-lg">›</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {content.map((item) => (
          <ContentCard 
            key={item.id} 
            content={item} 
            size={cardSize}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
