import { useState } from 'react';
import { FullPageSkeleton } from '../components/LoadingSkeletons';
import { WelcomeSection } from '../components/WelcomeSection';
import { MovieDetail } from '../components/movieDetail/MovieDetail';
import { useMoviesData } from '../hooks/useMoviesData';
import { MovieSections } from '../components/MovieSections';
import { HeroSection } from '../components/HeroSection';

export function HomePage() {
  const { popular, upcoming, topRated, nowPlaying, isLoading, heroMovie } = useMoviesData();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsMovieDetailOpen(true);
  };

  const handleCloseMovieDetail = () => {
    setIsMovieDetailOpen(false);
    setSelectedMovie(null);
  };

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <HeroSection heroMovie={heroMovie} />
      <WelcomeSection />
      <MovieSections 
        popular={popular}
        upcoming={upcoming}
        topRated={topRated}
        nowPlaying={nowPlaying}
        onMovieClick={handleMovieClick}/>
      
      <MovieDetail
        movie={selectedMovie}
        isOpen={isMovieDetailOpen}
        onClose={handleCloseMovieDetail}
      />
    </main>
  );
}