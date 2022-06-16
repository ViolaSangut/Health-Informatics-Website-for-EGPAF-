const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");

//List
router.route("/").get(InventoryController.getInventory);
//Add
router.route("/addInventory").get(InventoryController.addInventory);
//DeleteI
router.route("/delete/:id").delete(InventoryController.deleteItem);

//Find By Id
router.route("/find/:id").get(InventoryController.findItemById);
//Count all Items
router.route("/countAllItems").get(InventoryController.countAllItems);
//update
router.put("/:id", InventoryController.updateInventory);

module.exports = router;
