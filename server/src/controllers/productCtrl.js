import Product from '../models/Product.js';

function getAll(req, res) {
  Product.find()
    .then(products => {
      res.status(200).json({ message: "All products", data: products });
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching products", error });
    });
}

function getById(req, res) {
  const { id } = req.params;

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ data: product });
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching product", error });
    });
}

function create(req, res) {
  const product = new Product(req.body);

  product.save()
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "Error creating product", error });
    });
}

function update(req, res) {
  const { id } = req.params;

  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then(updated => {
      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "Error updating product", error });
    });
}

function remove(req, res) {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(deleted);
    })
    .catch(error => {
      res.status(500).json({ message: "Error deleting product", error });
    });
}

function searchbyText(req, res) {
  const { query } = req.query;

  Product.find({ title: { $regex: query, $options: 'i' } })
    .then(products => {
      res.status(200).json({ message: "Search results", data: products });
    })
    .catch(error => {
      res.status(500).json({ message: "Error searching products", error });
    });
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  searchbyText
};