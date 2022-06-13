module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define("Inventory", {
    AssetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssetNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateRegistered: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    AssetStatus: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Tickets;
};
