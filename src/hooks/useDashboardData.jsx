import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    loadMoreMovies,
    deleteMovie,
    addMovieToList,
} from "../redux/movies/createAction";
import { removeFromSearchResults, removeMovieFromCategory } from "../redux/movies/MovieSlice";

export function useDashboardData() {
    const { popular, nowPlaying, upcoming, topRated, loadMore, moviesInList } = useSelector(
        (state) => state.movie
    );

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categorySearchResults, setCategorySearchResults] = useState([]);

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

    // Search movies per category
    useEffect(() => {
        if (!searchTerm.trim()) {
            setIsSearching(false);
            setCategorySearchResults([]);
            return;
        }

        setIsSearching(true);
        setIsLoading(true);

        let sourceData = [];
        switch (activeTab) {
            case "popular": sourceData = popular.movies || []; break;
            case "upcoming": sourceData = upcoming.movies || []; break;
            case "nowPlaying": sourceData = nowPlaying.movies || []; break;
            case "topRated": sourceData = topRated.movies || []; break;
            case "saved": sourceData = savedVideos; break;
            case "watched": sourceData = watchedVideos; break;
            case "deleted": sourceData = deletedVideos; break;
            case "myList": sourceData = moviesInList.movies || []; break;
            case "loadMore": sourceData = loadMore.movies || []; break;
            default: sourceData = [];
        }

        const filtered = sourceData.filter(m => {
            const matchesTitle = m.title?.toLowerCase().includes(searchTerm.toLowerCase());

            // For sidebar categories, do not exclude any videos
            if (["saved", "watched", "deleted"].includes(activeTab)) return matchesTitle;

            // For main categories, exclude saved/deleted/watched
            return matchesTitle &&
                !deletedVideos.some(d => d.id === m.id) &&
                !savedVideos.some(s => s.id === m.id) &&
                !watchedVideos.some(w => w.id === m.id);
        });

        setCategorySearchResults(filtered);
        setIsLoading(false);
    }, [
        searchTerm,
        activeTab,
        popular,
        upcoming,
        nowPlaying,
        topRated,
        savedVideos,
        watchedVideos,
        deletedVideos,
        moviesInList,
        loadMore
    ]);

    // Delete movie
    const handleDelete = (movie) => {
        const { id } = movie;
        const movieWithCategory = { ...movie, originalCategory: activeTab };

        if (searchTerm.trim()) dispatch(removeFromSearchResults(id));

        switch (activeTab) {
            case "myList":
                if (!moviesInList?.listId) return;
                dispatch(deleteMovie({ movieId: id, listId: moviesInList.listId }))
                    .unwrap()
                    .then(() => setDeletedVideos(prev => [...prev, movieWithCategory]))
                    .catch(err => console.error(err));
                break;
            case "popular":
            case "upcoming":
            case "nowPlaying":
            case "topRated":
            case "loadMore":
                dispatch(removeMovieFromCategory({ category: activeTab, movieId: id }));
                setDeletedVideos(prev => [...prev, movieWithCategory]);
                break;
            case "saved":
                setSavedVideos(prev => prev.filter(m => m.id !== id));
                setDeletedVideos(prev => [...prev, movieWithCategory]);
                break;
            case "watched":
                setWatchedVideos(prev => prev.filter(m => m.id !== id));
                setDeletedVideos(prev => [...prev, movieWithCategory]);
                break;
        }
    };

    const handleRestore = (movie) => {
        const { id, originalCategory } = movie;
        setDeletedVideos(prev => prev.filter(m => m.id !== id));

        if (originalCategory === "saved") setSavedVideos(prev => [...prev, movie]);
        else if (originalCategory === "watched") setWatchedVideos(prev => [...prev, movie]);

        if (originalCategory === "myList" && moviesInList?.listId) {
            dispatch(addMovieToList({ movieId: id, listId: moviesInList.listId }));
        }
    };

    const handleSave = (movie) => {
        const { id } = movie;

        if (!savedVideos.some(m => m.id === id)) setSavedVideos(prev => [...prev, movie]);
        dispatch(removeFromSearchResults(id));

        const categories = ["popular", "upcoming", "nowPlaying", "topRated", "loadMore", "watched", "deleted", "myList"];
        categories.forEach(cat => {
            if (["watched", "deleted"].includes(cat)) {
                if (cat === "watched") setWatchedVideos(prev => prev.filter(m => m.id !== id));
                if (cat === "deleted") setDeletedVideos(prev => prev.filter(m => m.id !== id));
            } else {
                dispatch(removeMovieFromCategory({ category: cat, movieId: id }));
            }
        });
    };

    const handleRewatch = (movie) => {
        setDeletedVideos(prev => prev.filter(m => m.id !== movie.id));
        setWatchedVideos(prev => [...prev, movie]);
    };

    const handleWatch = (movie) => {
        const { id } = movie;

        setSavedVideos(prev => prev.filter(m => m.id !== id));
        if (activeTab === "saved") setSavedVideos(prev => [...prev]); // re-render
        setWatchedVideos(prev => prev.some(m => m.id === id) ? prev : [...prev, movie]);
        setDeletedVideos(prev => prev.filter(m => m.id !== id));

        const categories = ["popular", "upcoming", "nowPlaying", "topRated", "loadMore"];
        categories.forEach(cat => dispatch(removeMovieFromCategory({ category: cat, movieId: id })));

        if (searchTerm.trim()) dispatch(removeFromSearchResults(id));
    };

    // Get current data to display
    const getCurrentData = () => {
        let data;

        if (isSearching) {
            data = categorySearchResults;
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
                case "loadMore": data = loadMore.movies || []; break;
                default: data = [];
            }

            if (!["deleted", "saved", "watched"].includes(activeTab)) {
                data = data.filter(
                    m => !deletedVideos.some(d => d.id === m.id) &&
                        !savedVideos.some(s => s.id === m.id) &&
                        !watchedVideos.some(w => w.id === m.id)
                );
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
        handleSave,
        handleRestore,
        handleWatch
    };
}
