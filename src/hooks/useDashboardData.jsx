import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    loadMoreMovies,
    searchMovies,
} from "../redux/movies/createAction";

export function useDashboardData() {
    const { popular, nowPlaying, upcoming, topRated, loadMore, searchResults } =
        useSelector((state) => state.movie);

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [savedVideos, setSavedVideos] = useState(() => {
        const stored = localStorage.getItem("savedVideos");
        return stored ? JSON.parse(stored) : [];
    });
    const [deletedVideos, setDeletedVideos] = useState([]);
    const [watchedVideos, setWatchedVideos] = useState(() => {
        const stored = localStorage.getItem("watchedVideos");
        return stored ? JSON.parse(stored) : [];
    });

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Persist saved and watched to localStorage
    useEffect(() => {
        localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
    }, [watchedVideos]);

    useEffect(() => {
        localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
    }, [savedVideos]);

    // Fetch movies initially
    useEffect(() => {
        dispatch(fetchPopularMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchUpcomingMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(loadMoreMovies());
    }, [dispatch]);

    // Window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Searching
    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            setIsSearching(true);
            setIsLoading(true);
            dispatch(searchMovies(searchTerm)).finally(() => setIsLoading(false));
        } else {
            setIsSearching(false);
        }
    }, [searchTerm, dispatch]);

    const getCurrentData = () => {
        if (isSearching) return searchResults.movies || [];
        switch (activeTab) {
            case "nowPlaying":
                return nowPlaying.movies || [];
            case "upcoming":
                return upcoming.movies || [];
            case "topRated":
                return topRated.movies || [];
            case "loadMoreMovies":
                return loadMore.movies || [];
            case "watched":
                return watchedVideos;
            case "saved":
                return savedVideos;
            default:
                return popular.movies || [];
        }
    };

    const currentData = getCurrentData();

    return {
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        isSearching,
        isLoading,
        savedVideos,
        setSavedVideos,
        deletedVideos,
        setDeletedVideos,
        watchedVideos,
        setWatchedVideos,
        currentData,
        windowWidth,
    };
}
