import React, { useState } from "react";
import axios from "axios";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

/* Google Logo */
const GoogleLogo = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.96-2.18 5.47-4.62 7.18l7.1 5.52C43.88 36.91 46.5 30.98 46.5 24z"/>
        <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.1-5.52c-1.97 1.32-4.49 2.09-8.8 2.09-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
);

function SignIn() {
    const navigate = useNavigate();
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post(
                "http://localhost:8000/api/auth/signin",
                { email, password },
                { withCredentials: true }
            );

            // ✅ login state
            localStorage.setItem("isLoggedIn", "true");

            // ✅ redirect to home
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
            >
                <h1 className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>
                    Vingo
                </h1>

                <p className="text-gray-500 mb-6 text-sm">
                    Sign in to your account to get started with delicious food deliveries
                </p>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded-lg border"
                    required
                />

                {/* Password */}
                <div className="relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </button>
                </div>

                {/* Forgot password */}
                <div className="text-right mb-4">
                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium"
                        style={{ color: primaryColor }}
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg text-white font-semibold mb-4"
                    style={{ backgroundColor: primaryColor }}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                {/* Google */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-lg bg-white text-gray-700 font-medium"
                >
                    <GoogleLogo />
                    <span>Sign In with Google</span>
                </button>

                {/* Sign up */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Want to create a new account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium"
                        style={{ color: primaryColor }}
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
