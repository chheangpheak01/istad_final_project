import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../redux/movies/createAction';
import MovieCard from '../components/MovieCard';
import { PopularMoviesSkeleton } from '../components/LoadingSkeletons';

export function Popular() {
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.movie);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Only fetch if we don't have data or there was an error
    if (popular.movies.length === 0 || popular.status.includes('Failed')) {
      dispatch(fetchPopularMovies());
    }
    
    // Mark initial load as complete after first render
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [dispatch, popular.movies.length, popular.status, isInitialLoad]);

  const handleMovieClick = (movie) => {
    // You can implement movie detail navigation here
    console.log('Movie clicked:', movie);
    // Or navigate to movie detail page
    // navigate(`/movie/${movie.id}`);
  };

  const handleRetry = () => {
    dispatch(fetchPopularMovies());
  };

  // Show skeleton only on initial load when no movies exist
  if (isInitialLoad && popular.status.includes('Loading') && popular.movies.length === 0) {
    return <PopularMoviesSkeleton />;
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Popular Movies
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the most popular movies right now. Browse through trending films from The Movie Database.
          </p>
          <div className="mt-4 text-gray-400">
            <p>Showing {popular.movies.length} popular movies</p>
            {popular.status.includes('Loading') && (
              <div className="inline-flex items-center mt-2 text-yellow-400">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            )}
          </div>
        </header>

        {/* Movies Grid */}
        <section aria-label="Popular movies list">
          {/* Loading overlay for subsequent loads */}
          {popular.status.includes('Loading') && popular.movies.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg flex items-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                <span>Loading more movies...</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
            {popular.movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>

          {/* No Movies Message */}
          {popular.movies.length === 0 && popular.status.includes('successfully') && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl text-gray-300 mb-2">No popular movies found.</p>
              <p className="text-gray-500">Try refreshing the page or check back later.</p>
            </div>
          )}

          {/* Error Message */}
          {popular.status.includes('Failed') && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-red-500">⚠️</div>
              <p className="text-xl text-red-400 mb-2">Failed to load popular movies</p>
              <p className="text-gray-400 mb-4">{popular.error || 'An unexpected error occurred'}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Load More Button (if you implement pagination) */}
          {popular.movies.length > 0 && !popular.status.includes('Failed') && (
            <div className="text-center mt-8">
              <button
                onClick={handleRetry}
                disabled={popular.status.includes('Loading')}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white px-8 py-3 rounded-lg transition duration-200 font-medium disabled:cursor-not-allowed"
              >
                {popular.status.includes('Loading') ? 'Loading...' : 'Refresh Movies'}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}