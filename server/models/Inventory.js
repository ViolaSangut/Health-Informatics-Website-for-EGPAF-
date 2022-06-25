module.exports = (sequelize, DataTypes) => {
  const Tablets = sequelize.define("Tablets", {
    AssetName: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      default: null,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EmailPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Tablets;
};
