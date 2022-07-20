const express = require("express");
const router = express.Router();
const TicketsController = require("../controllers/TicketsController");

const { verifyToken } = require("../middleware/VerifyToken");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");

//List
router
  .route("/")
  .get(
    // verifyToken,
    // verifyRole(
    //   ROLES_LIST.Admin,
    //   ROLES_LIST.User,
    //   ROLES_LIST.Manager,
    //   ROLES_LIST.Super_User
    // ),
    TicketsController.getTickets
  );

//getNoOfWeeklyTickets
router
  .route("/getNoOfWeeklyTickets")
  .get(TicketsController.getNoOfWeeklyTickets);

//No of All tickets
router.route("/countAllTickets").get(TicketsController.countAllTickets);

//No of Unassigned tickets
router
  .route("/countUnassignedTickets")
  .get(TicketsController.countUnsignedTickets);

//No of Pending tickets
router.route("/countPendingTickets").get(TicketsController.countpendingTickets);

//No of Resolved tickets
router
  .route("/countResolvedTickets")
  .get(TicketsController.countResolvedTickets);

//No of today's tickets
router.route("/countTodaysTickets").get(TicketsController.countTodaysTickets);

//No of today's tickets  test
router
  .route("/percentageCountOfTodaysResolvedTickets")
  .get(TicketsController.percentageCountTodaysResolvedTickets);

//No of today's resolved tickets
router
  .route("/countTodaysResolvedTickets")
  .get(TicketsController.countTodaysResolvedTickets);
// Add
router
  .route("/addticket")
  .post(
    verifyToken,
    verifyRole(
      ROLES_LIST.Admin,
      ROLES_LIST.User,
      ROLES_LIST.Manager,
      ROLES_LIST.Super_User
    ),
    TicketsController.addTicket
  );
//Delete
router
  .route("/delete/:id")
  .delete(
    verifyToken,
    verifyRole(
      ROLES_LIST.Admin,
      ROLES_LIST.User,
      ROLES_LIST.Manager,
      ROLES_LIST.Super_User
    ),
    TicketsController.deleteTicket
  );

//Find By Id
router.route("/:id").get(TicketsController.findTicketById);
//update
router.put(
  "/:id",
  verifyToken,
  verifyRole(
    ROLES_LIST.Admin,
    ROLES_LIST.User,
    ROLES_LIST.Manager,
    ROLES_LIST.Super_User
  ),
  TicketsController.updateTicket
);

module.exports = router;
