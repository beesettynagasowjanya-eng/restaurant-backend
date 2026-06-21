const Menu = require("../models/Menu");

// ADD FOOD ITEM
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const menuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL FOOD ITEMS
const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE FOOD ITEM
const getMenuItemById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE FOOD ITEM
const updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE FOOD ITEM
const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Food item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};