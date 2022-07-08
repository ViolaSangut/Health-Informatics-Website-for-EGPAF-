const express = require("express");
const router = express.Router();
const FacilityControllers = require("../controllers/FacilityControllers");

//List
router.route('/').get(FacilityControllers.getFacilities);

// Add
router.route('/addfacility').post(FacilityControllers.addFacilities);

//Delete
router.route("/delete/:id").delete(FacilityControllers.deleteFacility);
//Find By Id
router.route("/:id").get(FacilityControllers.findFacilityById);
//update
router.put("/:id", FacilityControllers.updateFacility);
module.exports = router;






























