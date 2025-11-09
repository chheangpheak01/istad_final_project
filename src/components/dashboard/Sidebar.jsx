// export default function Sidebar({
//     currentDataLength,
//     savedVideos,
//     deletedVideos,
//     watchedVideos,
//     activeTab,
//     onStatClick,
//     onSignOut,
// }) {
//     return (
//         <aside
//             className="w-80 bg-white shadow-lg rounded-r-2xl flex flex-col justify-between p-6"
//             aria-label="Sidebar with dashboard stats"
//         >
//             <div className="space-y-6 flex flex-col h-full">
//                 <header className="text-center mb-4">
//                     <h2 className="text-2xl font-bold text-gray-800">Dashboard Info</h2>
//                 </header>

//                 <ul className="flex-1 flex flex-col justify-start space-y-4">
//                     <li className="flex items-center justify-between bg-amber-100 rounded-2xl p-4 shadow">
//                         <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
//                             <i className="fas fa-film text-amber-600 text-xl" aria-hidden="true"></i>
//                             <span>Displayed</span>
//                         </span>
//                         <span className="font-bold text-gray-900 text-lg">{currentDataLength}</span>
//                     </li>

//                     <li>
//                         <button
//                             type="button"
//                             className="w-full flex items-center justify-between bg-blue-100 rounded-2xl p-4 shadow hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
//                             onClick={() => onStatClick("saved")}
//                         >
//                             <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
//                                 <i className="fas fa-bookmark text-blue-600 text-xl" aria-hidden="true"></i>
//                                 <span>Saved</span>
//                             </span>
//                             <span className="font-bold text-gray-900 text-lg">{savedVideos.length}</span>
//                         </button>
//                     </li>

//                     <li>
//                         <button
//                             type="button"
//                             className="w-full flex items-center justify-between bg-red-100 rounded-2xl p-4 shadow hover:bg-red-200 transform hover:scale-105 transition-all duration-300"
//                             onClick={() => onStatClick("deleted")}
//                         >
//                             <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
//                                 <i className="fas fa-trash text-red-600 text-xl" aria-hidden="true"></i>
//                                 <span>Deleted</span>
//                             </span>
//                             <span className="font-bold text-gray-900 text-lg">{deletedVideos.length}</span>
//                         </button>
//                     </li>

//                     <li>
//                         <button
//                             type="button"
//                             className="w-full flex items-center justify-between bg-green-100 rounded-2xl p-4 shadow hover:bg-green-200 transform hover:scale-105 transition-all duration-300"
//                             onClick={() => onStatClick("watched")}
//                         >
//                             <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
//                                 <i className="fas fa-play text-green-600 text-xl" aria-hidden="true"></i>
//                                 <span>Watched</span>
//                             </span>
//                             <span className="font-bold text-gray-900 text-lg">{watchedVideos.length}</span>
//                         </button>
//                     </li>

//                     <li className="flex items-center justify-between bg-gray-100 rounded-2xl p-4 shadow">
//                         <span className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
//                             <i className="fas fa-list text-gray-600 text-xl" aria-hidden="true"></i>
//                             <span>Category</span>
//                         </span>
//                         <span className="capitalize font-bold text-lg text-blue-950">{activeTab}</span>
//                     </li>
//                 </ul>

//                 <button
//                     type="button"
//                     className="w-full bg-red-500 text-white py-3 rounded-2xl hover:bg-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
//                     onClick={onSignOut}
//                 >
//                     <i className="fas fa-sign-out-alt text-lg" aria-hidden="true"></i>
//                     <span className="text-lg font-semibold">Sign Out</span>
//                 </button>
//             </div>
//         </aside>
//     );
// }
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
        <aside
            className="w-full sm:w-80 bg-white shadow-lg rounded-b-2xl sm:rounded-r-2xl flex flex-col justify-between 
                       p-4 sm:p-6 overflow-y-auto mt-16 sm:mt-0 z-10 relative"
            aria-label="Sidebar with dashboard stats"
        >
            <div className="space-y-6 flex flex-col h-full">
                <header className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard Info</h2>
                </header>

                <ul className="flex-1 flex flex-col justify-start space-y-3 sm:space-y-4">
                    <li className="flex items-center justify-between bg-amber-100 rounded-2xl p-3 sm:p-4 shadow">
                        <span className="flex items-center space-x-2 sm:space-x-3 text-gray-800 font-semibold text-base sm:text-lg">
                            <i className="fas fa-film text-amber-600 text-lg sm:text-xl" aria-hidden="true"></i>
                            <span>Displayed</span>
                        </span>
                        <span className="font-bold text-gray-900 text-base sm:text-lg">{currentDataLength}</span>
                    </li>

                    <li>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between bg-blue-100 rounded-2xl p-3 sm:p-4 shadow hover:bg-blue-200 transform hover:scale-105 transition-all duration-300"
                            onClick={() => onStatClick('saved')}
                        >
                            <span className="flex items-center space-x-2 sm:space-x-3 text-gray-800 font-semibold text-base sm:text-lg">
                                <i className="fas fa-bookmark text-blue-600 text-lg sm:text-xl" aria-hidden="true"></i>
                                <span>Saved</span>
                            </span>
                            <span className="font-bold text-gray-900 text-base sm:text-lg">{savedVideos.length}</span>
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between bg-red-100 rounded-2xl p-3 sm:p-4 shadow hover:bg-red-200 transform hover:scale-105 transition-all duration-300"
                            onClick={() => onStatClick('deleted')}
                        >
                            <span className="flex items-center space-x-2 sm:space-x-3 text-gray-800 font-semibold text-base sm:text-lg">
                                <i className="fas fa-trash text-red-600 text-lg sm:text-xl" aria-hidden="true"></i>
                                <span>Deleted</span>
                            </span>
                            <span className="font-bold text-gray-900 text-base sm:text-lg">{deletedVideos.length}</span>
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between bg-green-100 rounded-2xl p-3 sm:p-4 shadow hover:bg-green-200 transform hover:scale-105 transition-all duration-300"
                            onClick={() => onStatClick('watched')}
                        >
                            <span className="flex items-center space-x-2 sm:space-x-3 text-gray-800 font-semibold text-base sm:text-lg">
                                <i className="fas fa-play text-green-600 text-lg sm:text-xl" aria-hidden="true"></i>
                                <span>Watched</span>
                            </span>
                            <span className="font-bold text-gray-900 text-base sm:text-lg">{watchedVideos.length}</span>
                        </button>
                    </li>

                    <li className="flex items-center justify-between bg-gray-100 rounded-2xl p-3 sm:p-4 shadow">
                        <span className="flex items-center space-x-2 sm:space-x-3 text-gray-800 font-semibold text-base sm:text-lg">
                            <i className="fas fa-list text-gray-600 text-lg sm:text-xl" aria-hidden="true"></i>
                            <span>Category</span>
                        </span>
                        <span className="capitalize font-bold text-base sm:text-lg text-blue-950">{activeTab}</span>
                    </li>
                </ul>

                <button
                    type="button"
                    className="w-full bg-red-500 text-white py-2.5 sm:py-3 rounded-2xl hover:bg-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={onSignOut}
                >
                    <i className="fas fa-sign-out-alt text-base sm:text-lg" aria-hidden="true"></i>
                    <span className="text-base sm:text-lg font-semibold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
