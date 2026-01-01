import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Checkout() {
    const { cartItems } = useCart();
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            () => console.log("Location denied")
        );
    }, []);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-[80vh]">
                    <h2 className="text-xl font-semibold">
                        🛒 Cart is empty
                    </h2>
                </div>
            </>
        );
    }

    return (
        <div className="bg-[#fff9f6] min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>

                {/* ADDRESS */}
                <textarea
                    placeholder="Enter delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border rounded p-3 mb-4"
                />

                {/* MAP */}
                {location && (
                    <iframe
                        className="w-full h-64 rounded mb-4"
                        src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                        title="map"
                    />
                )}

                {/* ORDER SUMMARY */}
                <div className="bg-white p-4 rounded shadow mb-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between mb-2"
                        >
                            <span>
                                {item.name} × {item.qty}
                            </span>
                            <span>₹{item.price * item.qty}</span>
                        </div>
                    ))}

                    <hr />
                    <div className="flex justify-between font-bold mt-2">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                {/* PAY */}
                <button
                    className="w-full bg-orange-500 text-white py-3 rounded text-lg"
                >
                    Pay ₹{total}
                </button>
            </div>
        </div>
    );
}

export default Checkout;

