import Product from "../models/Product.js";
import mongoose from "mongoose";

async function getAll(req, res, next) {
  try {
    const products = await Product.find();

    res.status(200).json({ message: "All products", data: products });
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

    const product = await Product.findById(id);

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    if (!req.body.title || !req.body.price) {
      const err = new Error("Title and price are required");
      err.statusCode = 400;
      throw err;
    }
    const product = new Product(req.body);
    const saved = await product.save();

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

    if (!req.body.title || !req.body.price) {
      const err = new Error("Title and price are required");
      err.statusCode = 400;
      throw err;
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      const err = new Error("Product not found");
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

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
}

async function searchProductsByTitle(req, res, next) {
  try {
    const { query } = req.query;

    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json({ message: "Search results", data: products });
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
  searchProductsByTitle,
};
