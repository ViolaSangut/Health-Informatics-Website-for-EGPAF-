const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");
const { verifyToken } = require("../middleware/VerifyToken");

//List
router
  .route("/")
  .get(
    // verifyToken,
    // verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    InventoryController.getInventory
  );

//Add
router
  .route("/addInventory")
  .post(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    InventoryController.addInventory
  );

//Delete
router
  .route("/delete/:id")
  .delete(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    InventoryController.deleteItem
  );

//Find By Id
router
  .route("/find/:id")
  .get(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    InventoryController.findItemById
  );

//Count all Items
router.route("/countAllItems").get(InventoryController.countAllItems);

//update
router.put(
  "/:id",
  verifyToken,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
  InventoryController.updateInventory
);

module.exports = router;
