var {DataTypes} = require('sequelize');
const { userController } = require('../controllers');
var db = require("../db");

var Log = db.define("log", {
    description:{
        type: DataTypes.STRING(),
        allowNull: false,
    },
    definition:{
        type: DataTypes.STRING(),
        allowNull: false,

    },
    result:{
        type: DataTypes.STRING(),
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER(),
    }
    
});

module.exports = Log;