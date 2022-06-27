module.exports = (sequelize, DataTypes) =>{
    const Roles = sequelize.define("Roles", {
      role: {
            type: DataTypes.STRING,
            defaultValue: "User",
            initialValue:"User",
            allowNull: false,
            unique: true,
          },
        });


    return Roles;
};