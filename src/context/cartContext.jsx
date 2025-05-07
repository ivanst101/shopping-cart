import { createContext } from "react";
import { allProducts } from "../assets/data";
import { useState } from "react";
import { useContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [allItems, setAllItems] = useState([]);

  function setItems() {
    setAllItems(allProducts);
  }

  function addToCart(item) {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        if (prevItem.inCart) {
          return prevItem;
        }

        return prevItem.id === item.id
          ? { ...prevItem, inCart: true }
          : prevItem;
      });
    });
  }

  function removeFromCart(item) {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === item.id
          ? { ...prevItem, inCart: false, quantity: 0 }
          : prevItem;
      });
    });
  }

  function updateQuantity(cartItem, amount) {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === cartItem.id
          ? { ...prevItem, quantity: prevItem.quantity + amount }
          : prevItem;
      });
    });
  }

  return (
    <CartContext.Provider
      value={{ allItems, setItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
