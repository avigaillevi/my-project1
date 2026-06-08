import { fetchProducts, searchProductsByQuery } from "../services/apirequest";
import Product from "../components/Product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";
import ErrorPage from "../components/ErrorPage";
import ProductSkeleton from "../components/ProductSkeleton";
import The404Page from "../components/The404Page";

export default function ProductList() {
  const { data: productsData, loading, error ,refetch} = useFetch(fetchProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useFetch(searchProductsByQuery(searchQuery));

  const navigate = useNavigate();

  function navigateToNewProduct() {
    navigate("/products/add");
  }
  function handleCartClick() {
    navigate("/cart");
  }
  return (
    <div className="dark">
    <div className="container mx-auto px-4 py-8 dark:bg-gray-800">
      <div className="flex flex-col md:flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 m-auto">
          Product List
        </h1>

        <button
          onClick={handleCartClick}
          className="p-2 rounded-full border-4 bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cart
        </button>
      </div>
      <div className="flex flex-col md:flex flex-row md:items-start md:place-content-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 dark:bg-gray-700 p-2 rounded-full dark:text-white">
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 p-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={async (e) => {
              const value = e.target.value;
              setSearchQuery(value);
            }}
          />
        </div>
        <button
          onClick={navigateToNewProduct}
          className="w-auto sm:w-full md:w-auto p-2 px-5 rounded-full border-4  bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          + add product
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        {loading || searchLoading ? (<ProductSkeleton />
        ) : (!loading && searchData.data.length === 0) ? (
          <div className="col-span-full flex flex-col items-center gap-4">
            <img
              src="/images/not_found.svg"
              alt="No product found"
              className="w-64"
            />

            <h2 className="text-2xl font-bold text-indigo-700">
              Products Not Found
            </h2>
          </div>
        ) :(error?.response?.status === 404 ) ? (<The404Page refetch={refetch}></The404Page >
      ): (error || searchError)?(<ErrorPage refetch={refetch}></ErrorPage>): (
          productsData&&
          searchData.data.map((product) => (
            <Product
              key={product._id}
              product={product}
              showAddToCartButton={true}
            />
          ))
        )}
      </motion.div>
    </div>
    </div>
  );
}
