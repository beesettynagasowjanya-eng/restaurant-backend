const Menu = require("../models/menuModel");

// ADD FOOD (ADMIN)
exports.addMenuItem = async (req, res) => {
  try {
    const item = await Menu.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL FOOD (USER)
exports.getMenu = async (req, res) => {
  try {
    const items = await Menu.find({ isAvailable: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE FOOD (ADMIN)
exports.updateMenuItem = async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE FOOD (ADMIN)
exports.deleteMenuItem = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};