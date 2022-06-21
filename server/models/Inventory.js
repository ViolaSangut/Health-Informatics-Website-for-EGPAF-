module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define("Inventory", {
    AssetName: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.STRING,
      default: "Active",
    },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // DateRegistered: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  });
  return Tickets;
};
