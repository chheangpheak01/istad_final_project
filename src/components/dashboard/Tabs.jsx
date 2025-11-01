export default function Tabs({ activeTab, setActiveTab, isSearching }) {
    const tabs = [
        { key: "popular", icon: "fa-fire", label: "Popular" },
        { key: "upcoming", icon: "fa-calendar-alt", label: "Upcoming" },
        { key: "topRated", icon: "fa-star", label: "Top Rated" },
        { key: "nowPlaying", icon: "fa-play-circle", label: "Now Playing" },
        { key: "loadMoreMovies", icon: "fa-ellipsis-h", label: "Load More" },
    ];

    const buttonClasses = (isActive) =>
        `px-5 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform cursor-pointer border ${isActive
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105 border-amber-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-amber-50 hover:border-amber-200 hover:scale-105"
        } hover:shadow-md active:scale-95 flex items-center space-x-2`;

    return (
        <section className="flex justify-center space-x-4 mb-6 flex-wrap gap-3">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => {
                        setActiveTab(tab.key);
                    }}
                    className={buttonClasses(activeTab === tab.key && !isSearching)}
                >
                    <i className={`fas ${tab.icon} text-sm`}></i>
                    <span>{tab.label}</span>
                </button>
            ))}
        </section>
    );
}
