var express = require('express');
var app = express();
var passport = require('Passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
// For Session ID passed between browser and server
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // login sessions


//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// routes
app.get('/', function(req, res) {
    res.send('Welcome to HealthEasy <br> <a href="/signin">Signin</a> <br> <a href="/signup">Signup</a>');
});

//database
var models = require('./models');

//running func by passing in variable
var authRoute = require('./routes/auth.js')(app, passport);

// can be declared only after models is declared
require('./config/passport/passport.js')(passport, models.user);

// Syncing database, done only once in app.js
models.sequelize.sync().then(function() {
    console.log("working..");
}).catch(function(err) {
    console.log(err, "Problem connecting with database.")
});

app.listen(8080, function(err) {

    if (!err)
        console.log("online");
    else console.log(err)

});