
import React from 'react';
import { ContentItem } from '@/types/content';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  content: ContentItem;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, size = 'medium', onClick }) => {
  const handleClick = () => {
    if (content.url) {
      window.open(content.url, '_blank');
    } else if (content.episodes && content.episodes.length > 0) {
      window.open(content.episodes[0], '_blank');
    }
    onClick?.();
  };

  const sizeClasses = {
    small: 'w-40 h-24',
    medium: 'w-48 h-72',
    large: 'w-56 h-80'
  };

  return (
    <div 
      className={cn(
        "group relative cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0",
        sizeClasses[size]
      )}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
        <img 
          src={content.imageUrl} 
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Content Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
            content.type === 'movie' 
              ? "bg-red-500/80 text-white" 
              : "bg-blue-500/80 text-white"
          )}>
            {content.type === 'movie' ? 'Movie' : 'TV Show'}
          </span>
        </div>

        {/* Genre Pills */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {content.genre.slice(0, 2).map((genre, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Title and Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {content.title}
          </h3>
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <span>{content.releaseDate}</span>
            <span>•</span>
            <span>{content.duration}</span>
          </div>
        </div>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
