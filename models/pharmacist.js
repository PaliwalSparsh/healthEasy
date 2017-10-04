module.exports = function(sequelize, Sequelize) {

    var Pharmacist = sequelize.define('pharmacist', {

        ssn: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Pharmacist;

}