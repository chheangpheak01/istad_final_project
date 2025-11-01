import Sidebar from "../components/dashboard/Sidebar";
import Tabs from "../components/dashboard/Tabs";
import SearchBox from "../components/dashboard/SearchBox";
import MovieTable from "../components/dashboard/MovieTable";
import { useDashboardData } from "../hooks/useDashboardData";
import { useState } from "react";
import { MovieDetail } from "../components/movieDetail/MovieDetail";

export function Dashboard() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);

    const {
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
    } = useDashboardData();

    const handleSignOut = () => {
        // Remove token & current user
        localStorage.removeItem("moviehubToken");
        localStorage.removeItem("currentUser");
        // Redirect to SignIn page
        window.location.href = "/sign-in";
    };

    const getEmptyMessage = () => {
        switch (activeTab) {
            case "saved":
                return "💾 No saved movies yet. Try saving one!";
            case "deleted":
                return "🗑️ No deleted movies yet.";
            case "watched":
                return "👀 You haven’t watched any movies yet.";
            default:
                return "🎬 No movies found for your search.";
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-50 mt-15 flex">
            <aside>
                <Sidebar
                    currentDataLength={currentData.length}
                    savedVideos={savedVideos}
                    deletedVideos={deletedVideos}
                    watchedVideos={watchedVideos}
                    activeTab={activeTab}
                    onStatClick={(stat) => {
                        if (stat === "watched") setActiveTab("watched");
                        else if (stat === "saved") setActiveTab("saved");
                        else if (stat === "deleted") setActiveTab("deleted");
                        else if (stat === "displayed") setActiveTab("popular");
                        else alert(`Clicked ${stat}!`);
                    }}
                    onSignOut={handleSignOut}
                />
            </aside>

            <main className="flex-1 p-6">
                <section className="w-full max-w-6xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                            Istad Movie
                        </h1>
                    </header>

                    <nav aria-label="Movie categories">
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} isSearching={isSearching} />
                    </nav>

                    <section aria-label="Search movies">
                        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </section>

                    <section aria-label="Movie results">
                        <MovieTable
                            data={currentData}
                            windowWidth={windowWidth}
                            onWatch={(row) => {
                                setWatchedVideos((prev) => {
                                    if (prev.some((m) => m.id === row.id)) return prev;
                                    return [...prev, row];
                                });
                                setSelectedMovie(row);
                                setIsMovieDetailOpen(true);
                            }}
                            onSave={(row) => {
                                setSavedVideos((prev) => {
                                    if (prev.some((m) => m.id === row.id)) return prev;
                                    return [...prev, row];
                                });
                            }}
                            onDelete={(row) => {
                                setDeletedVideos((prev) => {
                                    if (prev.some((m) => m.id === row.id)) return prev;
                                    return [...prev, row];
                                });
                            }}
                            onOpenMovieDetail={(row) => {
                                setSelectedMovie(row);
                                setIsMovieDetailOpen(true);
                            }}
                            isLoading={isLoading}
                            emptyMessage={getEmptyMessage()} 
                        />
                    </section>

                    {isMovieDetailOpen && selectedMovie && (
                        <MovieDetail
                            movie={selectedMovie}
                            isOpen={isMovieDetailOpen}
                            onClose={() => setIsMovieDetailOpen(false)}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}
