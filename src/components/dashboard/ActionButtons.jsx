export default function ActionButtons({
    row,
    onWatch,
    onSave,
    onDelete,
    onRestore,
    onOpenMovieDetail,
    activeTab,
}) {
    // Determine which buttons to show based on activeTab
    const buttonsToShow = [];

    if (activeTab === "saved") {
        // Saved category: Watch + Delete
        buttonsToShow.push(
            { label: "Watch", onClick: () => { onWatch?.(row); onOpenMovieDetail?.(row); }, bg: "bg-green-600", icon: "fa-play" },
            { label: "Delete", onClick: () => onDelete?.(row), bg: "bg-red-600", icon: "fa-trash" }
        );
    } else if (activeTab === "deleted") {
        // Deleted category: Watch + Save + Restore
        buttonsToShow.push(
            { label: "Watch", onClick: () => { onWatch?.(row); onOpenMovieDetail?.(row); }, bg: "bg-green-600", icon: "fa-play" },
            { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
            { label: "Restore", onClick: () => onRestore?.(row), bg: "bg-amber-500", icon: "fa-undo" }
        );
    } else if (activeTab === "watched") {
        // Watched category: Save + Delete
        buttonsToShow.push(
            { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
            { label: "Delete", onClick: () => onDelete?.(row), bg: "bg-red-600", icon: "fa-trash" }
        );
    } else {
        // All other categories (popular, upcoming, topRated, nowPlaying, loadMore): Watch + Save + Delete
        buttonsToShow.push(
            { label: "Watch", onClick: () => { onWatch?.(row); onOpenMovieDetail?.(row); }, bg: "bg-green-600", icon: "fa-play" },
            { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
            { label: "Delete", onClick: () => onDelete?.(row), bg: "bg-red-600", icon: "fa-trash" }
        );
    }

    return (
        <nav className="flex flex-wrap gap-2" aria-label="Movie action buttons">
            {buttonsToShow.map((btn, index) => (
                <button
                    key={`${row.id}-${btn.label}-${index}`} // unique key for each button
                    type="button"
                    className={`${btn.bg} text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 cursor-pointer flex items-center space-x-1`}
                    onClick={btn.onClick}
                >
                    <i className={`fas ${btn.icon}`} aria-hidden="true"></i>
                    <span>{btn.label}</span>
                </button>
            ))}
        </nav>
    );
}
