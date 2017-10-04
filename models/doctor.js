module.exports = function(sequelize, Sequelize) {

    var Doctor = sequelize.define('doctor', {

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

    return Doctor;

}