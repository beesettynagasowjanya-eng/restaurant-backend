const express = require("express");
const router = express.Router();

const {
  addMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addMenuItem);

router.get("/", getMenuItems);

router.get("/:id", getMenuItemById);

router.put("/:id", protect, updateMenuItem);

router.delete("/:id", protect, deleteMenuItem);

module.exports = router;