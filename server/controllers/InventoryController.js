const { Tablets } = require("../models");

//List
const getInventory = async (req, res) => {
  const inventory = await Tablets.findAll();
  res.json(inventory);
};

//Count All items in the inventory
const countAllItems = async (req, res) => {
  const items = await Tablets.count();
  res.json(items);
};

//Adding an item to the inventory
const addInventory = async (req, res) => {
  const {
    AssetNumber,
    AssetName,
    AssetStatus,
    facility,
    serialNumber,
    Passcode,
    Email,
    EmailPassword,
  } = req.body;
  Tablets.create({
    AssetNumber: AssetNumber,
    AssetName: AssetName,
    AssetStatus: AssetStatus,
    facility: facility,
    serialNumber: serialNumber,
    Passcode,
    Email,
    EmailPassword,
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
      serialNumber,
      AssetStatus,
      facility,
      Passcode,
      Email,
      EmailPassword,
    } = req.body;
    const findItemById = await Tablets.findOne({
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
    if (serialNumber) findItemById.serialNumber = serialNumber;
    if (Passcode) findItemById.Passcode = Passcode;
    if (Email) findItemById.Email = Email;
    if (EmailPassword) findItemById.EmailPassword = EmailPassword;

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
    const findOneById = await Tablets.findByPk(id);
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

  await Tablets.destroy({
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
