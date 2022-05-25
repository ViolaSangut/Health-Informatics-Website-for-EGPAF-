const express = require("express");
const router = express.Router();
const TicketsController = require("../controllers/TicketsController");

//List
router.route('/').get(TicketsController.getTickets);
// Add
router.route('/addticket').post(TicketsController.addTicket);
//Delete
router.route("/delete/:id").delete(TicketsController.deleteTicket)

//Find By Id
router.route("/:id").get(TicketsController.findTicketById);
//update 
router.put("/:id", TicketsController.updateTicket);

module.exports = router;






























