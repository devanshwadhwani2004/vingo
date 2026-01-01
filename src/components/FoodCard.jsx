import React from "react";
import { useCart } from "../context/CartContext";

function FoodCard({ food }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <img
                src={food.image}
                alt={food.name}
                className="w-full h-40 object-cover rounded"
            />

            <h3 className="font-semibold mt-2">{food.name}</h3>
            <p className="text-gray-600">₹{food.price}</p>

            <button
                onClick={() => addToCart(food)}
                className="mt-3 w-full bg-orange-500 text-white py-1.5 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default FoodCard;
