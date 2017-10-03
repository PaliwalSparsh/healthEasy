var express = require('express');
var app = express();
var passport = require('Passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var models = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

models.sequelize.sync().then(function() {
    console.log("working..");
}).catch(function(err) {
    console.log(err, "Problem connecting with database.")
});

// For Passport
// For Session ID passed between browser and server
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/', function(req, res) {

    res.send('Welcome to Passport with Sequelize');

});


app.listen(8080, function(err) {

    if (!err)
        console.log("online");
    else console.log(err)

});