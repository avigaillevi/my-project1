import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

async function getAll(req, res, next) {
  try {
    const carts = await Cart.find().populate("products.productId");

    res.status(200).json({ message: "All carts", data: carts });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("Invalid ID format");
      err.statusCode = 400;
      throw err;
    }

    const cart = await Cart.findById(id).populate("products.productId");

    if (!cart) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ data: cart });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    if (!req.body.products) {
      const err = new Error("Products are required");
      err.statusCode = 400;
      throw err;
    }
    const cart = new Cart(req.body);
    const saved = await cart.save();

    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("Invalid ID format");
      err.statusCode = 400;
      throw err;
    }

    const updated = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("Invalid ID format");
      err.statusCode = 400;
      throw err;
    }

    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    next(error);
  }
}

async function addToCart(req, res, next) {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(productId)) {
      const err = new Error("Invalid ID format");
      err.statusCode = 400;
      throw err;
    }
    if (typeof quantity !== "number" || quantity === 0) {
      const err = new Error("Quantity must be a non-zero number");
      err.statusCode = 400;
      throw err;
    }

    const cart = await Cart.findById(id);

    if (!cart) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    const product = await Product.findById(productId);

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;

      if (existingProduct.quantity <= 0) {
        cart.products = cart.products.filter(
          (p) => p.productId.toString() !== productId,
        );

        cart.totalProducts -= 1;
        cart.total -= product.price;

        const updated = await cart.save();

        return res.status(200).json({
          message: "Product removed from cart",
          data: updated,
        });
      }
    } else {
      cart.products.push({
        productId,
        quantity,
      });
    }

    cart.totalProducts += quantity;
    cart.total += product.price * quantity;

    const updatedCart = await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  addToCart,
};
