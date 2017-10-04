module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        ssn: {
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        usertype: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        records: {
            type: Sequelize.STRING,
            allowNull: true
        },

        prescriptions: {
            type: Sequelize.STRING,
            allowNull: true
        },

        requested: {
            type: Sequelize.STRING,
            allowNull: true
        },

        requestgranted: {
            type: Sequelize.STRING,
            allowNull: true
        }

    });

    return User;

}