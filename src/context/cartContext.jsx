import { allProducts } from "../assets/data";
import { createContext, useCallback, useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
  setItemInStorage,
} from "../utilities/localStorageFns";

const CartContext = createContext();

function CartProvider({ children }) {
  const [allItems, setAllItems] = useState([]);

  const setItems = useCallback(() => {
    setAllItems(allProducts);
  }, []);

  const addToCart = useCallback((item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === item.id
          ? { ...prevItem, inCart: true }
          : prevItem;
      });
    });
  }, []);

  const removeFromCart = useCallback((item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === item.id
          ? { ...prevItem, inCart: false, quantity: 0 }
          : prevItem;
      });
    });
  }, []);

  const updateQuantity = useCallback((cartItem, amount) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === cartItem.id
          ? { ...prevItem, quantity: prevItem.quantity + amount }
          : prevItem;
      });
    });
  }, []);

  const setLocalStorage = useCallback(() => {
    if (allItems.length !== 0) {
      const inCartItems = allItems.filter((item) => item.inCart);
      setItemInStorage("cartItems", inCartItems);
    }
  }, [allItems]);

  const setCartItemsFromStorage = useCallback(() => {
    if (getItemFromStorage("cartItems") !== null) {
      const storageItems = getParsedItemFromStorage("cartItems");

      setAllItems((prevItems) => {
        return prevItems.map((item) => {
          const matchedItem = storageItems.find(
            (storageItem) => storageItem.id === item.id
          );
          return matchedItem ? matchedItem : item;
        });
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      allItems,
      setItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      setLocalStorage,
      setCartItemsFromStorage,
    }),
    [
      allItems,
      setItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      setLocalStorage,
      setCartItemsFromStorage,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
