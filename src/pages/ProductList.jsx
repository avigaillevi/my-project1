//import React from 'react';
import { products } from "../services/apirequest";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchText } from "../services/apirequest";

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    products() //network call
      .then((data) => {
        setProductsData(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleadd() {
    navigate("/products/add");
  }
  function handlesearch() {
    searchText(searchQuery)
      .then((data) => {
        setProductsData(data.products);
      })
      .catch((error) => {
        console.error("Error searching products:", error);
        alert("Error searching products. Please try again.");
      });
  }
  function handleaddtocart() {
    navigate("/cart");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 m-auto">
          Product List
        </h1>
        <button
          onClick={handleaddtocart}
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handlesearch}
            className="w-full sm: w-auto ml-2 p-2 rounded-full border-4 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        <button
          onClick={handleadd}
          className="w-full sm:w-full md:w-auto p-2 px-5 rounded-full border-4  bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          + add product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {loading ? (
          <p>Loading products...</p>
        ) : productsData ? (
          productsData.map((product) => (
            <Product
              key={product.id}
              product={product}
              dontshowaddcartbutton={false}
            />
          ))
        ) : (
          <p>No products...</p>
        )}
      </div>
    </div>
  );
}
