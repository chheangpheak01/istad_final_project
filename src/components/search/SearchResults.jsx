import MovieCard from "../MovieCard";

export function SearchResults({ movies, contentReady, onMovieClick }) {
    return (
        <section
            aria-label="Search results list"
            className={contentReady ? "opacity-100 transition-opacity duration-300" : "opacity-0"}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 place-items-center">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={onMovieClick}/>
                ))}
            </div>
        </section>
    );
}