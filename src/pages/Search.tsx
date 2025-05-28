
import React, { useState, useMemo } from 'react';
import { ALL_CONTENT } from '@/data/content';
import ContentCard from '@/components/ContentCard';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    ALL_CONTENT.forEach(item => {
      item.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }, []);

  // Filter content based on search criteria
  const filteredContent = useMemo(() => {
    return ALL_CONTENT.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || item.genre.includes(selectedGenre);
      const matchesType = selectedType === '' || item.type === selectedType;
      
      return matchesSearch && matchesGenre && matchesType;
    });
  }, [searchQuery, selectedGenre, selectedType]);

  return (
    <div className="min-h-screen bg-black pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
          
          {/* Search Controls */}
          <div className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            
            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="">All Types</option>
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {searchQuery || selectedGenre || selectedType 
                ? `Found ${filteredContent.length} results` 
                : 'All Content'
              }
            </h2>
            {(searchQuery || selectedGenre || selectedType) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('');
                  setSelectedType('');
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
          
          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No results found</div>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredContent.map(item => (
                <ContentCard key={item.id} content={item} size="medium" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
