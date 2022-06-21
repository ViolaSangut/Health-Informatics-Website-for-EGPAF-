const { Inventory } = require("../models");

//List
const getInventory = async (req, res) => {
  const inventory = await Inventory.findAll();
  res.json(inventory);
};

//Count All items in the inventory
const countAllItems = async (req, res) => {
  const items = await Inventory.count();
  res.json(items);
};

//Adding an item to the inventory
const addInventory = async (req, res) => {
  const {
    AssetNumber,
    AssetName,
    DateRegistered,
    AssetStatus,
    facility,
    ItemType,
  } = req.body;
  Inventory.create({
    AssetNumber: AssetNumber,
    AssetName: AssetName,
    DateRegistered: DateRegistered,
    AssetStatus: AssetStatus,
    facility: facility,
    ItemType: ItemType,
  })
    .then(() => {
      res.json("Item added Succesfully!");
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({ error: error });
      }
    });
};

//Updating an item on the Inventory
const updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      AssetNumber,
      AssetName,
      ItemType,
      AssetStatus,
      facility,
      DateRegistered,
    } = req.body;
    const findItemById = await Inventory.findOne({
      where: {
        id: id,
      },
    });
    if (!findItemById) {
      res.status(404).send({
        status: "error",
        message: `Item with id: ${id} not found`,
      });
    }
    if (AssetNumber) findItemById.AssetNumber = AssetNumber;
    if (AssetStatus) findItemById.AssetStatus = AssetStatus;
    if (AssetName) findItemById.AssetName = AssetName;
    if (facility) findItemById.facility = facility;
    if (ItemType) findItemById.ItemType = ItemType;
    if (DateRegistered) findItemById.DateRegistered;

    const updatedItem = await findItemById.save();
    if (!updatedItem) {
      res.status(404).send({
        status: "error",
        message: `Item with id: ${id} not found`,
      });
    }
    res.status(200).send({
      status: "success",
      data: updateInventory,
    });
  } catch (error) {
    next(error);
  }
};

//finding an item by id
const findItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOneById = await Inventory.findByPk(id);
    if (!findOneById) {
      res.status(404).send({
        // status: 'error',
        message: `Item with id: ${id} not found`,
      });
    }
    res.status(200).send({
      // status: 'success',
      data: findOneById,
    });
  } catch (error) {
    next(error);
  }
};

//delete item from the inventory
const deleteItem = async (req, res) => {
  const id = req.params.id;

  await Inventory.destroy({
    where: {
      id: id,
    },
  });
  return res.json("Item deleted");
};

module.exports = {
  getInventory,
  countAllItems,
  addInventory,
  findItemById,
  updateInventory,
  deleteItem,
};
