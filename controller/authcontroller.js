var models = require('../models');
var User = models.user;

var exports = module.exports = {}
exports.signup = function (req, res) {
    res.render('signupall');
}
exports.signin = function(req, res) {
    res.render('signinall')
}
exports.patientDashboard = function(req, res) {
    res.render('patientdashboard');
}
exports.doctorDashboard = function(req, res) {
    res.render('doctordashboard');
}
exports.pharmacistDashboard = function(req, res) {
    res.render('pharmdashboard');
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}

exports.patientLoggedIn =  function(req, res, next) {
        // console.log(req.body);
        // console.log(req.session.passport); // returns a object like {user: 23}, where 23 is id number.
        // this isAuthenticated is passport function which does req.session.passport.user !== undefined.
        //User.findOne({where: {id: req.session.passport.id}}).then(
        console.log("this is present in authcontroller.js"+req.user)
        if (req.isAuthenticated() && req.user.usertype == "patient"){
                return next();
        } else {
            res.redirect('/signin');
        }
    }
exports.doctorLoggedIn =  function(req, res, next) {
        if (req.isAuthenticated() && req.user.usertype == "doctor"){
            return next();
        } else {
            res.redirect('/signin');
        }
    }
exports.pharmacistLoggedIn =  function(req, res, next) {
        if (req.isAuthenticated() && req.user.usertype == "pharmacist"){
            return next();
        } else {
            res.redirect('/signin');
        }
    }