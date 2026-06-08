# 🖥️ Backend Server - Full Stack Project

## 📌 Description

This is a Node.js + Express backend connected to a local MongoDB database.

It provides a REST API for managing products and shopping carts.

---

## ⚙️ Tech Stack

- Node.js
- Express
- MongoDB (Local)
- Mongoose
- dotenv
- cors

---

## 📦 Installation

```bash
cd server
npm install
```

---

## 🔐 Environment Variables

Created a .env file inside the server folder:

```js
PORT=5000
MONGO_URI=mongodb://localhost:27017/my-project-db
```

---

## ▶️ Run the Server

```bash
npx nodemon src/server.js
```

Server will run on:

http://localhost:5000

---

## 📡 API Endpoints

### 🛍️ Products

GET /api/products – Get all products
GET /api/products/:id – Get product by id
POST /api/products – Create product
PUT /api/products/:id – Update product
DELETE /api/products/:id – Delete product
GET /api/products/search?query= – Search products by text

### 🛒 Cart

GET /api/carts – Get all carts
GET /api/carts/:id – Get cart by id
POST /api/carts – Create cart
PUT /api/carts/:id – Update cart
POST /api/carts/add/:id – Add product to cart / update quantity

---

## 📊 Status Codes

200 OK – Request successful
201 Created – Resource created successfully
400 Bad Request – Invalid input
404 Not Found – Resource not found
500 Internal Server Error – Server error

---

## 🧠 Notes

MongoDB runs locally using MongoDB Community Server
Data can be viewed using MongoDB Compass
All API requests are served from http://localhost:5000

---

## 📮 Postman Collection

You can import the Postman collection to test the API.

📁 File location:
`/server/postman/postman_collection.json`

Download Postman Collection: [here](./postman/postman_collection.json)

### How to use:

1. Open Postman
2. Click "Import"
3. Select the JSON file
4. Run the requests

The collection includes:

- Products API requests
- Cart API requests
- Full CRUD operations
