import React, { useState } from "react";
import axios from "axios";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

/* Google official logo */
const GoogleLogo = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.96-2.18 5.47-4.62 7.18l7.1 5.52C43.88 36.91 46.5 30.98 46.5 24z"/>
        <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.1-5.52c-1.97 1.32-4.49 2.09-8.8 2.09-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
);

function SignUp() {
    const navigate = useNavigate();
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post(
                "http://localhost:8000/api/auth/signup",
                { ...formData, role },
                { withCredentials: true }
            );

            alert("Signup successful ✅");
            navigate("/signin"); // ✅ IMPORTANT
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
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
                    Create your account to get started
                </p>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                {/* Full Name */}
                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 rounded-lg border"
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 rounded-lg border"
                />

                {/* Mobile */}
                <input
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 rounded-lg border"
                />

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </button>
                </div>

                {/* Role */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <div className="flex gap-3">
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className="px-4 py-2 rounded-lg border text-sm capitalize"
                                style={{
                                    backgroundColor: role === r ? primaryColor : "white",
                                    color: role === r ? "white" : primaryColor,
                                    borderColor: primaryColor,
                                }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg text-white font-semibold mb-4"
                    style={{ backgroundColor: primaryColor }}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                {/* Google */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-lg"
                >
                    <GoogleLogo />
                    <span>Sign up with Google</span>
                </button>

                {/* Login link */}
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/signin" style={{ color: primaryColor }}>
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;


