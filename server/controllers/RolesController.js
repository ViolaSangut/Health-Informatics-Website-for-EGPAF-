const { Roles } = require("../models");


//List
const getRoles = async (req, res)=>{

    const roles = await Roles.findAll({attributes:["id", "role"]});
    res.json(roles);

};

//Adding a role
const addRole = async (req, res)=>{
    const { role} = req.body;
    Roles.create({
        role: role,
        
    })
    .then(()=>{
        res.json("Role added!")

    })
    .catch((error)=>{
        if(error){
            res.status(400).json({error:error});
        }
    });
}

//Delete
const deleteRole = async(req, res) =>{
    const id = req.params.id;

   await Roles.destroy({
        where: {
            id: id,
        },
    });
    return res.json('Ticket deleted');
};


//update
const updateRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role} = req.body;
      //Finding role with the same id as parsed id
      const findOneRoleById = await Roles.findOne({
        where: {
          id: id,
        },
      });
      if (!findOneRoleById) {
        res.status(404).send({
          status: "error",
          message: `Role with id: ${id} not found`,
        });
      }

      if (role) findOneRoleById.role = role;
  
      //Saving updated role with updated records
      const updatedRole = await findOneRoleById.save();
      if (!updatedRole) {
        res.status(404).send({
          status: "error",
          message: `Role with id: ${id} not found`,
        });
      }
      res.status(200).send({
        status: "success",
        data: updatedRole,
      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { addRole, getRoles, deleteRole, updateRole}