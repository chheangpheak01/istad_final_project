import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MovieDetail } from "../components/movieDetail/MovieDetail";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useSearchContentReady } from "../hooks/useSearchContentReady";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useSearch } from "../hooks/useSearch";
import { SearchHeader } from "../components/search/SearchHeader";
import { SearchResults } from "../components/search/SearchResults";
import { SearchSkeleton } from "../components/search/SearchSkeleton";
import { SearchError } from "../components/search/SearchError";
import { searchMovies } from "../redux/movies/createAction";

export function Search() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";

    const { movies, status, error } = useSelector(
        (state) => state.movie.searchResults
    );

    const {
        selectedMovie,
        showSkeleton,
        contentReady,
        setShowSkeleton,
        setContentReady,
        handleMovieClick,
        handleCloseDetail
    } = useSearch();

    useScrollToTop();
    useSearchMovies(query, setShowSkeleton, setContentReady, dispatch);
    const { cleanup } = useSearchContentReady(movies, status, contentReady, setContentReady, setShowSkeleton);

    useEffect(() => {
        setContentReady(false);
    }, [query, setContentReady]);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const handleRetry = () => {
        if (query.trim()) {
            setShowSkeleton(true);
            setContentReady(false);
            dispatch(searchMovies(query));
        }
    };

    if (showSkeleton) {
        return <SearchSkeleton />;
    }

    if (status === "failed") {
        return <SearchError error={error} onRetry={handleRetry} />;
    }

    return (
        <>
            <main className="bg-gray-900 min-h-screen text-white pt-24 pb-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <SearchHeader query={query} movies={movies} />
                        {movies.length > 0 && (
                            <SearchResults
                                movies={movies}
                                contentReady={contentReady}
                                onMovieClick={handleMovieClick} />
                        )}
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