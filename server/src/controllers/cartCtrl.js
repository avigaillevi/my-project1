import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
function getAll(req, res) {
  Cart.find()
    .populate("products.productId")
    .then((carts) => {
      res.status(200).json({ message: "All carts", data: carts });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching carts", error });
    });
}

function getById(req, res) {
  const { id } = req.params;
  Cart.findById(id)
    .populate("products.productId")
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json({ data: cart });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching cart", error });
    });
}

function create(req, res) {
  const cart = new Cart(req.body);
  cart
    .save()
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating cart", error });
    });
}

function update(req, res) {
  const { id } = req.params;
  Cart.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(updated);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating cart", error });
    });
}

function remove(req, res) {
  const { id } = req.params;
  Cart.findByIdAndDelete(id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json({ message: "Cart deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting cart", error });
    });
}

async function addToCart(req, res) {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findById(id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity <= 0) {
        cart.products = cart.products.filter(
          (p) => p.productId.toString() !== productId
        );
        cart.totalProducts -= 1;
        cart.total -= product.price ;
        return res.status(200).json({
          message: "Product removed from cart",
          data: await cart.save(),
        });
      }
    } else {
      console.log("Adding new product to cart:", { productId, quantity });
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
    console.error(error);

    res.status(500).json({
      message: "Error adding to cart",
      error: error.message,
    });
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
