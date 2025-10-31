export default function SearchBox({ searchTerm, setSearchTerm }) {
    return (
        <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    type="text"
                    placeholder="Search by movie title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                />
            </div>
        </div>
    );
}
