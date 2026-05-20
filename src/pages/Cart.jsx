import { useState, useEffect } from "react";
import { getCart } from "../services/apirequest";
import Product from "../components/Product";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart()
      .then((data) => {
        setCartItems(data.products);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        alert("Error fetching cart items. Please try again.");
      });
  }, []);

  return (
    <div className=" text-sm md:max-w-md mx-auto mt-8 bg-white border-4 border-indigo-500 rounded-2xl shadow-xl p-5">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-5">
        Cart
      </h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Product product={item} dontshowaddcartbutton={true} />
          </div>
        ))}
      </ul>
    </div>
  );
}
