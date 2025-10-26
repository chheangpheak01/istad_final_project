import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function WelcomeSection() {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} className="text-center my-16 px-4 md:px-16 lg:px-32 transition-all duration-700"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(10px)" }}
      aria-labelledby="welcome-heading">
      <header>
        <h2 id="welcome-heading" className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to MovieHub
        </h2>
      </header>
      <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
        Discover millions of movies, TV shows, and celebrities. Stay updated with the latest releases and trending entertainment, all in one place.
      </p>
    </section>
  );
}