import { postProduct } from "../services/apirequest";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();

  function handlePost(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const productData = {
      title,
      description,
      price,
    };

    postProduct(productData)
      .then((id) => {
        alert("Product added successfully!"); // Show a success message to the user
        navigate(`/products/${id}`); // Navigate to the product details page for the newly added product
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
      });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-sm md:text-3xl font-bold mb-6 text-indigo-700 m-auto text-center">
        Add New Product
      </h1>
      <form className="bg-white border-4 border-indigo-500/75 shadow-md p-6 rounded-xl">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Product Title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Product Description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Product Price"
          />

          <button
            onClick={handlePost}
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mt-4"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
