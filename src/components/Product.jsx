import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/apirequest";
import { useState } from "react";
import { motion } from "framer-motion";
import ErrorPage from "./ErrorPage";

export default function Product({ product, showAddToCartButton  }) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  function handleShowProduct() {
    navigate(`/products/${product._id}`);
  }

  function handleAddToCart() {
    const cartId = "6a25e4c6545a85eee5159a5b"; // Replace with actual cart ID
    addToCart(cartId, product, 1) //network call
      .then(() => {
        navigate("/cart", { state: { message: `Product ${product.title} added to cart successfully!` } });
      })
      .catch((error) => {
        setError(error);
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
      <h2 className="text-xl font-semibold mb-2 text-center text-indigo-700">
        {product.title}
      </h2>
      <img
        src={product.img}
        alt={product.title}
        className="w-56 m-auto h-44 object-cover mb-4 rounded border-indigo-500/75 text-center"
      />
      <p className="text-2xl font-bold text-indigo-700">${product.price}</p>
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
      {(error && error.response?.status === 404)? (
        <div className="col-span-full flex flex-col items-center gap-4">
            <img
              src="/images/page-not-found.svg"
              alt="page not found"
              className="w-64"
            />

            <h2 className="text-2xl font-bold text-indigo-700">
              page Not Found
            </h2>
          </div>
      ) : error && (
        <ErrorPage></ErrorPage>
      )}
    </motion.div>
    </div>
  );
} 
