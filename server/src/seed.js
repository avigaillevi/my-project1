import mongoose from "mongoose";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import connectToDatabase from "./config/db.js";

await connectToDatabase();
// const products = [
//   {
//     title: "Laptop",
//     price: 999.99,
//     category: "Electronics",
//     description: "A high-performance laptop for gaming and productivity.",
//     rating: 4.5,
//     stock: 10,
//     weight: 2.5,
//     img:"https://th.bing.com/th/id/OIP.XdfInyhyD0s7SZ_SmDiN8AHaEp?w=273&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Smartphone",
//     price: 499.99,
//     category: "Electronics",
//     description: "A latest model smartphone with advanced features.",
//     rating: 4.2,
//     stock: 20,
//     weight: 0.2,
//     img: "https://th.bing.com/th/id/OIP.ALVZgjf2jMSXpnvZy1VlpAHaHa?w=182&h=181&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Headphones",
//     price: 199.99,
//     category: "Electronics",
//     description: "Wireless noise-cancelling headphones for immersive audio.",
//     rating: 4.7,
//     stock: 15,
//     weight: 0.5,
//     img: "https://th.bing.com/th/id/OIP.wbLJ-TopeAu6PsKWculBYgHaHa?w=214&h=213&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Coffee Maker",
//     price: 79.99,
//     category: "Home Appliances",
//     description: "A programmable coffee maker for perfect morning brew.",
//     rating: 4.3,
//     stock: 8,
//     weight: 3.0,
//     img: "https://th.bing.com/th/id/OIP.3kLzshX1WbIZ4OeJaFwB2AHaHb?w=175&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Blender",
//     price: 59.99,
//     category: "Home Appliances",
//     description: "A powerful blender for smoothies and shakes.",
//     rating: 4.6,
//     stock: 12,
//     weight: 2.0,
//     img: "https://th.bing.com/th/id/OIP.5og5pgJjsZp5tlSR6BkVFwHaHa?w=189&h=190&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "T-Shirt",
//     price: 19.99,
//     category: "Clothing",
//     description: "A comfortable cotton t-shirt for everyday wear.",
//     rating: 4.1,
//     stock: 25,
//     weight: 0.3,
//     img: "https://th.bing.com/th/id/OIP.F34Qkc2TYpVP99ijaoZE9AHaHa?w=190&h=189&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Jeans",
//     price: 49.99,
//     category: "Clothing",
//     description: "A pair of comfortable denim jeans.",
//     rating: 4.4,
//     stock: 18,
//     weight: 0.8,
//     img: "https://th.bing.com/th/id/OIP.oPIS5AnlpDwj6LgS3rCTEQHaJQ?w=161&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Sneakers",
//     price: 89.99,
//     category: "Footwear",
//     description: "A pair of comfortable sneakers for everyday wear.",
//     rating: 4.8,
//     stock: 12,
//     weight: 0.6,
//     img: "https://th.bing.com/th/id/OIP.fGjJAPk6CXj6v2uIdcwCzQHaE8?w=236&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Sandals",
//     price: 39.99,
//     category: "Footwear",
//     description: "A pair of comfortable sandals for warm weather.",
//     rating: 4.0,
//     stock: 15,
//     weight: 0.4,
//     img: "https://th.bing.com/th/id/OIP.tadMv3_OlWAU1LFELVUKkwHaE9?w=283&h=189&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
//   {
//     title: "Backpack",
//     price: 69.99,
//     category: "Accessories",
//     description: "A durable backpack for school or travel.",
//     rating: 4.5,
//     stock: 10,
//     weight: 1.2,
//     img:"https://th.bing.com/th/id/OIP.HmP_L89yMIc_83cXQdkidwHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   },
// {
//   title: "Watch",
//   price: 149.99,
//   category: "Accessories",
//   description: "A stylish wristwatch with a leather strap.",
//   rating: 4.6,
//   stock: 20,
//   weight: 0.5,
//   img: "https://th.bing.com/th/id/OIP.9sXo2n7l8j3m1v6e9Zz8wHaHa?w=189&h=190&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",  
// }
// ];

const carts = [
  {
    userId: "2",
    products: [],
    total: 1499.97,
    totalProducts: 3,
  },
  {
    userId: "3",
    products: [],
    total: 1699.97,
    totalProducts: 3,
  },
  {
    userId: "4",
    products: [],
    total: 79.99,
    totalProducts: 1,
  },
  {
    userId: "5",
    products: [],
    total: 19.99,
    totalProducts: 1,
  },
  {
    userId: "6",
    products: [],
    total: 49.99,
    totalProducts: 1,
  },
  {
    userId: "7",
    products: [],
    total: 89.99,
    totalProducts: 1,
  },
  {
    userId: "8",
    products: [],
    total: 69.99,
    totalProducts: 1,
  },
  {
    userId: "9",
    products:[],
    total: 199.99,
    totalProducts: 1,
  },
  {
    userId: "10",
    products: [],
    total: 149.98,
    totalProducts: 2,
  },
];

//await Product.deleteMany({});
//await Product.insertMany(products);
//console.log("Products seeded successfully");

await Cart.deleteMany({});
await Cart.insertMany(carts);
console.log("Carts seeded successfully");

await mongoose.disconnect();
