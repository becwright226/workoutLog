var Sequelize = require("sequelize");

var db = new Sequelize("postgres://postgres:dblocal@localhost:5432/workoutLog");

module.exports = db;