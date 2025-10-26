import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export function MovieDetailHeader({ onBackToHome, onClose }) {
    return (
        <header className="absolute top-4 left-4 right-4 z-20 flex justify-between">
            <button onClick={onBackToHome}
                className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-3 hover:bg-gray-800 transition-colors text-white font-medium"
                aria-label="Back to home">
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Home
            </button>
            <button
                onClick={onClose}
                className="bg-gray-900/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800 transition-colors"
                aria-label="Close movie details">
                <XMarkIcon className="w-6 h-6 text-white" />
            </button>
        </header>
    );
}