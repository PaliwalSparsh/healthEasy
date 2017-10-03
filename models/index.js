"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
// getting config from config.json
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

// Then, we are establishing a connection with our database, after which we read our models
// folder, discovering and importing any and all the models in it, adding them to the db object
// and applying relationships between the models, if such relationships exist.

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        // import the data in file, json hi hoga
        var model = sequelize.import(path.join(__dirname, file));
        // json dict main name ko key leke poore model object se map kardiya
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//adding reference to sequalize(config file) and Sequalize class. This is object so passed by reference ;)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;