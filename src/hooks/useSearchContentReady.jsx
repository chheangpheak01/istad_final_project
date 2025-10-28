import { useEffect, useRef } from 'react';

export function useSearchContentReady(movies, status, contentReady, setContentReady, setShowSkeleton) {
    const timeoutRef = useRef(null);
    const observerRef = useRef(null);
    const imageCheckRef = useRef(null);

    const startContentReadinessCheck = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (observerRef.current) observerRef.current.disconnect();
        if (imageCheckRef.current) clearInterval(imageCheckRef.current);

        const checkDomReady = () => {
            const movieGrid = document.querySelector('[aria-label="Search results list"]');
            if (!movieGrid) return false;

            const movieCards = movieGrid.querySelectorAll('img, [class*="card"], [class*="movie"]');
            return movieCards.length >= movies.length;
        };

        const checkImagesReady = () => {
            const images = document.querySelectorAll('[aria-label="Search results list"] img');
            if (images.length === 0) return false;

            let loadedCount = 0;
            images.forEach(img => {
                if (img.complete) loadedCount++;
            });

            return loadedCount >= images.length;
        };

        const checkAllReady = () => {
            const domCheck = checkDomReady();
            const imagesCheck = checkImagesReady();

            if (domCheck && imagesCheck) {
                setContentReady(true);
                if (observerRef.current) observerRef.current.disconnect();
                if (imageCheckRef.current) clearInterval(imageCheckRef.current);
                return true;
            }
            return false;
        };

        const movieGrid = document.querySelector('[aria-label="Search results list"]');
        if (movieGrid) {
            observerRef.current = new MutationObserver(() => {
                if (checkAllReady()) {
                    timeoutRef.current = setTimeout(() => {
                        setShowSkeleton(false);
                    }, 300);
                }
            });

            observerRef.current.observe(movieGrid, {
                childList: true,
                subtree: true
            });
        }

        imageCheckRef.current = setInterval(() => {
            if (checkAllReady()) {
                timeoutRef.current = setTimeout(() => {
                    setShowSkeleton(false);
                }, 300);
            }
        }, 100);

        timeoutRef.current = setTimeout(() => {
            console.log('Fallback: Hiding skeleton after maximum wait time');
            setContentReady(true);
            setShowSkeleton(false);
            if (observerRef.current) observerRef.current.disconnect();
            if (imageCheckRef.current) clearInterval(imageCheckRef.current);
        }, 5000);

        setTimeout(() => {
            if (checkAllReady()) {
                timeoutRef.current = setTimeout(() => {
                    setShowSkeleton(false);
                }, 300);
            }
        }, 100);
    };

    useEffect(() => {
        if (status === "succeeded" && movies.length > 0 && !contentReady) {
            startContentReadinessCheck();
        }
    }, [status, movies, contentReady]);

    const cleanup = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (observerRef.current) observerRef.current.disconnect();
        if (imageCheckRef.current) clearInterval(imageCheckRef.current);
    };

    return { cleanup };
}