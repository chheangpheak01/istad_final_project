import React from "react";

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

export const WelcomeSkeleton = () => (
    <div className="text-center my-16 px-4 md:px-16 lg:px-32 animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4 w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded mb-2 w-2/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
    </div>
);

export const MovieRowSkeleton = ({ title }) => (
    <section className="mb-12">
        <div className="w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 mx-auto">
            <header className="text-left mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse w-44 md:w-52 lg:w-56">
                        <div className="h-64 bg-gray-700 rounded-lg mb-2"></div>
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="mt-4 flex justify-end">
                <div className="h-10 w-32 bg-gray-700 rounded-lg"></div>
            </footer>
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

export const MovieCardSkeleton = () => (
    <div className="animate-pulse w-44 md:w-52 lg:w-56">
        <div className="h-64 bg-gray-700 rounded-lg mb-2"></div>
        <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
        </div>
    </div>
);

export const MovieDetailSkeleton = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-95" aria-hidden="true" />
        <div className="fixed inset-0 bg-gray-800 animate-pulse" aria-hidden="true" />

        <div className="relative w-full min-h-screen">
            <section className="relative bg-gray-900/90 backdrop-blur-md w-full min-h-screen overflow-y-auto">
                <div className="h-16 flex items-center px-6 sm:px-8 animate-pulse">
                    <div className="w-24 h-12 bg-gray-700 rounded-lg"></div>
                </div>
                <main className="pt-20">
                    <div className="px-6 py-8 sm:px-8 sm:py-12">
                        <div className="max-w-7xl mx-auto space-y-12">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-pulse">
                                <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-start">
                                    <div className="w-64 sm:w-72 md:w-80 h-96 bg-gray-700 rounded-xl"></div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div className="h-12 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-700 rounded w-32"></div>
                                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                </div>
                            </div>
                            <div className="h-64 bg-gray-700 rounded-xl animate-pulse"></div>
                            <div className="space-y-4">
                                <div className="h-7 bg-gray-700 rounded w-32 mb-4"></div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-700 rounded-full mb-2"></div>
                                            <div className="h-3 bg-gray-700 rounded w-16"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    </div>
);

export const MovieGridSkeleton = () => {
    const skeletonItems = Array.from({ length: 18 });
    return (
        <main className="bg-gray-900 min-h-screen text-white pt-24 pb-8">
            <div className="w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 mx-auto">
                <header className="text-center mb-12 animate-pulse">
                    <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div> 
                    <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>  
                    <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>  
                    <div className="h-4 bg-gray-700 rounded w-1/4 mx-auto"></div>      
                </header>
                <section aria-label="Movies skeleton list">
                    <div className="
                                    grid
                                    grid-cols-2
                                    sm:grid-cols-3
                                    md:grid-cols-4
                                    lg:grid-cols-5
                                    xl:grid-cols-6
                                    gap-6
                                    place-items-center">
                        {skeletonItems.map((_, i) => (
                            <div key={i} className="animate-pulse w-44 md:w-52 lg:w-56">
                                <div className="h-64 bg-gray-700 rounded-lg mb-2"></div>
                                <div className="p-3 space-y-2">
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

