import axios from "axios";

export async function products() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await axios.get("https://dummyjson.com/products?limit=10");
  return response.data;
}

export async function getProduct(id) {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
}

export async function postProduct(productData) {
  const response = await axios.post(
    "https://dummyjson.com/products/add",
    productData,
  );
  return response.data.id;
}

export async function searchText(query) {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
  );
  return response.data;
}

export async function getCart() {
  const response = await axios.get("https://dummyjson.com/carts/1");
  return response.data;
}

export async function addToCart(productId) {
  const response = await axios.put(`https://dummyjson.com/carts/1`, {
    productId,
    quantity: 1,
  });
  return response.data;
}
