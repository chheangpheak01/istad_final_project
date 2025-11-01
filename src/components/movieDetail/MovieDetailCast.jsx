import { UserIcon } from "@heroicons/react/24/solid";
import { IMAGE_BASE_URL } from "../../services/api";

export function MovieDetailCast({ cast }) {
    return (
        <section aria-labelledby="cast-heading" className="text-white">
            <h2 id="cast-heading" className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-3">TOP CAST</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" role="list" aria-label="Movie cast members">
                {cast.slice(0, 12).map(actor => (
                    <article key={actor.id} className="text-center group" role="listitem">
                        <figure className="mb-3">
                            {actor.profile_path ? (
                                <img
                                    src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                                    alt={`${actor.name} as ${actor.character}`}
                                    className="w-20 h-20 object-cover rounded-full mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-gray-500 group-hover:border-red-500"
                                    loading="lazy" />
                            ) : (
                                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-gray-500">
                                    <UserIcon className="w-8 h-8 text-gray-400" aria-hidden="true" />
                                </div>
                            )}
                        </figure>
                        <h3 className="text-white text-sm font-semibold truncate group-hover:text-red-400 transition-colors mb-1">
                            {actor.name}
                        </h3>
                        <p className="text-gray-400 text-xs truncate">
                            {actor.character}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}