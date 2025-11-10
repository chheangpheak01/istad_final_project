export default function Tabs({ activeTab, setActiveTab }) {
    const tabs = [
        { key: "popular", icon: "fa-fire", label: "Popular" },
        { key: "upcoming", icon: "fa-calendar-alt", label: "Upcoming" },
        { key: "topRated", icon: "fa-star", label: "Top Rated" },
        { key: "nowPlaying", icon: "fa-play-circle", label: "Now Playing" },
        { key: "loadMore", icon: "fa-ellipsis-h", label: "Load More" },
    ];

    const buttonClasses = (isActive) =>
        `px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform cursor-pointer border flex items-center space-x-2 text-sm sm:text-base ${isActive
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105 border-amber-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-amber-50 hover:border-amber-200 hover:scale-105 hover:shadow-md active:scale-95"
        }`;

    return (
        <nav
            className="flex justify-center flex-wrap gap-3 mb-6"
            role="tablist"
            aria-label="Movie categories"
        >
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    tabIndex={activeTab === tab.key ? 0 : -1}
                    onClick={() => setActiveTab(tab.key)}
                    className={buttonClasses(activeTab === tab.key)}
                >
                    <i className={`fas ${tab.icon} text-sm sm:text-base`} aria-hidden="true"></i>
                    <span>{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
