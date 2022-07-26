const { Users, Roles } = require("../models");
const bcrypt = require("bcrypt");
const roles = require("../models/roles");


//List
const getUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: ["id", "firstName", "lastName", "email"], 
    include: [ Roles]
   
  });
  res.json(users);
};

//Add
const addUser = async (req, res) => {
  const { firstName, lastName, email, password, RoleId } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      RoleId: RoleId,
    })
      .then(() => {
        res.json("User added!");
      })
      .catch((error) => {
        if (error) {
          res.status(400).json({ error: error });
        }
      });
  });
};


//Delete
const deleteUser = async (req, res) => {
  const id = req.params.id;

  const foundUser = Users.findOne({
    where: {
      id: id,
    },
  });
  if (!foundUser) {
    return res.sendStatus(204).json({ error: "user not found!" });
  } else {
    await Users.destroy({
      where: {
        id: id,
      },
    });
    return res.json("user deleted");
  }
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const employee = await Users.findOne({ _id: req.body.id });
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  const result = await Users.deleteOne(); 
  res.json(result);
};

//Find By Id
const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOneById = await Users.findByPk(id);
    if (!findOneById) {
      res.status(404).send({
        message: `User with id: ${id} not found`,
      });
    }
    res.status(200).send({
      data: findOneById,
    });
  } catch (error) {
    next(error);
  }
};

//update
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, RoleId, password } = req.body;
    //Finding user with the same id as parsed id
    const findOneUserById = await Users.findOne({
      where: {
        id: id,
      },
    });
    if (!findOneUserById) {
      res.status(404).send({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }
    if (firstName) findOneUserById.firstName = firstName;
    if (lastName) findOneUserById.lastName = lastName;
    if (email) findOneUserById.email = email;
    if (RoleId) findOneUserById.RoleId = RoleId;
    
    if (password){    
      bcrypt.hash(password, 10).then((hash)=>{
      findOneUserById.password = hash;
      })
    }

    //Saving updated user with updated records
    const updatedUser = await findOneUserById.save();
    if (!updatedUser) {
      res.status(404).send({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }
    res.status(200).send({
      status: "success",
      data: updatedUser,
      
    });
  } catch (error) {
    next(error);
  }
};

//Displaying User Profile
const userProfile = async(req, res) =>{
  const id = req.params.id;

  const profile = await Users.findByPk(id, {
    attributes: {exclude: ["password", "createdAt", "updatedAt", "refresh_token"]}
  });

  res.json(profile);
}


module.exports = {
  getUsers,
  addUser,
  deleteUser,
  findUserById,
  updateUser,
  deleteEmployee,
  userProfile,
};
