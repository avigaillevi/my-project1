import { postProduct } from "../services/apirequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorPage from "../components/ErrorPage";

export default function NewProduct() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStack] = useState("");
  const [weight, setWeight] = useState("");
  const [img, setImgUrl] = useState("");

  function handlePost(event) {
    event.preventDefault();

    const productData = {
      title,
      price: Number(price),
      category,
      description,
      rating,
      stock,
      weight,
      img,
    };
    const numericPrice = Number(price);
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      setMessage("Price must be a positive number");
      return;
    }
    postProduct(productData)
      .then((id) => {
        setMessage("Product added successfully!");
        setTimeout(() => {
          navigate(`/products/${id}`);
        }, 10000);
      })
      .catch(() => {
        setMessage(
          "Error adding product. Please try again. We could not save the product right now. ",
        );
      });
  }

  function handleTryAgain() {
    navigate("/products/add"); // Navigate to the home page to trigger a re-fetch of products
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
      {message.includes("Error") && (
        <ErrorPage refetch={handleTryAgain}></ErrorPage>
      )}
      <form
        onSubmit={handlePost}
        className="bg-white border-4 border-indigo-500/75 shadow-md p-6 rounded-xl"
      >
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rating"
            type="number"
            placeholder="Product Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="stack"
          >
            Stack
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stack"
            type="text"
            placeholder="Product Stack"
            value={stock}
            onChange={(e) => setStack(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="weight"
          >
            Weight
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weight"
            type="text"
            placeholder="Product Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="imgUrl"
          >
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imgUrl"
            type="text"
            placeholder="Product Image URL"
            value={img}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-slate-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover mt-4"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
