const express = require("express");
const router = express.Router();
const FacilityControllers = require("../controllers/FacilityControllers");
const { verifyToken } = require("../middleware/VerifyToken");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");

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

//ADT Implementation Status
router.route('/adtimplementation').get(FacilityControllers.ADTImplementation);

//Summary Implementation Status
router.route('/summaryimplementation').get(FacilityControllers.SummaryImplementation)

//List HomaBay Facilities
router.route('/homabayfacilities').get(FacilityControllers.getHomaBayFacilities);

//List HomaBay Facilities
router.route('/Kiambufacilities').get(FacilityControllers.getKiambuFacilities);

//List Kisii Facilities
router.route('/kisiifacilities').get(FacilityControllers.getKisiiFacilities);

// Add
router.route('/addfacility').post( 
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),FacilityControllers.addFacilities);

//Delete
router.route("/delete/:id").delete(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User), FacilityControllers.deleteFacility);
//Find By Id
router.route("/:id").get(FacilityControllers.findFacilityById);
//update
router.put("/:id",  verifyToken,
verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User), FacilityControllers.updateFacility);

// router.route('/getNoOfWeeklyTickets').get(TicketsController.getNoOfWeeklyTickets);
module.exports = router;
































