const Sequelize = require("sequelize");

const todaysDate = new Date();

module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define("Tickets", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
     
    },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorsFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorsLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorsEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket_status: {
      type: Sequelize.ENUM("Unassigned", "Pending", "Resolved"),
      defaultValue: "Unassigned",
    },
   
    assignee: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATEONLY,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      defaultValue: todaysDate,
    },
  });
  return Tickets;
};
