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
  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  });
  
  Users.associate = (models) =>{
    //Creating relationship btw user & roles
    Users.belongsTo(models.Roles, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    })

    // Users.hasMany(models.Tickets, {
    //   onDelete: "cascade",
    // })
  }

  return Users;
};
