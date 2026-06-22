const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      totalUsers: users,
      totalOrders: orders,
      totalRevenue: revenueAgg[0]?.total || 0,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};