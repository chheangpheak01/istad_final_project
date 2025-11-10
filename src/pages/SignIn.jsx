import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/auth/AuthHeader";
import { AuthToggle } from "../components/auth/AuthToggle";
import { AuthForm } from "../components/auth/AuthForm";
import { useAuthForm } from "../hooks/useAuthForm";

export function SignIn() {
  const navigate = useNavigate();
  const { formik, isLogin, setIsLogin, showPassword, setShowPassword, isLoading } =
    useAuthForm(navigate);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
      {/* Wrapper adjusted for mobile */}
      <div className="flex flex-col items-center justify-start min-h-screen p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-2">
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-auto">
            {/* Header */}
            <AuthHeader isLogin={isLogin} />

            {/* Toggle */}
            <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

            {/* Sub-header */}
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 text-center">
              {isLogin ? "Log in to MovieHub" : "Create Your MovieHub Account"}
            </h3>

            {/* Form */}
            <AuthForm
              formik={formik}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLogin={isLogin}
              isLoading={isLoading}
            />

            {/* Bottom text */}
            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
