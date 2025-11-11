// import Sidebar from "../components/dashboard/Sidebar";
// import Tabs from "../components/dashboard/Tabs";
// import SearchBox from "../components/dashboard/SearchBox";
// import MovieTable from "../components/dashboard/MovieTable";
// import { useDashboardData } from "../hooks/useDashboardData";
// import { useEffect, useRef, useState } from "react";
// import { MovieDetail } from "../components/movieDetail/MovieDetail";

// export function Dashboard() {
//     const {
//         activeTab,
//         setActiveTab,
//         searchTerm,
//         setSearchTerm,
//         isLoading,
//         savedVideos,
//         deletedVideos,
//         watchedVideos,
//         currentData,
//         windowWidth,
//         handleDelete,
//         handleRewatch,
//         handleSave,
//         handleRestore
//     } = useDashboardData();

//     const [selectedMovie, setSelectedMovie] = useState(null);
//     const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);

//     const dashboardRef = useRef(null);

//     useEffect(() => {
//         if (dashboardRef.current) {
//             const yOffset = -65;
//             const element = dashboardRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
//             window.scrollTo({ top: element, behavior: "smooth" });
//         }
//     }, [activeTab]);

//     const handleSignOut = () => {
//         localStorage.removeItem("moviehubToken");
//         localStorage.removeItem("currentUser");
//         window.location.href = "/sign-in";
//     };

//     const getEmptyMessage = () => {
//         switch (activeTab) {
//             case "saved":
//                 return "💾 No saved movies yet. Try saving one!";
//             case "deleted":
//                 return "🗑️ No deleted movies yet.";
//             case "watched":
//                 return "👀 You haven’t watched any movies yet.";
//             case "loadMore":
//                 return "🎬 No more movies to load.";
//             default:
//                 return "🎬 No movies found for your search.";
//         }
//     };

//     return (
//         <div className="min-h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col md:flex-row">
//             <aside className="w-full md:w-80 md:flex-shrink-0">
//                 <Sidebar
//                     currentDataLength={currentData.length}
//                     savedVideos={savedVideos}
//                     deletedVideos={deletedVideos}
//                     watchedVideos={watchedVideos}
//                     activeTab={activeTab}
//                     onStatClick={(tab) => setActiveTab(tab)}
//                     onSignOut={handleSignOut}
//                 />
//             </aside>
//             <main
//                 ref={dashboardRef}
//                 className="flex-1 p-4 sm:p-6 pt-8 sm:pt-12 md:pt-16 lg:pt-20"
//             >
//                 <section className="w-full max-w-6xl mx-auto">
//                     <header className="text-center mb-6 sm:mb-8">
//                         <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 mt-0 sm:mt-2">
//                             Istad Movie
//                         </h1>
//                     </header>

//                     <nav aria-label="Movie categories" className="overflow-x-auto">
//                         <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//                     </nav>

//                     <section aria-label="Search movies" className="mb-4 sm:mb-6">
//                         <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//                     </section>

//                     <section aria-label="Movie results" className="overflow-x-auto">
//                         <MovieTable
//                             data={currentData}
//                             windowWidth={windowWidth}
//                             activeTab={activeTab}
//                             onWatch={(row) => {
//                                 handleRewatch(row);
//                                 setSelectedMovie(row);
//                                 setIsMovieDetailOpen(true);
//                             }}
//                             onSave={handleSave}
//                             onDelete={handleDelete}
//                             onRestore={handleRestore}
//                             isLoading={isLoading}
//                             emptyMessage={getEmptyMessage()}
//                         />
//                     </section>

//                     {isMovieDetailOpen && selectedMovie && (
//                         <MovieDetail
//                             movie={selectedMovie}
//                             isOpen={isMovieDetailOpen}
//                             onClose={() => setIsMovieDetailOpen(false)}
//                         />
//                     )}
//                 </section>
//             </main>
//         </div>
//     );
// }
import Sidebar from "../components/dashboard/Sidebar";
import Tabs from "../components/dashboard/Tabs";
import SearchBox from "../components/dashboard/SearchBox";
import MovieTable from "../components/dashboard/MovieTable";
import { useDashboardData } from "../hooks/useDashboardData";
import { useEffect, useRef, useState } from "react";
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
    } = useDashboardData();

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);

    const dashboardRef = useRef(null);

    useEffect(() => {
        if (dashboardRef.current) {
            const yOffset = -65;
            const element = dashboardRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: element, behavior: "smooth" });
        }
    }, [activeTab]);

    const handleSignOut = () => {
        localStorage.removeItem("moviehubToken");
        localStorage.removeItem("currentUser");
        window.location.assign("/sign-in");
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
        <div className="min-h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col md:flex-row">
            <aside className="w-full md:w-80 md:flex-shrink-0">
                <Sidebar
                    currentDataLength={currentData.length}
                    savedVideos={savedVideos}
                    deletedVideos={deletedVideos}
                    watchedVideos={watchedVideos}
                    activeTab={activeTab}
                    onStatClick={(tab) => setActiveTab(tab)}
                    onSignOut={handleSignOut}
                />
            </aside>
            <main
                ref={dashboardRef}
                className="flex-1 p-4 sm:p-6 pt-8 sm:pt-12 md:pt-16 lg:pt-20"
            >
                <section className="w-full max-w-6xl mx-auto">
                    <header className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 mt-0 sm:mt-2">
                            Istad Movie
                        </h1>
                    </header>

                    <nav aria-label="Movie categories" className="overflow-x-auto">
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </nav>

                    <section aria-label="Search movies" className="mb-4 sm:mb-6">
                        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </section>

                    <section aria-label="Movie results" className="overflow-x-auto">
                        <MovieTable
                            data={currentData}
                            windowWidth={windowWidth}
                            activeTab={activeTab}
                            onWatch={(row) => {
                                handleRewatch(row);
                                setSelectedMovie(row);
                                setIsMovieDetailOpen(true);
                            }}
                            onSave={handleSave}
                            onDelete={handleDelete}
                            onRestore={handleRestore}
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
