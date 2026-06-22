const Cart = require("../models/cartModel");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ menuId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.menuId && i.menuId.toString() === menuId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ menuId, quantity });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.menuId");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};