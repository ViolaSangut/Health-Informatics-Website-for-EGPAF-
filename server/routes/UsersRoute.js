const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const AuthController = require("../controllers/AuthController");
const { verifyToken } = require("../middleware/VerifyToken");
const RefreshTokenController = require("../controllers/RefreshTokenController");
const verifyRole = require("../middleware/VerifyRole");
const ROLES_LIST = require("../config/roles");

//List
router
  .route("/")
  .get(
    // verifyToken,
    // verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    UsersController.getUsers
  );
//User Profile
router.route("/userProfile/:id").get(UsersController.userProfile);
// Add
router.route("/register").post(UsersController.addUser);
//Update
router
  .route("/update/:id")
  .put(
    // verifyToken,
    // verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    UsersController.updateUser
  );
//Delete
router
  .route("/delete/:id")
  .delete(
    verifyToken,
    verifyRole(ROLES_LIST.Admin, ROLES_LIST.Super_User),
    UsersController.deleteUser
  );


//Find By Id
router.route("/:id").get(UsersController.findUserById);

// Login
router.route("/login").post(AuthController.login);
// Login
router.route("/logout").delete(AuthController.logout);

//Refresh Token - This end point will receive cookies containing refresh token to issue new accessToken
router.get("/refresh", RefreshTokenController.handleRefreshToken);

module.exports = router;
