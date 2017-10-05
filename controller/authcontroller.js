var models = require('../models');
var User = models.user;
var Request = models.request;

var exports = module.exports = {}
exports.signup = function (req, res) {
    res.render('signupall');
}
exports.signin = function(req, res) {
    res.render('signinall')
}
exports.home = function(req, res) {
    res.render('home')
}
exports.patientDashboard = function(req, res) {
    Request.findAll({
    where:{ ssn_patient: req.user.ssn, approval: "NO"}
    }).then(function (s) {
        var request_arr = []
        s.forEach(function(e){
            request_arr.push(e.dataValues)
        });
        console.log(request_arr)
        res.render('patientdashboard', {user: req.user, request: request_arr});
    });
}

exports.doctorDashboard = function(req, res) {
    Request.findAll({
    where:{ requester_ssn: req.user.ssn, approval: "YES"}
    }).then(function (s) {
        var my_patients = []
        s.forEach(function(e){
            my_patients.push(e.dataValues)
        });
        console.log(my_patients)
        res.render('doctordashboard', {user: req.user, my_patients: my_patients});
    });
}
exports.pharmacistDashboard = function(req, res) {
    Request.findAll({
    where:{ requester_ssn: req.user.ssn, approval: "YES"}
    }).then(function (s) {
        var my_customer = []
        s.forEach(function(e){
            my_customer.push(e.dataValues)
        });
        console.log(my_customer)
        res.render('pharmdashboard', {user: req.user, my_customer: my_customer});
    });
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
exports.updateRequest = function(req, res, next) {
    var updateValue = {approval: "YES"};
    Request.update(updateValue, {where: {id: req.body.id}}).then(function(result){
        res.redirect('/patient_dashboard');
    })
}
exports.requestRecord = function(req, res, next) {
        console.log(req.body);
        User.findOne({where: {ssn: req.body.ssn_patient}}).then(function(user){
            if(user){
                var data =
                {
                    ssn_patient: req.body.ssn_patient,
                    ssn_name: user.name,
                    requester_type: req.body.requester_type,
                    requester_name: req.body.requester_name,
                    requester_ssn: req.body.requester_ssn,
                    approval: "NO"
                }
                Request.create(data).then(function(newRequest,created){
                    if(req.body.requester_type == "doctor") {
                        res.redirect('/doctor_dashboard');
                    }else{
                        res.redirect('/pharmacist_dashboard');
                    }

                });
            }
        });

}

exports.openRecords = function(req, res, next) {
    User.findOne({where: {ssn: req.body.ssn_patient}}).then(function(user){
                if(user){
                    res.render('recordandpres', {user: user})
                } else {
                    res.send('Patient data not present <a href = "/doctor_dashboard">Back</a>');
                }

                })
}

exports.updateRecord = function(req, res, next) {
    var updateValue = {records: req.body.records,prescriptions: req.body.prescriptions};
    User.update(updateValue, {where: {ssn: req.body.ssn}}).then(function(result){
        res.redirect('/doctor_dashboard');
    })
}

exports.openPrescription = function(req, res, next) {
    User.findOne({where: {ssn: req.body.ssn_patient}}).then(function(user){
            if(user){
                res.render('pres', {user: user})
            } else {
                res.send('Patient data not present <a href = "/pharmacist_dashboard">Back</a>');
            }

            })
}