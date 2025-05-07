import { allProducts } from "../assets/data";
import { createContext } from "react";
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

  function setItems() {
    setAllItems(allProducts);
  }

  function addToCart(item) {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        // if (prevItem.inCart) {
        //   return prevItem;
        // }

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

  function setLocalStorage() {
    if (allItems.length !== 0) {
      const inCartItems = allItems.filter((item) => item.inCart);
      setItemInStorage("cartItems", inCartItems);
    }
  }

  function setCartItemsFromStorage() {
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
  }

  return (
    <CartContext.Provider
      value={{
        allItems,
        setItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setLocalStorage,
        setCartItemsFromStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
