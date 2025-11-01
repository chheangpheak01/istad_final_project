import { IMAGE_BASE_URL } from "../../services/api.jsx";
import { MovieDetailSkeleton } from "../LoadingSkeletons.jsx";
import { MovieDetailHeader } from "./MovieDetailHeader.jsx";
import { MovieDetailContent } from "./MovieDetailContent.jsx";
import { MovieDetailTrailer } from "./MovieDetailTrailer.jsx";
import { MovieDetailCast } from "./MovieDetailCast.jsx";
import { useMovieDetailData } from "../../hooks/useMovieDetailData.jsx";

export function MovieDetail({ movie, isOpen, onClose }) {
    const {
        movieDetail,
        trailerVideo,
        cast,
        showTrailer,
        isLoading,
        trailerSectionRef,
        handleWatchTrailer,
        setShowTrailer
    } = useMovieDetailData(movie, isOpen);

    if (!isOpen || !movie) return null;

    if (isLoading) {
        return <MovieDetailSkeleton />;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-95" aria-hidden="true" />
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path})`,
                    filter: 'blur(20px) brightness(0.25)'
                }}
                aria-hidden="true" />
            <div className="relative w-full min-h-screen">
                <section className="relative bg-gray-900/90 backdrop-blur-md w-full min-h-screen overflow-y-auto">
                    <MovieDetailHeader onBackToHome={onClose} onClose={onClose} />

                    <main className="pt-20">
                        <div className="px-6 py-8 sm:px-8 sm:py-12">
                            <div className="max-w-7xl mx-auto">
                                <MovieDetailContent
                                    movie={movie}
                                    movieDetail={movieDetail}
                                    trailerVideo={trailerVideo}
                                    onWatchTrailer={handleWatchTrailer} />

                                {showTrailer && trailerVideo && (
                                    <MovieDetailTrailer
                                        ref={trailerSectionRef}
                                        movie={movie}
                                        trailerVideo={trailerVideo}
                                        onCloseTrailer={() => setShowTrailer(false)} />)}
                                {cast.data && cast.data.length > 0 && (
                                    <MovieDetailCast cast={cast.data} />)}
                            </div>
                        </div>
                    </main>
                </section>
            </div>
        </div>
    );
}