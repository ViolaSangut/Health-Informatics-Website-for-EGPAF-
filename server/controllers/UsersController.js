const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
} = require("../middleware/AccessRefreshTokens");
const { json } = require("body-parser");

//List
const getUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: ["id", "firstName", "lastName", "role", "email"],
  });
  res.json(users);
};

//Add
const addUser = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      firstName: firstName,
      lastName: lastName,
      role: role,
      email: email,
      password: hash,
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

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.json({ error: "wrong username or password!" });
  } else {
    const userPassword = user.password;
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res.json({ error: "wrong username or password!" });
      } else {
        const id = user.id;
        const email = user.email;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const role = user.role;

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // Saving refreshToken with current user
        Users.update(
          { refresh_token: refreshToken },
          {
            where: {
              id: user.id,
            },
          }
        );
        // Creating a secure Cookie with refresh token
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken, id, email, firstName, lastName, role });
      }
    });
  }
};

//Logout
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.sendStatus(200);
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
  const result = await Users.deleteOne(); //{ _id: req.body.id }
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
    const { firstName, lastName, role, email } = req.body;
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
    if (role) findOneUserById.role = role;

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

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  findUserById,
  updateUser,
  login,
  logout,
  deleteEmployee,
};
