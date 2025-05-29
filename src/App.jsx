import "./App.css";
import { useEffect, useMemo, useState } from "react";
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
  const [sorting, setSorting] = useState("default");

  function handleSearchItem(e) {
    const searched = e.target.value;
    setSearchItem(searched);

    const filteredProducts = apiProducts.filter((product) =>
      product.name.toLowerCase().includes(searched.toLowerCase())
    );
    setFilterProducts(filteredProducts);
  }

  function handleSorting(e) {
    setSorting(e.target.value);
  }

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = apiProducts.filter((product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (sorting === "pasc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sorting === "pdesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sorting === "nasc") {
      filtered.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (sorting === "ndesc") {
      filtered.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }

    return filtered;
  }, [apiProducts, searchItem, sorting]);

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
      <div className="w-auto gap-14 flex justify-between">
        <div className="filter">
          Search products:
          <input
            type="text"
            name="search"
            id="search"
            value={searchItem}
            onChange={handleSearchItem}
            className="border-2 border-gray-500 border-solid"
          />
        </div>
        <div className="select">
          <select
            name="select"
            id="select"
            value={sorting}
            onChange={handleSorting}
          >
            <option value="default">Sort by</option>
            <option value="pasc">Price ascending</option>
            <option value="pdesc">Price descending</option>
            <option value="nasc">Name ascending</option>
            <option value="ndesc">Name descending</option>
          </select>
        </div>
      </div>

      <ShoppingCart />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 place-items-start gap-8 xl:px-6 px-10">
        {loading ? (
          <p>Loading..</p>
        ) : sortedAndFilteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          sortedAndFilteredProducts.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
