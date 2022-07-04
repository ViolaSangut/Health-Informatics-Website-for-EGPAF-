module.exports = (sequelize, DataTypes) => {
  const Tablets = sequelize.define("Tablets", {
    AssetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssetNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssetStatus: {
      type: DataTypes.STRING,
      default: "Active",
    },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
      default: null,
    },
    Passcode: {
      type: DataTypes.STRING,
      allowNull: false,
      default: null,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Tablets;
};
