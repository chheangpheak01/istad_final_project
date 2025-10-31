export default function ActionButtons({ row, onWatch, onSave, onDelete, onOpenMovieDetail }) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                onClick={() => {
                    onWatch && onWatch(row);
                    onOpenMovieDetail && onOpenMovieDetail(row);
                }}
            >
                <i className="fas fa-play"></i>
                <span>Watch</span>
            </button>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                onClick={() => onSave && onSave(row)}
            >
                <i className="fas fa-bookmark"></i>
                <span>Save</span>
            </button>

            <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                onClick={() => onDelete && onDelete(row)}
            >
                <i className="fas fa-trash"></i>
                <span>Delete</span>
            </button>
        </div>
    );
}
