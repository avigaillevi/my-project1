import { getCart } from "../services/apirequest";
import Product from "../components/Product";
import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";
import ErrorPage from "../components/ErrorPage";

export default function Cart() {
  const { data: cartItems, loading, error, refetch } = useFetch(getCart());
  // Check if the cart is empty
  const isCartEmpty =
    cartItems && cartItems.products && cartItems.products.length === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" text-sm md:max-w-md mx-auto mt-8 bg-white border-4 border-indigo-500 rounded-2xl shadow-xl p-5"
    >
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-5">
        Cart
      </h1>
      {loading ? (
        <div className="w-full max-w-[420px] mx-auto bg-white rounded-2xl p-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-6"></div>

          <div className="w-56 h-56 bg-gray-200 rounded-xl animate-pulse mx-auto mb-6"></div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ) : isCartEmpty ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src="/images/empty-cart.svg"
            alt="No product found"
            className="w-64"
          />

          <h2 className="text-2xl font-bold text-indigo-700">
            your cart is empty
          </h2>
        </div>
      ) : (error && error.status === 404) ? (
        <div className="col-span-full flex flex-col items-center gap-4">
          <img
            src="/images/page-not-found.svg"
            alt="page not found"
            className="w-64"
          />

          <h2 className="text-2xl font-bold text-indigo-700">page Not Found</h2>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-full"
          >
            Try Again
          </button>
        </div>
      ) : error ?( <ErrorPage></ErrorPage>) : (
          <ul className="space-y-4">
            {cartItems.products.map((item) => (
              <div
                key={item.id}
                className="rounded-sm md:bg-indigo-50 md:border-2 md:border-primary-border md:rounded-xl md:p-3 md:shadow-sm md:hover:shadow-md md:transition-all md:duration-200"
              >
                <Product product={item} showAddToCartButton={false} />
              </div>
            ))}
          </ul>
        )
      }
    </motion.div>
  );
}
