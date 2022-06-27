const express = require("express");
const router = express.Router();
const rolesController = require('../controllers/RolesController');

router.route('/')
.get(rolesController.getRoles)
.post(rolesController.addRole);


//update 
router.put("/:id", rolesController.updateRole);

//delete
router.delete("/:id",rolesController.deleteRole);

module.exports = router;