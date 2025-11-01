import { StarIcon } from "@heroicons/react/24/solid";
import { IMAGE_BASE_URL } from "../services/api";

export default function MovieCard({ movie, onMovieClick }) {
  const handleClick = () => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  return (
    <article className="w-44 md:w-52 lg:w-56 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer bg-gray-800 p-2"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}>

      <figure className="relative">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={`Poster for ${movie.title}`}
          className="w-full h-64 object-cover rounded-md"/>
      </figure>
      <div className="p-3 bg-gray-900/80 text-white rounded-b-md">
        <h3 className="font-bold text-md md:text-lg truncate">{movie.title}</h3>
        <p className="text-sm">
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            : "TBA"}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">{movie.vote_average}</span>
        </div>
      </div>
    </article>
  );
}