import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function AuthForm({ formik, showPassword, setShowPassword, isLogin, isLoading }) {

    const { handleChange, handleSubmit, errors, values, touched, isValid } = formik;

    return (
        <form onSubmit={handleSubmit} className="space-y-3">

            {!isLogin && (
                <div>
                    <label className="block text-xs font-medium text-gray-200 mb-1">Full Name</label>
                    <div className="relative">
                        <UserIcon className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                        <input
                            name="name"
                            type="text"
                            onChange={handleChange}
                            value={values.name}
                            className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="Your full name" />
                    </div>
                    {errors.name && touched.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
            )}

            <div>
                <label className="block text-xs font-medium text-gray-200 mb-1">Email</label>
                <div className="relative">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={values.email}
                        className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="you@example.com" />
                </div>
                {errors.email && touched.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-200 mb-1">Password</label>
                <div className="relative">
                    <LockClosedIcon className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={values.password}
                        className="w-full pl-8 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="Enter your password" />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                        {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && touched.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading || !isValid}
                className={`w-full py-2.5 rounded-lg font-medium text-white text-sm transition-all mt-4 ${isLoading || !isValid
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow hover:shadow-pink-500/25"
                    }`}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {isLogin ? "Signing in..." : "Creating..."}
                    </div>
                ) : (isLogin ? "Log In" : "Sign Up")}
            </button>
        </form>
    );
}
