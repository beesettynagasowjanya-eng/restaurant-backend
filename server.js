require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Restaurant Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/cart", cartRoutes);
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);
