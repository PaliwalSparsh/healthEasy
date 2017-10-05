module.exports = function(sequelize, Sequelize) {

    var Request = sequelize.define('request', {

        ssn_patient: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        ssn_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        requester_type: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        requester_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        requester_ssn: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        approval: {
            type: Sequelize.STRING,
            defaultValue: "NO",
            allowNull: true
        }

    });

    return Request;

}