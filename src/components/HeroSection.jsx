import { IMAGE_BASE_URL } from '../services/api';
import { useHeroActions } from '../hooks/useHeroActions';

export function HeroSection({ heroMovie }) {
  const { isSubscribed, heroVisible, handleSubscribe, handleWatchNow } = useHeroActions();

  if (!heroMovie) return null;

  return (
    <section className="w-screen h-screen relative" aria-labelledby="hero-movie-title">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGE_BASE_URL}${heroMovie.backdrop_path})` }}
        role="img"
        aria-label={`Background image for ${heroMovie.title}`} />
      <div className="absolute inset-0 bg-black/60" />

      <header className={`z-10 px-8 md:px-16 lg:px-24 top-1/3 absolute transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h1 id="hero-movie-title" className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-xl">
          {heroMovie.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-6 drop-shadow-md">
          {heroMovie.overview.length > 250 ? heroMovie.overview.substring(0, 250) + "..." : heroMovie.overview}
        </p>
        <nav className="flex gap-4" aria-label="Hero movie actions">
          <button
            onClick={handleWatchNow}
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 cursor-pointer">
            Watch Now
          </button>
          <button
            onClick={handleSubscribe}
            className={`font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 cursor-pointer ${isSubscribed
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}>
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </nav>
      </header>
    </section>
  );
}