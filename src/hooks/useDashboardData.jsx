import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSearchResults, removeMovieFromCategory } from "../redux/movies/MovieSlice";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    loadMoreMovies,
    //deleteMovie,
    addMovieToList,
} from "../redux/movies/createAction";

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

    // Helper to ensure exclusivity across saved, deleted, watched
    const addToCategory = (movie, category) => {
        const id = movie.id;

        // Remove from all categories first
        setSavedVideos(prev => prev.filter(m => m.id !== id));
        setDeletedVideos(prev => prev.filter(m => m.id !== id));
        setWatchedVideos(prev => prev.filter(m => m.id !== id));

        // Add to the target category
        if (category === "saved") setSavedVideos(prev => [...prev, movie]);
        if (category === "deleted") setDeletedVideos(prev => [...prev, movie]);
        if (category === "watched") setWatchedVideos(prev => [...prev, movie]);
    };

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
            if (["saved", "watched", "deleted"].includes(activeTab)) return matchesTitle;
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

    const handleDelete = (movie) => {
        const { id } = movie;
        const movieWithCategory = { ...movie, originalCategory: activeTab };
        if (searchTerm.trim()) dispatch(removeFromSearchResults(id));
        addToCategory(movieWithCategory, "deleted");
        const categories = ["popular", "upcoming", "nowPlaying", "topRated", "loadMore", "myList"];
        categories.forEach(cat => dispatch(removeMovieFromCategory({ category: cat, movieId: id })));
    };

    const handleRestore = (movie) => {
        const { id, originalCategory } = movie;
        setDeletedVideos(prev => prev.filter(m => m.id !== id));
        if (originalCategory === "saved") addToCategory(movie, "saved");
        else if (originalCategory === "watched") addToCategory(movie, "watched");
        else if (originalCategory === "myList" && moviesInList?.listId) {
            dispatch(addMovieToList({ movieId: id, listId: moviesInList.listId }));
        }
    };

    const handleSave = (movie) => {
        const { id } = movie;
        addToCategory(movie, "saved");
        dispatch(removeFromSearchResults(id));
        const categories = ["popular", "upcoming", "nowPlaying", "topRated", "loadMore", "myList"];
        categories.forEach(cat => dispatch(removeMovieFromCategory({ category: cat, movieId: id })));
    };

    const handleRewatch = (movie) => {
        addToCategory(movie, "watched");
    };

    const handleWatch = (movie) => {
        const { id } = movie;
        addToCategory(movie, "watched");
        const categories = ["popular", "upcoming", "nowPlaying", "topRated", "loadMore"];
        categories.forEach(cat => dispatch(removeMovieFromCategory({ category: cat, movieId: id })));
        if (searchTerm.trim()) dispatch(removeFromSearchResults(id));
        if (activeTab === "saved") setActiveTab("watched");
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
                case "saved": data = Array.from(new Map(savedVideos.map(m => [m.id, m])).values()); break;
                case "watched": data = Array.from(new Map(watchedVideos.map(m => [m.id, m])).values()); break;
                case "deleted": data = Array.from(new Map(deletedVideos.map(m => [m.id, m])).values()); break;
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
