module.exports = (sequelize, DataTypes) =>{
    const Facilities = sequelize.define("Facilities", {
           
        facilityname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        mflcode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        county: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subcounty: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        ushauri: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        WebADT: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        ipaddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        elasticipaddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    return Facilities;
};