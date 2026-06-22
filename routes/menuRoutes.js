const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  addMenuItem,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

router.get("/", getMenu);

router.post("/", protect, isAdmin, addMenuItem);

router.put("/:id", protect, isAdmin, updateMenuItem);

router.delete("/:id", protect, isAdmin, deleteMenuItem);

module.exports = router;