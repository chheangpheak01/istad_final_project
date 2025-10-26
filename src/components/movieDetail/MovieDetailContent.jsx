import { PlayIcon, StarIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { IMAGE_BASE_URL } from "../../services/aip";

export function MovieDetailContent({ movie, movieDetail, trailerVideo, onWatchTrailer }) {

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <article className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
            <figure className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-start">
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={`Poster for ${movie.title}`}
                    className="w-64 sm:w-72 md:w-80 h-auto object-cover rounded-xl shadow-2xl border border-gray-600" />
                <figcaption className="sr-only">
                    Movie poster for {movie.title}
                </figcaption>
            </figure>
            <div className="flex-1 space-y-8 text-white">
                <header>
                    <h1 id="movie-detail-title" className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                        {movie.title}
                    </h1>
                </header>
                <section aria-labelledby="user-score-heading">
                    <h2 id="user-score-heading" className="text-lg font-semibold text-gray-300 uppercase tracking-widest">USER SCORE</h2>
                    <div className="flex items-center gap-3">
                        <StarIcon className="w-8 h-8 text-yellow-400" aria-hidden="true" />
                        <span className="text-3xl font-bold text-white">{movie.vote_average?.toFixed(1)}/10</span>
                    </div>
                </section>
                <nav aria-label="Movie actions">
                    <button
                        onClick={onWatchTrailer}
                        disabled={!trailerVideo}
                        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 sm:px-10 py-4 rounded-lg font-bold text-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                        aria-label="Watch movie trailer">
                        <PlayIcon className="w-6 h-6" aria-hidden="true" />
                        {trailerVideo ? "Play Trailer" : "Trailer Not Available"}
                    </button>
                </nav>

                <hr className="border-t border-gray-600 pt-6" />
                <section aria-labelledby="overview-heading">
                    <h2 id="overview-heading" className="text-2xl font-bold text-white mb-2">OVERVIEW</h2>
                    <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
                        {movie.overview || "No overview available."}
                    </p>
                </section>
                <section aria-label="Movie metadata">
                    <div className="flex flex-wrap items-center gap-6 text-gray-300 text-base">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                            <time dateTime={movie.release_date}>
                                {new Date(movie.release_date).getFullYear()}
                            </time>
                        </div>
                        <span aria-hidden="true">•</span>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5" aria-hidden="true" />
                            <span>{movieDetail.data?.runtime ? formatRuntime(movieDetail.data.runtime) : 'N/A'}</span>
                        </div>
                    </div>
                </section>
                <section aria-labelledby="movie-details-heading">
                    <div className="bg-gray-800/60 rounded-lg p-6 border border-gray-600 max-w-4xl">
                        <h2 id="movie-details-heading" className="text-xl font-bold text-white mb-4">MOVIE DETAILS</h2>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-base">
                            <div>
                                <dt className="text-gray-400 font-semibold text-sm uppercase tracking-wide mb-2">BUDGET</dt>
                                <dd className="text-white font-semibold text-lg">{formatCurrency(movieDetail.data?.budget)}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 font-semibold text-sm uppercase tracking-wide mb-2">REVENUE</dt>
                                <dd className="text-white font-semibold text-lg">{formatCurrency(movieDetail.data?.revenue)}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 font-semibold text-sm uppercase tracking-wide mb-2">STATUS</dt>
                                <dd className="text-white font-semibold text-lg">{movieDetail.data?.status || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 font-semibold text-sm uppercase tracking-wide mb-2">LANGUAGE</dt>
                                <dd className="text-white font-semibold text-lg uppercase">{movieDetail.data?.original_language || 'N/A'}</dd>
                            </div>
                        </dl>
                    </div>
                </section>
                {movieDetail.data?.genres && movieDetail.data.genres.length > 0 && (
                    <section aria-labelledby="genres-heading">
                        <h2 id="genres-heading" className="text-xl font-bold text-white mb-3">GENRES</h2>
                        <ul className="flex flex-wrap gap-2" role="list">
                            {movieDetail.data.genres.map(genre => (
                                <li key={genre.id}>
                                    <span className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-500">
                                        {genre.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </article>
    );
}