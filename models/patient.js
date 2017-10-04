module.exports = function(sequelize, Sequelize) {

    var Patient = sequelize.define('patient', {

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
        },

        records: {
            type: Sequelize.STRING,
            allowNull: false
        },

        prescriptions: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });

    return Patient;

}