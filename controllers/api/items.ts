const Item = require("../../models/item");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

const addItem = async (req, res) => {
  try {
    const newItemData = req.body;

    // check if item with same itemId exists in database
    const checkExisting = await Item.findOne({ itemId: newItemData.itemId });

    if (checkExisting) {
      return res
        .status(400)
        .json({ error: "This item already exists in the database" });
    }

    const newItem = await Item.create(newItemData);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

module.exports = {
  getAllItems,
  addItem,
};
