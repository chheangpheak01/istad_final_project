export function AuthHeader({ isLogin }) {
    return (
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome to MovieHub</h1>
            <p className="text-gray-300 text-xs">
                {isLogin
                    ? "Log in to access your movies and favorites."
                    : "Stream the latest movies & TV shows anytime"}
            </p>
        </div>
    );
}
