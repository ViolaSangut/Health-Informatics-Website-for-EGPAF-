const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const {verifyToken}  = require("../middleware/VerifyToken");
const RefreshTokenController = require("../controllers/RefreshTokenController");


//List
router.route('/').get(UsersController.getUsers);
// Add
router.route('/register').post(UsersController.addUser);
//Update
router.route('/update/:id').put(UsersController.updateUser);
//Delete
router.route("/delete/:id").delete(UsersController.deleteUser)

//Delete
router.route("/deleteemp/:id").delete(UsersController.deleteEmployee)
//Find By Id
router.route("/:id").get(UsersController.findUserById);

// Login
router.route('/login').post(UsersController.login);
// Login
router.route('/logout').delete(UsersController.logout);
//Refresh Token - This end point will receive cookies containing refresh token to issue new accessToken
router.get("/refresh", RefreshTokenController.handleRefreshToken); 

module.exports = router;

























