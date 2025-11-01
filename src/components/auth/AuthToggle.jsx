export function AuthToggle({ isLogin, setIsLogin }) {
    return (
        <section className="flex bg-white/5 rounded-lg p-1 mb-4">
            <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${!isLogin ? "bg-white/20 text-white shadow" : "text-gray-300 hover:text-white cursor-pointer"}`}>
                Sign Up
            </button>
            <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${isLogin ? "bg-white/20 text-white shadow" : "text-gray-300 hover:text-white cursor-pointer"}`}>
                Log In
            </button>
        </section>
    );
}
