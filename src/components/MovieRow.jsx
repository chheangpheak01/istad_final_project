import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, visible, onMovieClick }) {
  return (
    <section className="px-8 md:px-16 lg:px-24 mb-12 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)" }}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}>
      <header>
        <h2 id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
          className="text-2xl md:text-3xl font-bold text-white mb-6">
          {title}
        </h2>
      </header>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
        role="list"
        aria-label={`List of ${title} movies`}>
        {movies.slice(0, 6).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
      {movies.length > 6 && (
        <footer className="mt-4 flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            aria-label={`View more ${title} movies`}>
            View More
          </button>
        </footer>
      )}
    </section>
  );
}