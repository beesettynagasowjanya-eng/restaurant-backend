const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};