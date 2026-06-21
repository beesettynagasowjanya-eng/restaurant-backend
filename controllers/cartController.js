const Cart = require("../models/cartModel");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;

    const cartItem = await Cart.create({
      menuId,
      quantity
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("menuId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};