const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.menuId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;

    cart.items.forEach((item) => {
      total += item.menuId.price * item.quantity;
    });

    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount: total,
      paymentMethod: paymentMethod || "COD",
      paymentStatus:
        paymentMethod === "Online" ? "Paid" : "Pending",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.menuId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};