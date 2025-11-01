export function SearchBar({
    searchOpen,
    searchQuery,
    onSearchChange,
    onSearchSubmit,
    searchRef
}) {
    if (!searchOpen) return null;
    return (
        <form ref={searchRef} className="w-full bg-slate-800 p-3" onSubmit={onSearchSubmit}>
            <div className="container mx-auto flex gap-2">
                <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="Search for movies..."
                    className="flex-1 rounded-md py-2 px-3 text-white bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300" />
                <button
                    type="submit"
                    className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors duration-300 cursor-pointer">
                    Search
                </button>
            </div>
        </form>
    );
}