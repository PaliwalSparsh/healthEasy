module.exports = function(sequelize, Sequelize) {

    var Approval = sequelize.define('approval', {

        request_ssn: {
            type: Sequelize.INTEGER
        },

        request_name: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });

    return Approval;

}