import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    loadMoreMovies,
    searchMovies,
    deleteMovie,
} from "../redux/movies/createAction";
import { removeMovieFromCategory } from "../redux/movies/MovieSlice";

export function useDashboardData() {
    const { popular, nowPlaying, upcoming, topRated, loadMore, searchResults, moviesInList } = useSelector(
        (state) => state.movie
    );

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [savedVideos, setSavedVideos] = useState(() => JSON.parse(localStorage.getItem("savedVideos")) || []);
    const [deletedVideos, setDeletedVideos] = useState(() => JSON.parse(localStorage.getItem("deletedVideos")) || []);
    const [watchedVideos, setWatchedVideos] = useState(() => JSON.parse(localStorage.getItem("watchedVideos")) || []);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Persist localStorage
    useEffect(() => localStorage.setItem("savedVideos", JSON.stringify(savedVideos)), [savedVideos]);
    useEffect(() => localStorage.setItem("deletedVideos", JSON.stringify(deletedVideos)), [deletedVideos]);
    useEffect(() => localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos)), [watchedVideos]);

    // Fetch movies on mount
    useEffect(() => {
        dispatch(fetchPopularMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchUpcomingMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(loadMoreMovies());
    }, [dispatch]);

    // Window resize listener
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Search movies
    useEffect(() => {
        if (searchTerm.trim()) {
            setIsSearching(true);
            setIsLoading(true);
            dispatch(searchMovies(searchTerm)).finally(() => setIsLoading(false));
        } else setIsSearching(false);
    }, [searchTerm, dispatch]);

    // Delete movie
    const handleDelete = (movie) => {
        const { id } = movie;
        switch (activeTab) {
            case "myList":
                if (!moviesInList?.listId) return;
                dispatch(deleteMovie({ movieId: id, listId: moviesInList.listId }))
                    .unwrap()
                    .then(() => setDeletedVideos((prev) => [...prev, movie]))
                    .catch((err) => console.error(err));
                break;
            case "popular":
            case "upcoming":
            case "nowPlaying":
            case "topRated":
            case "loadMore":
                dispatch(removeMovieFromCategory({ category: activeTab, movieId: id }));
                setDeletedVideos((prev) => [...prev, movie]);
                break;
            case "saved":
                setSavedVideos((prev) => prev.filter((m) => m.id !== id));
                setDeletedVideos((prev) => [...prev, movie]);
                break;
            case "watched":
                setWatchedVideos((prev) => prev.filter((m) => m.id !== id));
                setDeletedVideos((prev) => [...prev, movie]);
                break;
        }
    };

    // Rewatch movie from deleted → watched
    const handleRewatch = (movie) => {
        setDeletedVideos((prev) => prev.filter((m) => m.id !== movie.id));
        setWatchedVideos((prev) => [...prev, movie]);
    };

    // Current data for table
    const getCurrentData = () => {
        let data;

        if (isSearching) {
            data = searchResults.movies || [];
        } else {
            switch (activeTab) {
                case "popular": data = popular.movies || []; break;
                case "upcoming": data = upcoming.movies || []; break;
                case "nowPlaying": data = nowPlaying.movies || []; break;
                case "topRated": data = topRated.movies || []; break;
                case "saved": data = savedVideos; break;
                case "watched": data = watchedVideos; break;
                case "deleted": data = deletedVideos; break;
                case "myList": data = moviesInList.movies || []; break;
                case "loadMore": data = loadMore.movies || []; break; // ✅ fixed loadMore
                default: data = [];
            }

            // Filter out deleted videos from all categories except Deleted, Saved, Watched
            if (!["deleted", "saved", "watched"].includes(activeTab)) {
                data = data.filter((m) => !deletedVideos.some((d) => d.id === m.id));
            }
        }

        return data;
    };

    return {
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        isSearching,
        isLoading,
        savedVideos,
        deletedVideos,
        watchedVideos,
        setSavedVideos,
        setWatchedVideos,
        currentData: getCurrentData(),
        windowWidth,
        handleDelete,
        handleRewatch,
    };
}