import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // ADD TO CART
    const addToCart = (item) => {
        const existing = cartItems.find((i) => i.id === item.id);

        if (existing) {
            setCartItems(
                cartItems.map((i) =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, qty: 1 }]);
        }
    };

    // REMOVE FROM CART
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((i) => i.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
