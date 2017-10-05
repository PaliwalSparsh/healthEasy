var authController = require('../controller/authcontroller.js')

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/patient_dashboard', authController.patientLoggedIn, authController.patientDashboard);
    app.get('/doctor_dashboard', authController.doctorLoggedIn, authController.doctorDashboard);
    app.get('/pharmacist_dashboard', authController.pharmacistLoggedIn, authController.pharmacistDashboard);
    app.get('/logout',authController.logout);
    app.post('/signin', function(req, res, next) {
          passport.authenticate('local-signin', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/signin'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                if (user.usertype == "doctor") {
                    return res.redirect('/doctor_dashboard');
                } else if (user.usertype == "patient") {
                    return res.redirect('/patient_dashboard');
                } else if (user.usertype == "pharmacist") {
                    return res.redirect('/pharmacist_dashboard');
                } else {
                }
        });
        })(req, res, next);
    });
    app.post('/signup', function(req, res, next) {
          passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/signup'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                if (user.usertype == "doctor") {
                    return res.redirect('/doctor_dashboard');
                } else if (user.usertype == "patient") {
                    return res.redirect('/patient_dashboard');
                } else if (user.usertype == "pharmacist") {
                    return res.redirect('/pharmacist_dashboard');
                } else {
                }
        });
        })(req, res, next);
    });
    // Turns approval to YES, used in patient dashboard
    app.post('/updateRequest',authController.updateRequest);
    // From doctordashboard Requests for patients approval, used in doctor dashboard
    app.post('/requestRecord',authController.requestRecord);
    // Open Records of Patient, used in doctor dashboard
    app.post('/openRecords', authController.openRecords);
    // Updating of record by doctor
    app.post('/updateRecord', authController.updateRecord);

}