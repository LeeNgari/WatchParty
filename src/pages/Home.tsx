
import React from 'react';
import FeaturedHero from '@/components/FeaturedHero';
import HorizontalScroll from '@/components/HorizontalScroll';
import { ALL_CONTENT, RECENTLY_WATCHED, MOVIES, TV_SHOWS } from '@/data/content';

interface HomeProps {
  onNavigate?: (section: string, contentId?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Get featured content (first 4 items)
  const featuredContent = ALL_CONTENT.slice(0, 4);
  
  // Convert movies and TV shows to ContentItem format for sections
  const movieContent = ALL_CONTENT.filter(item => item.type === 'movie');
  const tvContent = ALL_CONTENT.filter(item => item.type === 'tv');
  
  // Trending content (randomized)
  const trendingContent = [...ALL_CONTENT].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Featured Hero Section */}
      <FeaturedHero content={featuredContent} onNavigate={onNavigate} />
      
      {/* Content Sections */}
      <div className="pb-12">
        {/* Recently Watched */}
        <HorizontalScroll 
          title="Continue Watching" 
          content={RECENTLY_WATCHED}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        {/* Trending Now */}
        <HorizontalScroll 
          title="Trending Now" 
          content={trendingContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        {/* Movies */}
        <HorizontalScroll 
          title="Popular Movies" 
          content={movieContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        {/* TV Shows */}
        <HorizontalScroll 
          title="TV Series" 
          content={tvContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default Home;
