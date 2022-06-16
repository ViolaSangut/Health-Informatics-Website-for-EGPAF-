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
    ItemType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssetStatus: {
      type: DataTypes.BOOLEAN,
    },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateRegistered: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });
  return Tickets;
};
