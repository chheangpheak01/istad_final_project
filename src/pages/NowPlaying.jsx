import { fetchNowPlayingMovies } from "../redux/movies/createAction";
import MovieCard from "../components/MovieCard";
import { MovieDetail } from "../components/movieDetail/MovieDetail";
import { MovieGridSkeleton } from "../components/LoadingSkeletons";
import { useMovieCategory } from "../hooks/useMovieCategory";
import { useScrollToTop } from "../hooks/useScrollToTop";

export function NowPlaying() {
  const {
    movies,
    status,
    error,
    hasLoaded,
    selectedMovie,
    handleMovieClick,
    handleCloseDetail,
    handleRetry
  } = useMovieCategory(
    (state) => state.movie.nowPlaying,
    fetchNowPlayingMovies
  );

  useScrollToTop();

  if (status.includes("Loading") || !hasLoaded) {
    return <MovieGridSkeleton />;
  }

  if (status.includes("Failed")) {
    return (
      <main className="bg-gray-900 min-h-screen text-white pt-24 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4 text-red-500">⚠️</div>
          <p className="text-xl text-red-400 mb-2">{status}</p>
          {error && <p className="text-gray-400 mb-4">{error}</p>}
          <button
            onClick={handleRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium">
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="bg-gray-900 min-h-screen text-white">
        <div className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Now Playing
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover movies that are currently playing in theaters. Catch the latest releases while they're still on the big screen.
              </p>
              <div className="mt-4 text-gray-400">
                <p>Showing {movies.length} movies now playing</p>
                {status.includes("Loading") && (
                  <div className="inline-flex items-center mt-2 text-yellow-400">
                    <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Loading...
                  </div>
                )}
              </div>
            </header>

            <section aria-label="Now playing movies list">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={handleCloseDetail} />
      )}
    </>
  );
}