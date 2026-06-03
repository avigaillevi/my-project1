import { useParams } from "react-router";
import { getProduct } from "../services/apirequest";
import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";
import ErrorPage from "../components/ErrorPage";
import ProductSkeleton from "../components/ProductSkeleton";

export default function ProductDetails() {
  const { id: productId } = useParams();

  const { data: productData, loading, error ,refetch} = useFetch(getProduct(productId));

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-4">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
        Product Details
      </h1>

      {loading ? (
        <ProductSkeleton />
      ) : productData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] mx-auto bg-white border-4 border-indigo-500 shadow-xl rounded-2xl overflow-hidden transition-all duration-300"
        >
          <div className="bg-primary py-4">
            <h2 className="text-3xl font-bold text-white text-center text-indigo-700 px-4">
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
              <div className="bg-indigo-50 border border-primary-border rounded-xl p-2 shadow-sm">
                <p className="text-sm md:text-lg text-gray-500 mb-1">Brand</p>
                <p className="font-bold text-indigo-700">{productData.brand}</p>
              </div>

              <div className="bg-indigo-50 border border-primary-border rounded-xl p-2 shadow-sm">
                <p className="text-sm md:text-lg text-gray-500 mb-1">
                  Category
                </p>
                <p className="font-bold text-indigo-700">
                  {productData.category}
                </p>
              </div>

              <div className="bg-indigo-50 border border-primary-border rounded-xl p-2 shadow-sm">
                <p className="text-sm md:text-lg text-gray-500 mb-1">Rating</p>
                <p className="font-bold text-indigo-700">
                  ⭐ {productData.rating}
                </p>
              </div>

              <div className="bg-indigo-50 border border-primary-border rounded-xl p-2 shadow-sm">
                <p className="text-sm md:text-lg text-gray-500 mb-1">Stock</p>
                <p className="font-bold text-indigo-700">{productData.stock}</p>
              </div>

              <div className="col-span-2 bg-indigo-50 border border-primary-border rounded-xl p-2 shadow-sm">
                <p className="text-sm md:text-lg text-gray-500 mb-1">Weight</p>
                <p className="font-bold text-indigo-700">
                  {productData.weight} kg
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : error?.response?.status === 404 ? (
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
      ) : (
        error && <ErrorPage refetch={refetch}></ErrorPage>
      )}  
    </div>
  );
}
