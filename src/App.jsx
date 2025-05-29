import "./App.css";
import { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import { useCart } from "./context/cartContext";
import ShoppingCart from "./components/ShoppingCart";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
} from "./utilities/localStorageFns";

function App() {
  const { allItems, setItems, setCartItemsFromStorage } = useCart();

  const [apiProducts, setApiProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterProducts, setFilterProducts] = useState(allItems);
  const [loading, setLoading] = useState(true);

  function handleSearchItem(e) {
    const searched = e.target.value;
    setSearchItem(searched);

    const filteredProducts = apiProducts.filter((product) =>
      product.name.toLowerCase().includes(searched.toLowerCase())
    );
    setFilterProducts(filteredProducts);
  }

  useEffect(
    function () {
      setItems();

      if (
        getParsedItemFromStorage("cartItems")?.length !== 0 &&
        getItemFromStorage("cartItems") !== null
      ) {
        setCartItemsFromStorage();
      }
    },
    [setCartItemsFromStorage, setItems]
  );

  useEffect(() => {
    if (allItems.length > 0) {
      setApiProducts(allItems);
      setFilterProducts(allItems);
      setLoading(false);
    }
  }, [allItems]);

  return (
    <div className="grid place-items-center py-20">
      <h1 className="lg:text-5xl md:text-4xl text-3xl italic text-gray-500 mb-16 px-10 text-center">
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      Search products:
      <input
        type="text"
        name="search"
        id="search"
        value={searchItem}
        onChange={handleSearchItem}
        className="border-2 border-gray-500 border-solid"
      />
      <ShoppingCart />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 place-items-start gap-8 xl:px-6 px-10">
        {loading ? (
          <p>Loading..</p>
        ) : filterProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filterProducts.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
