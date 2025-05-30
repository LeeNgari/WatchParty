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
    <div className="w-full max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
       
      </div>

      {/* Scrollable Content */}
      <div className="overflow-x-auto scrollbar-hidden px-4">
        <div 
          ref={scrollRef}
          className="flex gap-4 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
    </div>
  );
};

export default HorizontalScroll;
