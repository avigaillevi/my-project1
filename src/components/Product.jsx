import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/apirequest";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Product({ product, showAddToCartButton  }) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  function handleShowProduct() {
    navigate(`/products/${product.id}`);
  }

  function handleAddToCart() {
    addToCart(product.id) //network call
      .then(() => {
        navigate("/cart", { state: { message: `Product ${product.title} added to cart successfully!` } });
      })
      .catch(() => {
        setError("Error adding product to cart. Please try again.");
      });
  }

  return (
    <div className="dark">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-4 border-indigo-500/75 shadow-md p-4 rounded-xl text-center dark:bg-gray-700 text-white"
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        {product.title}
      </h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-56 m-auto h-44 object-cover mb-4 rounded border-indigo-500/75 text-center"
      />
      <p className="text-2xl font-bold">${product.price}</p>
      <button
        onClick={handleShowProduct}
        className="p-2 rounded-full border-4 bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Show Product
      </button>
      {showAddToCartButton  && (
        <button
          onClick={handleAddToCart}
          className="p-2 rounded-full border-4 bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add To Cart
        </button>
      ) }
      {error && (
        <p role="alert" className="text-center text-lg font-semibold text-indigo-700 mt-6">
          {error}
        </p>
      )}
    </motion.div>
    </div>
  );
} 
