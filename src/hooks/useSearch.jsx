import { useState } from 'react';

export function useSearch() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [contentReady, setContentReady] = useState(false);

    const handleMovieClick = (movie) => setSelectedMovie(movie);
    const handleCloseDetail = () => setSelectedMovie(null);

    return {
        selectedMovie,
        showSkeleton,
        contentReady,
        setShowSkeleton,
        setContentReady,
        handleMovieClick,
        handleCloseDetail
    };
}