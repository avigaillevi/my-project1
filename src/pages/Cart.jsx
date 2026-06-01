
import { getCart } from "../services/apirequest";
import Product from "../components/Product";
import useFetch  from "../hooks/useFetch";

export default function Cart() {
  const {data:cartItems , loading , error} = useFetch(getCart())


  return (
    <div className=" text-sm md:max-w-md mx-auto mt-8 bg-white border-4 border-indigo-500 rounded-2xl shadow-xl p-5">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-5">
        Cart
      </h1>
      {error ? (
        <p role="alert" className="text-center text-lg font-semibold text-red-500 mt-6">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-center text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading...
        </p>
      ) : cartItems.products.length === 0 ? (
        <p className="text-center text-2xl font-semibold text-indigo-600">
          Your cart is empty. Please add some products to your cart.
        </p>
      ) : (
        <ul className="space-y-4">
          {cartItems.products.map((item) => (
            <div
              key={item.id}
              className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Product product={item} showAddToCartButton ={false} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
