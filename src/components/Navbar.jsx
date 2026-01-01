import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { cartItems, removeFromCart } = useCart();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/signin");
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow relative">
            <h1 className="text-2xl font-bold text-orange-500">Vingo</h1>

            <div className="flex items-center gap-6">
                <button>My Orders</button>

                <button onClick={() => setOpen(!open)}>
                    🛒 ({cartItems.length})
                </button>

                <button onClick={signOut}>Sign Out</button>
            </div>

            {/* CART DROPDOWN */}
            {open && (
                <div className="absolute right-6 top-20 bg-white shadow-lg w-72 p-4 rounded z-50">
                    {cartItems.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between mb-2"
                                >
                                    <span>
                                        {item.name} × {item.qty}
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}

                            {/* CHECKOUT BUTTON */}
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/checkout");
                                }}
                                className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;



