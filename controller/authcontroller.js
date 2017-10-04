var exports = module.exports = {}
exports.signup = function (req, res) {
    res.render('signup');
}
exports.signupall = function (req, res) {
    res.render('signupall');
}
exports.signinall = function (req, res) {
    res.render('signinall');
}
exports.signin = function(req, res) {
    res.render('signin')
}
exports.dashboard = function(req, res) {
    res.render('dashboard');
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}