const express = require("express");
const router = express.Router();
const TicketsController = require("../controllers/TicketsController");

const verifyToken = require("../middleware/VerifyToken");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");

//List
router.route('/').get(TicketsController.getTickets);

//List
router.route('/getNoOfWeeklyTickets').get(TicketsController.getNoOfWeeklyTickets);

//No of All tickets 
router.route('/countAllTickets').get(TicketsController.countAllTickets);

//No of Unassigned tickets 
router.route('/countUnassignedTickets').get(TicketsController.countUnsignedTickets);

//No of Pending tickets 
router.route('/countPendingTickets').get(TicketsController.countpendingTickets);

//No of Resolved tickets 
router.route('/countResolvedTickets').get(TicketsController.countResolvedTickets);

//No of today's tickets 
router.route('/countTodaysTickets').get(TicketsController.countTodaysTickets);

//No of today's tickets  test
router.route('/percentageCountOfTodaysResolvedTickets').get(TicketsController.percentageCountTodaysResolvedTickets);


//No of today's resolved tickets 
router.route('/countTodaysResolvedTickets').get(TicketsController.countTodaysResolvedTickets);
// Add
router.route('/addticket').post(TicketsController.addTicket);
//Delete
router.route("/delete/:id").delete(TicketsController.deleteTicket)

//Find By Id
router.route("/:id").get(TicketsController.findTicketById);
//update 
router.put("/:id", TicketsController.updateTicket);


module.exports = router;






























