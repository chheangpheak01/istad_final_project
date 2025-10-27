import React from "react";

// Hero Skeleton Component
export const HeroSkeleton = () => (
    <section className="w-screen h-screen relative bg-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gray-700" />
        <div className="z-10 px-8 md:px-16 lg:px-24 top-1/3 absolute">
            <div className="h-16 bg-gray-600 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-600 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-600 rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-600 rounded mb-6 w-4/6"></div>
            <div className="flex gap-4">
                <div className="h-12 bg-gray-600 rounded w-32"></div>
                <div className="h-12 bg-gray-600 rounded w-32"></div>
            </div>
        </div>
    </section>
);

// Welcome Section Skeleton Component
export const WelcomeSkeleton = () => (
    <div className="text-center my-16 px-4 md:px-16 lg:px-32 animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4 w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded mb-2 w-2/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
    </div>
);

export const MovieRowSkeleton = ({ title }) => (
    <section className="px-8 md:px-16 lg:px-24 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="w-44 md:w-52 lg:w-56 h-64 bg-gray-700 rounded-lg mb-2"></div>
                    <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export const FullPageSkeleton = () => (
    <div className="bg-gray-900 min-h-screen text-white">
        <HeroSkeleton />
        <WelcomeSkeleton />
        <MovieRowSkeleton title="Popular" />
        <MovieRowSkeleton title="Upcoming" />
        <MovieRowSkeleton title="Top Rated" />
        <MovieRowSkeleton title="Now Playing" />
    </div>
);

// Individual Movie Card Skeleton 
export const MovieCardSkeleton = () => (
    <div className="animate-pulse">
        <div className="w-44 md:w-52 lg:w-56 h-64 bg-gray-700 rounded-lg mb-2"></div>
        <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
        </div>
    </div>
);

export default {
    HeroSkeleton,
    WelcomeSkeleton,
    MovieRowSkeleton,
    FullPageSkeleton,
    MovieCardSkeleton
};

export const MovieDetailSkeleton = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-95" aria-hidden="true" />

        <div className="fixed inset-0 bg-gray-800 animate-pulse" aria-hidden="true" />

        <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
            </span>

            <div className="relative inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top w-full h-screen border-0">

                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
                    <div className="h-12 bg-gray-700 rounded-full w-32 animate-pulse"></div>
                    <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
                </div>

                <div className="h-full overflow-y-auto pt-20">
                    <div className="px-6 py-8 sm:px-8 sm:py-12">
                        <div className="max-w-7xl mx-auto">

                            <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 animate-pulse">
                                <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-start">
                                    <div className="w-64 sm:w-72 md:w-80 h-96 bg-gray-700 rounded-xl"></div>
                                </div>

                                <div className="flex-1 space-y-8">

                                    <div className="h-12 bg-gray-700 rounded w-3/4"></div>

                                    <div className="space-y-2">
                                        <div className="h-6 bg-gray-700 rounded w-32"></div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                            <div className="h-8 bg-gray-700 rounded w-24"></div>
                                        </div>
                                    </div>

                                    <div className="h-14 bg-gray-700 rounded w-48"></div>

                                    <div className="border-t border-gray-600 pt-6"></div>

                                    <div className="space-y-4">
                                        <div className="h-7 bg-gray-700 rounded w-32"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 bg-gray-700 rounded"></div>
                                            <div className="h-5 bg-gray-700 rounded w-16"></div>
                                        </div>
                                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 bg-gray-700 rounded"></div>
                                            <div className="h-5 bg-gray-700 rounded w-20"></div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-700/60 rounded-lg p-6 border border-gray-600 max-w-4xl">
                                        <div className="h-7 bg-gray-600 rounded w-40 mb-4"></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index}>
                                                    <div className="h-4 bg-gray-600 rounded w-20 mb-2"></div>
                                                    <div className="h-6 bg-gray-600 rounded w-24"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="h-7 bg-gray-700 rounded w-24 mb-3"></div>
                                        <div className="flex flex-wrap gap-2">
                                            {[...Array(3)].map((_, index) => (
                                                <div key={index} className="h-8 bg-gray-700 rounded w-20"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-12 animate-pulse">
                                <div className="h-7 bg-gray-700 rounded w-32 mb-6 border-b border-gray-600 pb-3"></div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {[...Array(12)].map((_, index) => (
                                        <div key={index} className="text-center">
                                            <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3"></div>
                                            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div>
                                            <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export function MovieGridSkeleton() {
  const skeletonItems = Array.from({ length: 18 });
  return (
    <div className="bg-gray-900 min-h-screen text-white pt-24 pb-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <div className="h-12 bg-gray-800 rounded w-80 mx-auto mb-6 animate-pulse"></div>
          <div className="h-5 bg-gray-800 rounded w-3/4 max-w-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 max-w-md mx-auto mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-800 rounded w-40 mx-auto animate-pulse"></div>
        </header>
        <section aria-label="Movies skeleton">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8 justify-items-center">
            {skeletonItems.map((_, i) => (
              <div
                key={i}
                className="w-44 md:w-52 lg:w-56 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer bg-gray-800 p-2 animate-pulse">
                <figure className="relative">
                  <div className="w-full h-64 bg-gray-700 rounded-md"></div>
                </figure>
                
                <div className="p-3 bg-gray-900/80 text-white rounded-b-md space-y-2">
                  <div className="h-5 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}