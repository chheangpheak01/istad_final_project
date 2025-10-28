export function SearchHeader({ query, movies }) {
    return (
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movies.length > 0
                    ? `Search Results for "${query}"`
                    : `No Results for "${query}"`}
            </h1>
            {movies.length > 0 ? (
                <p className="text-lg text-gray-300">
                    Found {movies.length} {movies.length === 1 ? "movie" : "movies"} matching your query.
                </p>
            ) : (
                <p className="text-lg text-gray-400">
                    No movies found. Try a different keyword.
                </p>
            )}
        </header>
    );
}