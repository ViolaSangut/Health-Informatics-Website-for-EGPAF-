const express = require("express");
const router = express.Router();
const SimcardController = require("../controllers/SimcardController");

//List
router.route("/").get(SimcardController.getSimcard);
//Add
router.route("/addsimcards").post(SimcardController.addCard);
//DeleteI
router.route("/delete/:id").delete(SimcardController.deleteCard);

//Find By Id
router.route("/find/:id").get(SimcardController.findCardbyID);
//Count all Items
router.route("/countAllCards").get(SimcardController.countAllCards);
//update
router.put("/:id", SimcardController.updateCard);

module.exports = router;
