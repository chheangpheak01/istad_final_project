export default function Sidebar({
    currentDataLength,
    savedVideos,
    deletedVideos,
    watchedVideos,
    activeTab,
    onStatClick,
    onSignOut,
}) {
    return (
        <aside className="w-80 bg-white shadow-lg rounded-r-2xl flex flex-col justify-between p-6" aria-label="Sidebar with dashboard stats">
            <div className="space-y-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Dashboard Info</h2>

                <ul className="flex-1 flex flex-col justify-start space-y-4">
                    <li
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between bg-amber-100 rounded-2xl p-4 shadow cursor-pointer hover:bg-amber-200 transform hover:scale-105 transition-all duration-300"
                        onClick={() => onStatClick("displayed")}
                    >
                        <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                            <i className="fas fa-film text-amber-600 text-xl" aria-hidden="true"></i>
                            <span>Displayed</span>
                        </span>
                        <span className="font-bold text-gray-900 text-lg">{currentDataLength}</span>
                    </li>

                    <li
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between bg-blue-100 rounded-2xl p-4 shadow cursor-pointer hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
                        onClick={() => onStatClick("saved")}
                    >
                        <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                            <i className="fas fa-bookmark text-blue-600 text-xl" aria-hidden="true"></i>
                            <span>Saved</span>
                        </span>
                        <span className="font-bold text-gray-900 text-lg">{savedVideos.length}</span>
                    </li>

                    <li
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between bg-red-100 rounded-2xl p-4 shadow cursor-pointer hover:bg-red-200 transform hover:scale-105 transition-all duration-300"
                        onClick={() => onStatClick("deleted")}
                    >
                        <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                            <i className="fas fa-trash text-red-600 text-xl" aria-hidden="true"></i>
                            <span>Deleted</span>
                        </span>
                        <span className="font-bold text-gray-900 text-lg">{deletedVideos.length}</span>
                    </li>

                    <li
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between bg-green-100 rounded-2xl p-4 shadow cursor-pointer hover:bg-green-200 transform hover:scale-105 transition-all duration-300"
                        onClick={() => onStatClick("watched")}
                    >
                        <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                            <i className="fas fa-play text-green-600 text-xl" aria-hidden="true"></i>
                            <span>Watched</span>
                        </span>
                        <span className="font-bold text-gray-900 text-lg">{watchedVideos.length}</span>
                    </li>

                    <li
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between bg-gray-100 rounded-2xl p-4 shadow cursor-pointer hover:bg-gray-200 transform hover:scale-105 transition-all duration-300"
                        onClick={() => onStatClick(`Category: ${activeTab}`)}
                    >
                        <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                            <i className="fas fa-list text-gray-600 text-xl" aria-hidden="true"></i>
                            <span>Category</span>
                        </span>
                        <span className="capitalize font-bold text-gray-900 text-lg">{activeTab}</span>
                    </li>
                </ul>

                <button
                    type="button"
                    className="w-full bg-red-500 text-white py-3 rounded-2xl hover:bg-red-600 cursor-pointer transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={onSignOut}
                >
                    <i className="fas fa-sign-out-alt text-lg" aria-hidden="true"></i>
                    <span className="text-lg font-semibold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
