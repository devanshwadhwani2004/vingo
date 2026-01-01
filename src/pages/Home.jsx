import React from "react";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import { foods } from "../data/foods";

function Home() {
    return (
        <div className="bg-[#fff9f6] min-h-screen">
            <Navbar />

            <div className="px-6 mt-6">
                <h2 className="text-xl font-bold mb-4">Suggested items</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foods.map((food) => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
