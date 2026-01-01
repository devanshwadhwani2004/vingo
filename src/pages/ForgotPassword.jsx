import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /* ================= SEND OTP ================= */
    const sendOtp = async () => {
        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await axios.post(
                "http://localhost:8000/api/auth/send-otp",
                { email },
                { withCredentials: true }
            );

            alert("OTP sent to email ✅");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    /* ================= VERIFY OTP ================= */
    const verifyOtp = async () => {
        if (!otp) {
            setError("OTP is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await axios.post(
                "http://localhost:8000/api/auth/verify-otp",
                { email, otp },
                { withCredentials: true }
            );

            alert("OTP verified ✅");
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    /* ================= RESET PASSWORD ================= */
    const resetPassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await axios.post(
                "http://localhost:8000/api/auth/reset-password",
                { email, newPassword },
                { withCredentials: true }
            );

            alert("Password reset successful ✅");
            navigate("/signin");
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor }}
        >
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 text-sm font-medium"
                    style={{ color: primaryColor }}
                >
                    <FaArrowLeft /> Back
                </button>

                <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: primaryColor }}
                >
                    Forgot Password
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {/* ================= STEP 1 ================= */}
                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded mb-4"
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full py-2 text-white rounded font-semibold"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {/* ================= STEP 2 ================= */}
                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border px-3 py-2 rounded mb-4"
                        />

                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="w-full py-2 text-white rounded font-semibold"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {/* ================= STEP 3 ================= */}
                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded mb-4"
                        />

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="w-full py-2 text-white rounded font-semibold"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
