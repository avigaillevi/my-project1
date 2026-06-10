import axios from "axios";
 const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export function fetchProducts() {
  return `${api.defaults.baseURL}/products/`;
}

export function getProduct(id) {
  return `${api.defaults.baseURL}/products/${id}`;
}

export async function postProduct(productData) {
  const response = await api.post(
    `/products/`,
    productData,
  );
  return response.data._id;
}

export function searchProductsByQuery(query) {
  return `${api.defaults.baseURL}/products/search?query=${encodeURIComponent(query)}`;
}

export function getCart(cartId) {
  return `${api.defaults.baseURL}/carts/${cartId}`;
}

export async function addToCart(cartId, productId, quantity) {
  const response = await api.put(
    `/carts/add/${cartId}`,
    {
      productId: productId._id,
      quantity,
    },
  );
  return response.data;
}
