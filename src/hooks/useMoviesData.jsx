import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies
} from '../redux/movies/createAction';

export function useMoviesData() {
  const dispatch = useDispatch();
  const { popular, nowPlaying, upcoming, topRated } = useSelector((state) => state.movie);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch movies if they haven't been loaded yet
    if (popular.movies.length === 0) dispatch(fetchPopularMovies());
    if (nowPlaying.movies.length === 0) dispatch(fetchNowPlayingMovies());
    if (upcoming.movies.length === 0) dispatch(fetchUpcomingMovies());
    if (topRated.movies.length === 0) dispatch(fetchTopRatedMovies());

    const checkLoading = setTimeout(() => {
      if (popular.movies.length > 0 && nowPlaying.movies.length > 0 &&
        upcoming.movies.length > 0 && topRated.movies.length > 0) {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(checkLoading);
  }, [dispatch, popular.movies.length, nowPlaying.movies.length, upcoming.movies.length, topRated.movies.length]);

  return {
    popular,
    nowPlaying,
    upcoming,
    topRated,
    isLoading,
    heroMovie: popular.movies[0]
  };
}