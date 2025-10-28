import { useEffect } from 'react';
import { searchMovies } from '../redux/movies/createAction';

export function useSearchMovies(query, setShowSkeleton, setContentReady, dispatch) {
  useEffect(() => {
    if (query.trim()) {
      setShowSkeleton(true);
      setContentReady(false);
      dispatch(searchMovies(query));
    } else {
      setShowSkeleton(false);
      setContentReady(true);
    }
  }, [dispatch, query, setShowSkeleton, setContentReady]);
}