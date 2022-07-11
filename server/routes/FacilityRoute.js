const express = require("express");
const router = express.Router();
const FacilityControllers = require("../controllers/FacilityControllers");

//List
router.route('/').get(FacilityControllers.getFacilities);
//Count HomaBay Facilities
router.route('/countHomaBayFacilities').get(FacilityControllers.countHomaByFacilities);

// Add
router.route('/addfacility').post(FacilityControllers.addFacilities);

//Delete
router.route("/delete/:id").delete(FacilityControllers.deleteFacility);
//Find By Id
router.route("/:id").get(FacilityControllers.findFacilityById);
//update
router.put("/:id", FacilityControllers.updateFacility);

// router.route('/getNoOfWeeklyTickets').get(TicketsController.getNoOfWeeklyTickets);
module.exports = router;
































