
import React, { useState } from 'react';
import { ALL_CONTENT } from '@/data/content';
import ContentCard from '@/components/ContentCard';

const Explore: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Get all unique genres
  const allGenres = ['All', ...new Set(ALL_CONTENT.flatMap(item => item.genre))].sort();

  // Filter content by genre
  const filteredContent = selectedGenre === 'All' 
    ? ALL_CONTENT 
    : ALL_CONTENT.filter(item => item.genre.includes(selectedGenre));

  // Group content by type
  const movies = filteredContent.filter(item => item.type === 'movie');
  const tvShows = filteredContent.filter(item => item.type === 'tv');

  return (
    <div className="min-h-screen bg-black pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Explore</h1>
          <p className="text-gray-400 text-lg mb-8">Discover movies and TV shows by genre</p>
          
          {/* Genre Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {allGenres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Section */}
        {movies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Movies {selectedGenre !== 'All' && `• ${selectedGenre}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map(movie => (
                <ContentCard key={movie.id} content={movie} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* TV Shows Section */}
        {tvShows.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              TV Shows {selectedGenre !== 'All' && `• ${selectedGenre}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvShows.map(show => (
                <ContentCard key={show.id} content={show} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No content found for "{selectedGenre}"</div>
            <p className="text-gray-500">Try selecting a different genre</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
