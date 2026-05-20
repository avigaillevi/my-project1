import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/apirequest";

export default function Product({ product, dontshowaddcartbutton }) {
  const navigate = useNavigate();

  function handleShowProduct() {
    navigate(`/products/${product.id}`);
  }

  function handleAddToCart() {
    addToCart() //network call
      .then((data) => {
        alert(`Product ${data.title} added to cart successfully!`); // Show a success message to the user
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Error adding product to cart. Please try again.");
      });
  }

  return (
    <div className="bg-white border-4 border-indigo-500/75 shadow-md p-4 rounded-xl text-center">
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
        className="p-2 rounded-full border-4 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Show Product
      </button>
      {!dontshowaddcartbutton ? (
        <button
          onClick={handleAddToCart}
          className="p-2 rounded-full border-4 bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add To Cart
        </button>
      ) : (
        <></>
      )}
    </div>
  );
} 
