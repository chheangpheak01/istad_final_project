import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import MovieRow from './MovieRow';

export function MovieSections({ popular, upcoming, topRated, nowPlaying, onMovieClick }) {
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
          />
        </div>
      )}
      {upcoming.movies.length > 0 && (
        <div ref={upcomingRef}>
          <MovieRow
            title="Upcoming"
            movies={upcoming.movies}
            visible={upcomingVisible}
            onMovieClick={onMovieClick}
          />
        </div>
      )}
      {topRated.movies.length > 0 && (
        <div ref={topRatedRef}>
          <MovieRow
            title="Top Rated"
            movies={topRated.movies}
            visible={topRatedVisible}
            onMovieClick={onMovieClick}
          />
        </div>
      )}
      {nowPlaying.movies.length > 0 && (
        <div ref={nowPlayingRef}>
          <MovieRow
            title="Now Playing"
            movies={nowPlaying.movies}
            visible={nowPlayingVisible}
            onMovieClick={onMovieClick}
          />
        </div>
      )}
    </section>
  );
}