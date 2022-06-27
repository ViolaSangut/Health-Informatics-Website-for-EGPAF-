// const Roles = require("../models/Roles");


module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // role: {
    //   type: DataTypes.STRING,
    //   defaultValue: "User",
    //   allowNull: false,
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  });

  Users.associate = (models) =>{
    Users.belongsTo(models.Roles, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    })
  }

  return Users;
};
