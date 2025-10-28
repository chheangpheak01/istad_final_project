export function SearchError({ error, onRetry }) {
    return (
        <main className="bg-gray-900 min-h-screen text-white pt-24 pb-8 flex items-center justify-center text-center">
            <div>
                <div className="text-6xl mb-4 text-red-500">⚠️</div>
                <p className="text-xl text-red-400 mb-2">
                    Failed to load search results
                </p>
                {error && <p className="text-gray-400 mb-4">{error}</p>}
                <button
                    onClick={onRetry}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium">
                    Try Again
                </button>
            </div>
        </main>
    );
}