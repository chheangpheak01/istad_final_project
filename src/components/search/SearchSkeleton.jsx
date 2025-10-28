import { MovieGridSkeleton } from "../LoadingSkeletons";

export function SearchSkeleton() {
    return (
        <main className="bg-gray-900 min-h-screen text-white pt-24 pb-8">
            <div className="flex justify-center">
                <div className="w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12">
                        <div className="h-12 bg-gray-800 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-800 rounded w-1/4 mx-auto animate-pulse"></div>
                    </header>
                    <MovieGridSkeleton />
                </div>
            </div>
        </main>
    );
}