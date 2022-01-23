var { DataTypes } = require("sequelize");
var db = require("../db");

var User = db.define("user", {
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
});

module.exports = User;