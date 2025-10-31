import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export function useAuthForm(navigate, isLoginInitial = false) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(isLoginInitial);
    const [users, setUsers] = useState([]);

    // Load users and check token
    useEffect(() => {
        const storedUsers = localStorage.getItem('moviehubUsers');
        if (storedUsers) setUsers(JSON.parse(storedUsers));

        const token = localStorage.getItem("moviehubToken");
        if (token) navigate("/dashboard");
    }, [navigate]);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: yup.object({
            name: isLogin ? yup.string() : yup.string().required("Name is required"),
            email: yup.string().required("Email is required").email("Invalid email address"),
            password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await new Promise(r => setTimeout(r, 500));

                if (isLogin) {
                    // Login logic
                    const user = users.find(u => u.email === values.email && u.password === values.password);
                    if (user) {
                        const token = "moviehub_token_" + new Date().getTime();
                        localStorage.setItem("moviehubToken", token);
                        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email, avatar: user.avatar }));
                        alert("Login successful!");
                        navigate("/dashboard");
                    } else {
                        alert("Invalid email or password");
                    }
                } else {
                    // Signup logic
                    const newUser = {
                        ...values,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&background=random`
                    };
                    const updatedUsers = [...users, newUser];
                    setUsers(updatedUsers);
                    localStorage.setItem('moviehubUsers', JSON.stringify(updatedUsers));

                    const token = "moviehub_token_" + new Date().getTime();
                    localStorage.setItem("moviehubToken", token);
                    localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email, avatar: newUser.avatar }));

                    alert(`Account created for ${values.name}! Redirecting to dashboard...`);
                    navigate("/dashboard");
                }
            } finally {
                setIsLoading(false);
            }
        }
    });
    
    return {
        formik,
        isLogin,
        setIsLogin,
        showPassword,
        setShowPassword,
        isLoading
    };
}
