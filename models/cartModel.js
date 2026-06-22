const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// 👇 IMPORTANT FIX (prevents overwrite error)
module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);