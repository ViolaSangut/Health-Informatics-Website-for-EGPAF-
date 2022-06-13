const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");

//List
router.route("/").get(InventoryController.getInventory);
// Add
router.route("/addInventory").get(InventoryController.addInventory);
//Delete
router.route("/delete/:id").delete(InventoryController.deleteInventory);

//Find By Id
router.route("/:id").get(InventoryController.getInventory);
//update
router.put("/:id", InventoryController.updateInventory);

module.exports = router;
