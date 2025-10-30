import { useFormik } from "formik";
import * as yup from "yup";
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function SignIn() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]); // store registered users

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('moviehubUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: isLogin ? yup.string() : yup.string().required("Name is required"),
      email: yup.string().required("Email is required").email("Invalid email address"),
      password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise(r => setTimeout(r, 500));

        if (isLogin) {
          // Check if email/password exists in registered users
          const user = users.find(u => u.email === values.email && u.password === values.password);
          if (user) {
            // SAVE CURRENT USER TO LOCALSTORAGE
            localStorage.setItem('currentUser', JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.avatar
            }));

            alert("Login successful!");
            navigate("/dashboard");
          } else {
            alert("Invalid email or password");
          }
        } else {
          // Register new user
          const newUser = {
            ...values,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&background=random`
          };
          const updatedUsers = [...users, newUser];

          // SAVE USERS TO LOCALSTORAGE
          setUsers(updatedUsers);
          localStorage.setItem('moviehubUsers', JSON.stringify(updatedUsers));

          localStorage.setItem('currentUser', JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar
          }));

          alert(`Account created for ${values.name}! Redirecting to dashboard...`);
          navigate("/dashboard");
        }
      } finally {
        setIsLoading(false);
      }
    }
  });

  const { handleChange, handleSubmit, errors, values, touched, isValid } = formik;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 z-0 mt-10">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">

            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-white mb-1">Welcome to MovieHub</h1>
              <p className="text-gray-300 text-xs">Stream the latest movies & TV shows anytime</p>
            </div>

            <div className="flex bg-white/5 rounded-lg p-1 mb-4">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${!isLogin ? "bg-white/20 text-white shadow" : "text-gray-300 hover:text-white"}`}>
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${isLogin ? "bg-white/20 text-white shadow" : "text-gray-300 hover:text-white"}`}>
                Log In
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-semibold text-sm mb-1">Why MovieHub?</h3>
              <p className="text-gray-300 text-xs">
                {isLogin
                  ? "Welcome back! Log in to continue streaming your favorite movies."
                  : "Create your MovieHub account and start watching instantly."
                }
              </p>
            </div>

            <h3 className="text-white font-semibold text-sm mb-3">
              {isLogin ? "Log in to MovieHub" : "Create Your MovieHub Account"}
            </h3>

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
                  {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
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
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
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
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
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
                ) : (
                  isLogin ? "Log In" : "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-400 hover:text-pink-300 font-medium">
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