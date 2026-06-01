import axios from "axios";

export function fetchProducts() {
  //await new Promise((resolve) => setTimeout(resolve, 500));

  return "https://dummyjson.com/products?limit=10";
}

export function getProduct(id) {
  return `https://dummyjson.com/products/${id}`;
}

export async function postProduct(productData) {
  const response = await axios.post(
    "https://dummyjson.com/products/add",
    productData,
  );
  return response.data.id;
}

export function searchProductsByQuery(query) {
   (resolve) => setTimeout(resolve, 500);

  return `https://dummyjson.com/products/search?limit=10&q=${encodeURIComponent(query)}`;
}

export function getCart() {
  return "https://dummyjson.com/carts/1";
}

export async function addToCart(productId) {
  const response = await axios.put(`https://dummyjson.com/carts/1`, {
    productId,
    quantity: 1,
  });
  return response.data;
}
