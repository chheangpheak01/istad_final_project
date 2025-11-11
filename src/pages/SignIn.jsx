import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/auth/AuthHeader";
import { AuthToggle } from "../components/auth/AuthToggle";
import { AuthForm } from "../components/auth/AuthForm";
import { useAuthForm } from "../hooks/useAuthForm";

export function SignIn() {
  const navigate = useNavigate();
  const { formik, isLogin, setIsLogin, showPassword, setShowPassword, isLoading } = useAuthForm(navigate);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 z-0 mt-10">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6 sm:p-8 md:p-10">
            <AuthHeader isLogin={isLogin} />
            <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 text-center">
              {isLogin ? "Log in to MovieHub" : "Create Your MovieHub Account"}
            </h3>
            <AuthForm
              formik={formik}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLogin={isLogin}
              isLoading={isLoading}
            />
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
