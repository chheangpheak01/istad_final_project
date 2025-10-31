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

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-50 mt-15 flex">
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
                onSignOut={handleSignOut} // updated here
            />

            <div className="flex-1 p-6">
                <main className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                            Istad Movie
                        </h1>
                    </div>

                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} isSearching={isSearching} />

                    <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <MovieTable
                        data={currentData}
                        windowWidth={windowWidth}
                        onWatch={(row) => {
                            setWatchedVideos(prev => {
                                if (prev.some(m => m.id === row.id)) return prev;
                                return [...prev, row];
                            });
                            setSelectedMovie(row);
                            setIsMovieDetailOpen(true);
                        }}
                        onSave={(row) => {
                            setSavedVideos(prev => {
                                if (prev.some(m => m.id === row.id)) return prev;
                                return [...prev, row];
                            });
                        }}
                        onDelete={(row) => {
                            setDeletedVideos(prev => {
                                if (prev.some(m => m.id === row.id)) return prev;
                                return [...prev, row];
                            });
                        }}
                        onOpenMovieDetail={(row) => {
                            setSelectedMovie(row);
                            setIsMovieDetailOpen(true);
                        }}
                        isLoading={isLoading}
                    />

                    {isMovieDetailOpen && selectedMovie && (
                        <MovieDetail
                            movie={selectedMovie}
                            isOpen={isMovieDetailOpen}
                            onClose={() => setIsMovieDetailOpen(false)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
