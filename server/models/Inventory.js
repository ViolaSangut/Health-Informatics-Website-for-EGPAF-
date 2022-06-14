module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define("Inventory", {
    AssetName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    AssetNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    DateRegistered: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    AssetStatus: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Tickets;
};
