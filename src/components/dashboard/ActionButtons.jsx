export default function ActionButtons({
    row,
    onWatch,
    onSave,
    onDelete,
    onRestore,
    onOpenMovieDetail,
    activeTab,
}) {
    return (
        <nav className="flex flex-wrap gap-2" aria-label="Movie action buttons">
            {activeTab === "deleted" ? (
                <>
                    {/* Watch button */}
                    <button
                        type="button"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => {
                            onWatch && onWatch(row);
                            onOpenMovieDetail && onOpenMovieDetail(row);
                        }}
                    >
                        <i className="fas fa-play" aria-hidden="true"></i>
                        <span>Watch</span>
                    </button>

                    {/* Restore button */}
                    <button
                        type="button"
                        className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => onRestore && onRestore(row)}
                    >
                        <i className="fas fa-undo" aria-hidden="true"></i>
                        <span>Restore</span>
                    </button>

                    {/* Optional Save button */}
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => onSave && onSave(row)}
                    >
                        <i className="fas fa-bookmark" aria-hidden="true"></i>
                        <span>Save</span>
                    </button>
                </>
            ) : (
                <>
                    {/* Watch button */}
                    <button
                        type="button"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => {
                            onWatch && onWatch(row);
                            onOpenMovieDetail && onOpenMovieDetail(row);
                        }}
                    >
                        <i className="fas fa-play" aria-hidden="true"></i>
                        <span>Watch</span>
                    </button>

                    {/* Save button */}
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => onSave && onSave(row)}
                    >
                        <i className="fas fa-bookmark" aria-hidden="true"></i>
                        <span>Save</span>
                    </button>

                    {/* Delete button */}
                    <button
                        type="button"
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                        onClick={() => onDelete && onDelete(row)}
                    >
                        <i className="fas fa-trash" aria-hidden="true"></i>
                        <span>Delete</span>
                    </button>
                </>
            )}
        </nav>
    );
}