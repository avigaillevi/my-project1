import axios from "axios";

export function fetchProducts() {
  //await new Promise((resolve) => setTimeout(resolve, 500));

  return "http://localhost:5000/api/products/";
}

export function getProduct(id) {
  return `http://localhost:5000/api/products/${id}`;
}

export async function postProduct(productData) {
  const response = await axios.post(
    "http://localhost:5000/api/products/",
    productData,
  );
  return response.data._id;
}

export function searchProductsByQuery(query) {
  (resolve) => setTimeout(resolve, 500);

  return `http://localhost:5000/api/products/search?query=${encodeURIComponent(query)}`;
}

export function getCart() {
  return "http://localhost:5000/api/carts/6a25e4c6545a85eee5159a5b";
}

export async function addToCart(productId, quantity) {
  const response = await axios.put(
    `http://localhost:5000/api/carts/add/6a25e4c6545a85eee5159a5b`,
    {
      productId: productId._id,
      quantity,
    },
  );
  return response.data;
}
