module.exports = (sequelize, DataTypes) => {
  const Simcards = sequelize.define("Simcards", {
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IMEI: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PUK: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Simcards;
};
