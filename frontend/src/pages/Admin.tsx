
import React, { useState } from 'react';
import { MOVIES, TV_SHOWS } from '@/data/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit } from 'lucide-react';

const Admin: React.FC = () => {
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showTVForm, setShowTVForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<any>(null);
  const [editingTV, setEditingTV] = useState<any>(null);

  const [movieForm, setMovieForm] = useState({
    title: '',
    description: '',
    duration: '',
    release_date: '',
    genre: '',
    movie_url: '',
    display_pic: ''
  });

  const [tvForm, setTVForm] = useState({
    title: '',
    description: '',
    duration: '',
    release_date: '',
    genre: '',
    display_pic: '',
    episodes: ''
  });

  const handleMovieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('Movie data:', {
      ...movieForm,
      genre: movieForm.genre.split(',').map(g => g.trim())
    });
    setMovieForm({
      title: '',
      description: '',
      duration: '',
      release_date: '',
      genre: '',
      movie_url: '',
      display_pic: ''
    });
    setShowMovieForm(false);
    setEditingMovie(null);
  };

  const handleTVSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('TV Show data:', {
      ...tvForm,
      genre: tvForm.genre.split(',').map(g => g.trim()),
      episodes: tvForm.episodes.split('\n').filter(ep => ep.trim())
    });
    setTVForm({
      title: '',
      description: '',
      duration: '',
      release_date: '',
      genre: '',
      display_pic: '',
      episodes: ''
    });
    setShowTVForm(false);
    setEditingTV(null);
  };

  const editMovie = (movie: any) => {
    setMovieForm({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      release_date: movie.release_date,
      genre: movie.genre.join(', '),
      movie_url: movie.movie_url,
      display_pic: movie.display_pic
    });
    setEditingMovie(movie);
    setShowMovieForm(true);
  };

  const editTV = (show: any) => {
    setTVForm({
      title: show.title,
      description: show.description,
      duration: show.duration,
      release_date: show.release_date,
      genre: show.genre.join(', '),
      display_pic: show.display_pic,
      episodes: show.episodes.join('\n')
    });
    setEditingTV(show);
    setShowTVForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800">
            <TabsTrigger value="movies" className="data-[state=active]:bg-red-600">Movies</TabsTrigger>
            <TabsTrigger value="tv" className="data-[state=active]:bg-red-600">TV Shows</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Movies</h2>
              <Button 
                onClick={() => setShowMovieForm(!showMovieForm)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Movie
              </Button>
            </div>

            {showMovieForm && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                </h3>
                <form onSubmit={handleMovieSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="movie-title" className="text-white">Title</Label>
                    <Input
                      id="movie-title"
                      value={movieForm.title}
                      onChange={(e) => setMovieForm({...movieForm, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="movie-duration" className="text-white">Duration</Label>
                    <Input
                      id="movie-duration"
                      value={movieForm.duration}
                      onChange={(e) => setMovieForm({...movieForm, duration: e.target.value})}
                      placeholder="e.g., 1h 49m"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="movie-release" className="text-white">Release Date</Label>
                    <Input
                      id="movie-release"
                      value={movieForm.release_date}
                      onChange={(e) => setMovieForm({...movieForm, release_date: e.target.value})}
                      placeholder="e.g., 2025"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="movie-genre" className="text-white">Genres (comma-separated)</Label>
                    <Input
                      id="movie-genre"
                      value={movieForm.genre}
                      onChange={(e) => setMovieForm({...movieForm, genre: e.target.value})}
                      placeholder="e.g., Action, Thriller"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="movie-description" className="text-white">Description</Label>
                    <Textarea
                      id="movie-description"
                      value={movieForm.description}
                      onChange={(e) => setMovieForm({...movieForm, description: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="movie-url" className="text-white">Movie URL</Label>
                    <Input
                      id="movie-url"
                      value={movieForm.movie_url}
                      onChange={(e) => setMovieForm({...movieForm, movie_url: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="movie-image" className="text-white">Display Picture URL</Label>
                    <Input
                      id="movie-image"
                      value={movieForm.display_pic}
                      onChange={(e) => setMovieForm({...movieForm, display_pic: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingMovie ? 'Update Movie' : 'Add Movie'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowMovieForm(false);
                        setEditingMovie(null);
                        setMovieForm({
                          title: '',
                          description: '',
                          duration: '',
                          release_date: '',
                          genre: '',
                          movie_url: '',
                          display_pic: ''
                        });
                      }}
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Duration</TableHead>
                    <TableHead className="text-white">Release Date</TableHead>
                    <TableHead className="text-white">Genres</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOVIES.map((movie, index) => (
                    <TableRow key={index} className="border-gray-700">
                      <TableCell className="text-white">{movie.title}</TableCell>
                      <TableCell className="text-gray-300">{movie.duration}</TableCell>
                      <TableCell className="text-gray-300">{movie.release_date}</TableCell>
                      <TableCell className="text-gray-300">{movie.genre.join(', ')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editMovie(movie)}
                            className="border-gray-600 text-white hover:bg-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="tv" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage TV Shows</h2>
              <Button 
                onClick={() => setShowTVForm(!showTVForm)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add TV Show
              </Button>
            </div>

            {showTVForm && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingTV ? 'Edit TV Show' : 'Add New TV Show'}
                </h3>
                <form onSubmit={handleTVSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tv-title" className="text-white">Title</Label>
                    <Input
                      id="tv-title"
                      value={tvForm.title}
                      onChange={(e) => setTVForm({...tvForm, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tv-duration" className="text-white">Episode Duration</Label>
                    <Input
                      id="tv-duration"
                      value={tvForm.duration}
                      onChange={(e) => setTVForm({...tvForm, duration: e.target.value})}
                      placeholder="e.g., 30m"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tv-release" className="text-white">Release Date</Label>
                    <Input
                      id="tv-release"
                      value={tvForm.release_date}
                      onChange={(e) => setTVForm({...tvForm, release_date: e.target.value})}
                      placeholder="e.g., 2025"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tv-genre" className="text-white">Genres (comma-separated)</Label>
                    <Input
                      id="tv-genre"
                      value={tvForm.genre}
                      onChange={(e) => setTVForm({...tvForm, genre: e.target.value})}
                      placeholder="e.g., Comedy, Drama"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="tv-description" className="text-white">Description</Label>
                    <Textarea
                      id="tv-description"
                      value={tvForm.description}
                      onChange={(e) => setTVForm({...tvForm, description: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tv-image" className="text-white">Display Picture URL</Label>
                    <Input
                      id="tv-image"
                      value={tvForm.display_pic}
                      onChange={(e) => setTVForm({...tvForm, display_pic: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tv-episodes" className="text-white">Episode URLs (one per line)</Label>
                    <Textarea
                      id="tv-episodes"
                      value={tvForm.episodes}
                      onChange={(e) => setTVForm({...tvForm, episodes: e.target.value})}
                      placeholder="Enter episode URLs, one per line"
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingTV ? 'Update TV Show' : 'Add TV Show'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowTVForm(false);
                        setEditingTV(null);
                        setTVForm({
                          title: '',
                          description: '',
                          duration: '',
                          release_date: '',
                          genre: '',
                          display_pic: '',
                          episodes: ''
                        });
                      }}
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Duration</TableHead>
                    <TableHead className="text-white">Release Date</TableHead>
                    <TableHead className="text-white">Genres</TableHead>
                    <TableHead className="text-white">Episodes</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TV_SHOWS.map((show, index) => (
                    <TableRow key={index} className="border-gray-700">
                      <TableCell className="text-white">{show.title}</TableCell>
                      <TableCell className="text-gray-300">{show.duration}</TableCell>
                      <TableCell className="text-gray-300">{show.release_date}</TableCell>
                      <TableCell className="text-gray-300">{show.genre.join(', ')}</TableCell>
                      <TableCell className="text-gray-300">{show.episodes.length}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editTV(show)}
                            className="border-gray-600 text-white hover:bg-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
