var authController = require('../controller/authcontroller.js')

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }))
    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout',authController.logout);
    app.post('/signin', checkUser, passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }
    ));
    app.get('/signupall', authController.signupall);
    app.get('/signinall', authController.signinall);

    // my function to check value
    function checkUser(req, res, next) {
        console.log(req.body);
        return next();
    }
    function isLoggedIn(req, res, next) {
        // this isAuthenticated is passport function which does req.session.passport.user !== undefined
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
}