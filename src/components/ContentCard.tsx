
import React from 'react';
import { ContentItem } from '@/types/content';
import { Play, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  content: ContentItem;
  size?: 'small' | 'medium' | 'large';
  onNavigate?: (section: string, contentId: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, size = 'medium', onNavigate }) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('watch', content.id);
    } else {
      // Fallback to opening movie URL or first episode directly
      if (content.type === 'movie' && content.url) {
        window.open(content.url, '_blank');
      } else if (content.type === 'tv' && content.episodes && content.episodes.length > 0) {
        window.open(content.episodes[0], '_blank');
      }
    }
  };

  const sizeClasses = {
    small: 'w-40 h-56',
    medium: 'w-48 h-72',
    large: 'w-56 h-80'
  };

  return (
    <div className={cn(
      "flex-shrink-0 group cursor-pointer transition-all duration-500 hover:scale-105",
      sizeClasses[size]
    )}
    onClick={handleClick}>
      <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl group-hover:shadow-red-500/20 transition-all duration-500">
        {/* Image */}
        <div className="relative h-2/3 overflow-hidden">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm",
              content.type === 'movie' 
                ? "bg-red-500/80 text-white" 
                : "bg-blue-500/80 text-white"
            )}>
              {content.type === 'movie' ? 'Movie' : 'TV Show'}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">8.5</span>
          </div>
        </div>

        {/* Content */}
        <div className="h-1/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm line-clamp-2 mb-1 group-hover:text-red-400 transition-colors duration-300">
              {content.title}
            </h3>
            <p className="text-white/60 text-xs line-clamp-2 mb-2">
              {content.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-white/50">
              <Clock className="w-3 h-3" />
              <span>{content.duration}</span>
            </div>
            <span className="text-white/40">{content.releaseDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
