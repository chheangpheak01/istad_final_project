import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import MovieRow from './MovieRow';

export function MovieSections({ popular, upcoming, topRated, nowPlaying, onMovieClick,  onViewMore}) {
  const [popularRef, popularVisible] = useIntersectionObserver();
  const [upcomingRef, upcomingVisible] = useIntersectionObserver();
  const [topRatedRef, topRatedVisible] = useIntersectionObserver();
  const [nowPlayingRef, nowPlayingVisible] = useIntersectionObserver();

  return (
    <section aria-label="Movie categories">
      {popular.movies.length > 0 && (
        <div ref={popularRef}>
          <MovieRow
            title="Popular"
            movies={popular.movies}
            visible={popularVisible}
            onMovieClick={onMovieClick}
            onViewMore={() => onViewMore('popular')}/>
        </div>
      )}
      {upcoming.movies.length > 0 && (
        <div ref={upcomingRef}>
          <MovieRow
            title="Upcoming"
            movies={upcoming.movies}
            visible={upcomingVisible}
            onMovieClick={onMovieClick}
            onViewMore={() => onViewMore('upcoming')}/>
        </div>
      )}
      {topRated.movies.length > 0 && (
        <div ref={topRatedRef}>
          <MovieRow
            title="Top Rated"
            movies={topRated.movies}
            visible={topRatedVisible}
            onMovieClick={onMovieClick}
            onViewMore={() => onViewMore('top-rated')}/>
        </div>
      )}
      {nowPlaying.movies.length > 0 && (
        <div ref={nowPlayingRef}>
          <MovieRow
            title="Now Playing"
            movies={nowPlaying.movies}
            visible={nowPlayingVisible}
            onMovieClick={onMovieClick}
            onViewMore={() => onViewMore('now-playing')}/>
        </div>
      )}
    </section>
  );
}