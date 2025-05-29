
import React from 'react';
import FeaturedHero from '@/components/FeaturedHero';
import HorizontalScroll from '@/components/HorizontalScroll';
import { ALL_CONTENT, RECENTLY_WATCHED, MOVIES, TV_SHOWS } from '@/data/content';

interface HomeProps {
  onNavigate?: (section: string, contentId?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const featuredContent = ALL_CONTENT.slice(0, 4);
  const movieContent = ALL_CONTENT.filter(item => item.type === 'movie');
  const tvContent = ALL_CONTENT.filter(item => item.type === 'tv');
  const trendingContent = [...ALL_CONTENT].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <div className="min-h-screen bg-black">
      <FeaturedHero content={featuredContent} onNavigate={onNavigate} />
      
      <div className="pb-20 space-y-12 -mt-32 relative z-10">
        <HorizontalScroll 
          title="Continue Watching for User" 
          content={RECENTLY_WATCHED}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        <HorizontalScroll 
          title="Trending Now" 
          content={trendingContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        <HorizontalScroll 
          title="Popular Movies" 
          content={movieContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />
        
        <HorizontalScroll 
          title="TV Series" 
          content={tvContent}
          cardSize="medium"
          onNavigate={onNavigate}
        />

        <HorizontalScroll 
          title="Watch Together Rooms" 
          content={ALL_CONTENT.slice(0, 6)}
          cardSize="medium"
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default Home;
