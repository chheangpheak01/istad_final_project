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
    addMovieToList,
} from "../redux/movies/createAction";
import { removeFromSearchResults, removeMovieFromCategory } from "../redux/movies/MovieSlice";

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
        const movieWithCategory = { ...movie, originalCategory: activeTab }; // Track original category

        // Remove movie from search results immediately if searching
        if (searchTerm.trim()) {
            dispatch(removeFromSearchResults(id));
        }

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

        // Remove from deletedVideos locally
        setDeletedVideos(prev => prev.filter(m => m.id !== id));

        // Restore locally
        if (originalCategory === "saved") {
            setSavedVideos(prev => [...prev, movie]);
        } else if (originalCategory === "watched") {
            setWatchedVideos(prev => [...prev, movie]);
        }

        // Restore to TMDB list if it came from myList
        if (originalCategory === "myList" && moviesInList?.listId) {
            dispatch(addMovieToList({ movieId: id, listId: moviesInList.listId }));
        }
    };


    // Save movie
    const handleSave = (movie) => {
        const { id } = movie;

        // Avoid duplicates in savedVideos
        if (!savedVideos.some(m => m.id === id)) {
            setSavedVideos(prev => [...prev, movie]);
        }

        // Remove from search results immediately
        dispatch(removeFromSearchResults(id));

        // Remove from all categories so it disappears immediately everywhere
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


    // Rewatch movie from deleted → watched
    const handleRewatch = (movie) => {
        setDeletedVideos((prev) => prev.filter((m) => m.id !== movie.id));
        setWatchedVideos((prev) => [...prev, movie]);
    };


    // Updated getCurrentData to filter out saved videos as well
    const getCurrentData = () => {
        let data;

        if (isSearching) {
            data = (searchResults.movies || []).filter(m => !savedVideos.some(s => s.id === m.id));
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

            // Filter out deleted videos and saved videos from all categories except Saved, Watched, Deleted
            if (!["deleted", "saved", "watched"].includes(activeTab)) {
                data = data.filter(
                    (m) =>
                        !deletedVideos.some(d => d.id === m.id) &&
                        !savedVideos.some(s => s.id === m.id)
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
        handleRestore
    };
}