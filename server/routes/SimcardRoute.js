const express = require("express");
const router = express.Router();
const SimcardController = require("../controllers/SimcardController");
const { verifyToken } = require("../middleware/VerifyToken");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");

//List
router
  .route("/")
  .get(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    SimcardController.getSimcard
  );

//Add
router
  .route("/addsimcards")
  .post(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    SimcardController.addCard
  );

//Delete
router
  .route("/delete/:id")
  .delete(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    SimcardController.deleteCard
  );

//Find By Id
router
  .route("/find/:id")
  .get(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    SimcardController.findCardbyID
  );

//Count all Items
router.route("/countAllCards").get(SimcardController.countAllCards);

//update
router.put(
  "/:id",
  verifyToken,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
  SimcardController.updateCard
);

module.exports = router;
