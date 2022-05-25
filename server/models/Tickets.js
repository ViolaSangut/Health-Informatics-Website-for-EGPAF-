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
    });
    return Tickets;
};