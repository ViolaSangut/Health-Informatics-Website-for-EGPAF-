const express = require("express");
const router = express.Router();
const rolesController = require('../controllers/RolesController');

//Adding & Listing roles.
router.route('/')
.get(rolesController.getRoles)
.post(rolesController.addRole);


//Update 
router.put("/:id", rolesController.updateRole);

//Delete
router.delete("/:id",rolesController.deleteRole);

module.exports = router;