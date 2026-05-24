import { fetchProducts, searchProductsByQuery } from "../services/apirequest";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const respose = fetchProducts(); //network call
    respose
      .then((data) => {
        setProductsData(data.products);
      })
      .catch((error) => {
        setError(
          "Error fetching products. Please try again. the error is " +
            error.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function navigateToNewProduct() {
    navigate("/products/add");
  }
  async function handleSearchSubmit() {
    if (!searchQuery.trim()) {
      setError("Please enter a valid search term.");
      return;
    }
    setError("");
    setSearchLoading(true);
    try {
      const data = await searchProductsByQuery(searchQuery);
      setProductsData(data.products);
    } catch (error) {
      setError(error.message || "Error searching products.");
    } finally {
      setSearchLoading(false);
    }
  }
  function handleCartClick() {
    navigate("/cart");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 m-auto">
          Product List
        </h1>
        {error ? (
          <p
            role="alert"
            className="text-center text-lg font-semibold text-red-500 mt-6"
          >
            {error}
          </p>
        ) : null}
        <button
          onClick={handleCartClick}
          className="p-2 rounded-full border-4 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cart
        </button>
      </div>
      <div className="flex flex-col md:flex flex-row md:items-start md:place-content-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 p-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              const value = e.target.value;

              setSearchQuery(value);
              setError("");

              if (!value.trim()) {
                setSearchLoading(true);

                try {
                  const data = await fetchProducts();

                  setProductsData(data.products);
                } catch (error) {
                  setError(error.message || "Error fetching products.");
                } finally {
                  setSearchLoading(false);
                }
              }
            }}
          />
          <button
            onClick={handleSearchSubmit}
            className="w-full sm:w-auto ml-2 p-2 rounded-full border-4 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        <button
          onClick={navigateToNewProduct}
          className="w-full sm:w-full md:w-auto p-2 px-5 rounded-full border-4  bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          + add product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {loading || searchLoading ? (
          <p className="text-center text-2xl font-semibold text-indigo-600 animate-pulse">
            Loading...
          </p>
        ) : !loading && productsData.length === 0 ? (
          <p>No products found</p>
        ) : (
          productsData.map((product) => (
            <Product
              key={product.id}
              product={product}
              showAddToCartButton={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
