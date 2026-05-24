import { postProduct } from "../services/apirequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewProduct() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function handlePost(event) {
    event.preventDefault();

    const productData = {
      title,
      description,
      price : Number(price),
    };

    postProduct(productData)
      .then((id) => {
        setMessage("Product added successfully!");
        setTimeout(() => {
          navigate(`/products/${id - 1}`);
        }, 1000);
      })
      .catch((error) => {
        setMessage(
          "Error adding product. Please try again. the error is " +
            error.message,
        );
      });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-sm md:text-3xl font-bold mb-6 text-indigo-700 m-auto text-center">
        Add New Product
      </h1>
      {message && (
        <p className="mt-4 text-center text-lg font-semibold text-indigo-700">
          {message}
        </p>
      )}
      <form
        onSubmit={handlePost}
        className="bg-white border-4 border-indigo-500/75 shadow-md p-6 rounded-xl"
      >
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
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
