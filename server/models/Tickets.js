module.exports = (sequelize, DataTypes) =>{
    const Tickets = sequelize.define("Tickets", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        facility: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticket_status: {
            type: DataTypes.STRING,
            defaultValue: "Unassigned",
            allowNull: false
        },
        assignee: {
            type: DataTypes.STRING,
        },
        priority: {
            type: DataTypes.STRING,
        },
        due_date: {
            type: DataTypes.DATE,
        },
    });
    return Tickets;
};