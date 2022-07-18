const express = require("express");
const router = express.Router();
const FacilityControllers = require("../controllers/FacilityControllers");

//List
router.route('/').get(FacilityControllers.getFacilities);

//Count HomaBay Facilities
router.route('/countHomaBayFacilities').get(FacilityControllers.countHomaBayFacilities);

//Count Kiambu Facilities
router.route('/countKiambuFacilities').get(FacilityControllers.countKiambuFacilities);

//Count Kisii Facilities
router.route('/countKisiiFacilities').get(FacilityControllers.countKisiiFacilities);

//EMR Implementation Status
router.route('/emrimplementation').get(FacilityControllers.EMRImplementation);

//EMR Implementation Status
router.route('/adtimplementation').get(FacilityControllers.ADTImplementation);

//List HomaBay Facilities
router.route('/homabayfacilities').get(FacilityControllers.getHomaBayFacilities);

//List HomaBay Facilities
router.route('/Kiambufacilities').get(FacilityControllers.getKiambuFacilities);

//List Kisii Facilities
router.route('/kisiifacilities').get(FacilityControllers.getKisiiFacilities);

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
































