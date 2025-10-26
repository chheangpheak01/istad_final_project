import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMovieDetail,
    fetchMovieTrailer,
    fetchMovieCast
} from "../redux/movies/createAction";

export function useMovieDetailData(movie, isOpen) {
    const dispatch = useDispatch();
    const { movieDetail, trailer, cast } = useSelector((state) => state.movie);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const trailerSectionRef = useRef(null);

    useEffect(() => {
        if (isOpen && movie) {
            setIsLoading(true);
            dispatch(fetchMovieDetail(movie.id));
            dispatch(fetchMovieTrailer(movie.id));
            dispatch(fetchMovieCast(movie.id));
        }
    }, [isOpen, movie, dispatch]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setShowTrailer(false);
            setIsLoading(true);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Check if all data is loaded
    useEffect(() => {
        if (isOpen && movieDetail.data && trailer.data !== undefined && cast.data !== undefined) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, movieDetail.data, trailer.data, cast.data]);

    // Auto-scroll to trailer when it appears
    useEffect(() => {
        if (showTrailer && trailerSectionRef.current && !isLoading) {
            setTimeout(() => {
                trailerSectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }, [showTrailer, isLoading]);

    const trailerVideo = trailer.data?.find(video =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    const handleWatchTrailer = () => {
        if (trailerVideo) {
            setShowTrailer(true);
        }
    };

    return {
        movieDetail,
        trailerVideo,
        cast,
        showTrailer,
        isLoading,
        trailerSectionRef,
        handleWatchTrailer,
        setShowTrailer
    };
}