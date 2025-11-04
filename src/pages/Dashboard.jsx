import Sidebar from "../components/dashboard/Sidebar";
import Tabs from "../components/dashboard/Tabs";
import SearchBox from "../components/dashboard/SearchBox";
import MovieTable from "../components/dashboard/MovieTable";
import { useDashboardData } from "../hooks/useDashboardData";
import { useState } from "react";
import { MovieDetail } from "../components/movieDetail/MovieDetail";

export function Dashboard() {
    const {
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        isLoading,
        savedVideos,
        deletedVideos,
        watchedVideos,
        currentData,
        windowWidth,
        handleDelete,
        handleRewatch,
        handleSave,
        handleRestore
    } = useDashboardData(); // removed setSavedVideos and setWatchedVideos


    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem("moviehubToken");
        localStorage.removeItem("currentUser");
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
            case "loadMore":
                return "🎬 No more movies to load.";
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
                    onStatClick={(tab) => setActiveTab(tab)} // make sure sidebar clicks update activeTab
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
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </nav>

                    <section aria-label="Search movies" className="mb-6">
                        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </section>

                    <section aria-label="Movie results">
                        <MovieTable
                            data={currentData}
                            windowWidth={windowWidth}
                            activeTab={activeTab}
                            onWatch={(row) => {
                                handleRewatch(row);       // Adds movie to watchedVideos
                                setSelectedMovie(row);    // Opens detail modal
                                setIsMovieDetailOpen(true);
                            }}
                            onSave={(row) => handleSave(row)}  // Adds movie to savedVideos & removes from current category
                            onDelete={handleDelete}             // Deletes movie according to activeTab
                            onRewatch={handleRewatch}           // For rewatching deleted movies
                            isLoading={isLoading}
                            onRestore={handleRestore} 
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