import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useMovieCategory(movieSelector, fetchAction) {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector(movieSelector);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  useEffect(() => {
    if (status.includes("successfully") && movies.length > 0) {
      const timer = setTimeout(() => setHasLoaded(true), 400);
      return () => clearTimeout(timer);
    }
  }, [status, movies]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  const handleRetry = () => {
    dispatch(fetchAction());
  };

  return {
    movies,
    status,
    error,
    hasLoaded,
    selectedMovie,
    handleMovieClick,
    handleCloseDetail,
    handleRetry
  };
}