import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "../services/apirequest";

export default function ProductDetails() {
  const { id: productId } = useParams();

  const [error, setError] = useState("");

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(productId) //network call
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        setError("Error fetching product details. Please try again. the error is " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-4">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
        Product Details
      </h1>

      {loading ? (
        <p className="text-center text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading...
        </p>
      ) : productData ? (
        <div className="w-[420px] mx-auto bg-white border-4 border-indigo-500 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
          <div className="bg-indigo-500 py-4">
            <h2 className="text-3xl font-bold text-white text-center px-4">
              {productData.title}
            </h2>
          </div>

          <div className="p-4">
            <div className="flex justify-center mb-8">
              <img
                src={productData.thumbnail}
                alt={productData.title}
                className="w-56 h-56 object-cover rounded-xl border-4 border-indigo-300 shadow-lg"
              />
            </div>

            <p className="text-gray-700 text-lg leading-8 text-center mb-8">
              {productData.description}
            </p>

            <div className="text-center mb-8">
              <p className="text-2xl font-extrabold text-indigo-700">
                ${productData.price}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Brand</p>
                <p className="font-bold text-indigo-700">{productData.brand}</p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-bold text-indigo-700">
                  {productData.category}
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Rating</p>
                <p className="font-bold text-indigo-700">
                  ⭐ {productData.rating}
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Stock</p>
                <p className="font-bold text-indigo-700">{productData.stock}</p>
              </div>

              <div className="col-span-2 bg-indigo-50 border border-indigo-200 rounded-xl p-2 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Weight</p>
                <p className="font-bold text-indigo-700">
                  {productData.weight} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold text-red-500">
          Product not found.
        </p>
      )}
      {error && (
        <p role="alert" className="text-center text-lg font-semibold text-red-500 mb-6">
          {error}
        </p>
      )}
    </div>
  );
}
