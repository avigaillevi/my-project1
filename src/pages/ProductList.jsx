import { fetchProducts, searchProductsByQuery } from "../services/apirequest";
import Product from "../components/Product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProductList() {
  
  const {
    data: productsData,
    loading,
    error,
  } = useFetch(fetchProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useFetch(searchProductsByQuery(searchQuery));

  const navigate = useNavigate();
  //const test = undefined;
//  throw new Error("Test Error Boundary");

  function navigateToNewProduct() {    
    navigate("/products/add");
  }
  function handleCartClick() {
    navigate("/cart");
  }
  function handleTryAgain() {
    window.location.reload();
    navigate("/"); // Navigate to the home page to trigger a re-fetch of products 
  } 
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1>{test.name}</h1> */}
      <div className="flex flex-col md:flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 m-auto">
          Product List
        </h1>

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

            }}
          />
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
        ) : !loading && searchData.products.length === 0 || error || searchError ? (
          <p role="alert"
            className="text-center text-lg font-semibold text-red-500 mt-6"
            >No products found
            <button 
              onClick={handleTryAgain}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Try Again
            </button>
            </p>
        ) : (
          productsData &&
          searchData.products.map((product) => (
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
