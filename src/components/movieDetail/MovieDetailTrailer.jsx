import { forwardRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const MovieDetailTrailer = forwardRef(({ movie, trailerVideo, onCloseTrailer }, ref) => {
    return (
        <section ref={ref} className="mb-12 bg-black/80 rounded-xl p-6 border border-gray-600"
            aria-labelledby="trailer-heading">
            <header className="flex justify-between items-center mb-6">
                <h2 id="trailer-heading" className="text-2xl font-bold text-white">
                    {movie.title} - Official Trailer
                </h2>
                <button
                    onClick={onCloseTrailer}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                    aria-label="Close trailer">
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
            </header>
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    aria-label={`YouTube video player for ${movie.title} trailer`} />
            </div>
        </section>
    );
});

MovieDetailTrailer.displayName = 'MovieDetailTrailer';